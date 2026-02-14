import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Platform, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import { StatusBar } from 'expo-status-bar';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
    const [ready, setReady] = useState(false);
    const [htmlUri, setHtmlUri] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();
    const webviewRef = useRef(null); // Ref for WebView

    useEffect(() => {
        async function prepareResources() {
            try {
                // Solicitar permisos de cámara al inicio
                if (!permission?.granted) {
                    await requestPermission();
                }

                // DEBUG: Verificar módulo FileSystem
                console.log('FileSystem imported from legacy');

                // Determinar directorio raíz compatible con SDK 54
                let rootDir = FileSystem.documentDirectory || FileSystem.cacheDirectory;

                if (!rootDir && FileSystem.Paths && FileSystem.Paths.document) {
                    rootDir = FileSystem.Paths.document.uri || FileSystem.Paths.document;
                }

                if (!rootDir) {
                    throw new Error('No writable directory found');
                }

                // Asegurar que termine en /
                if (!rootDir.endsWith('/')) {
                    rootDir += '/';
                }

                console.log('Using rootDir:', rootDir);

                // Definir directorio base en el almacenamiento local
                const baseDir = rootDir + 'ubertron/';

                // Crear directorios uno por uno con logs
                try {
                    console.log('Creating base modules directory...');
                    await FileSystem.makeDirectoryAsync(baseDir, { intermediates: true });
                } catch (dirErr) {
                    console.log('Base directory creation info:', dirErr);
                }

                await FileSystem.makeDirectoryAsync(baseDir + 'libs', { intermediates: true });
                await FileSystem.makeDirectoryAsync(baseDir + 'webfonts', { intermediates: true });

                // Lista de archivos a copiar
                const files = {
                    'ubertron.html': require('./assets/ubertron_production.html'),
                    'libs/tesseract.min.js': require('./assets/libs/tesseract.min.bin'),
                    'libs/worker.min.js': require('./assets/libs/worker.min.bin'),
                    'libs/tesseract-core.wasm.js': require('./assets/libs/tesseract-core.wasm.bin'),
                    'libs/tesseract-core.wasm': require('./assets/libs/tesseract-core.wasm.bin'),
                    'libs/eng.traineddata.gz': require('./assets/libs/eng.traineddata.gz'),
                    'libs/fontawesome.css': require('./assets/libs/fontawesome.bin'),
                    'webfonts/fa-solid-900.woff2': require('./assets/webfonts/fa-solid-900.woff2'),
                    'webfonts/fa-brands-400.woff2': require('./assets/webfonts/fa-brands-400.woff2'),
                    'webfonts/fa-regular-400.woff2': require('./assets/webfonts/fa-regular-400.woff2'),
                };

                for (const [path, assetRequire] of Object.entries(files)) {
                    try {
                        console.log(`Processing asset: ${path}`);
                        const asset = Asset.fromModule(assetRequire);
                        await asset.downloadAsync();

                        const destination = baseDir + path;
                        const fileInfo = await FileSystem.getInfoAsync(destination);
                        if (fileInfo.exists) {
                            await FileSystem.deleteAsync(destination, { idempotent: true });
                        }

                        await FileSystem.copyAsync({
                            from: asset.localUri || asset.uri,
                            to: destination
                        });
                        console.log(`Successfully copied: ${path}`);
                    } catch (fileErr) {
                        console.log('Error copying file: ' + path, fileErr);
                    }
                }

                setHtmlUri(baseDir + 'ubertron.html');
                setReady(true);
            } catch (e) {
                console.error("FATAL ERROR copiando assets:", e);
                setReady(true);
            }
        }

        prepareResources();
    }, []);

    if (!ready) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6C63FF" />
                <Text style={styles.loadingText}>Iniciando Ubertron Pro...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <WebView
                ref={webviewRef}
                source={htmlUri ? { uri: htmlUri } : require('./assets/ubertron_embedded.html')}
                style={styles.webview}
                originWhitelist={['*']}
                allowFileAccess={true}
                allowFileAccessFromFileURLs={true}
                allowUniversalAccessFromFileURLs={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                onMessage={async (event) => {
                    const data = event.nativeEvent.data;
                    console.log('Mensaje del WebView:', data);

                    if (data === 'PICK_IMAGE') {
                        try {
                            // Solicitar permisos
                            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                            if (status !== 'granted') {
                                webviewRef.current.injectJavaScript(`alert('Permiso denegado'); true;`);
                                return;
                            }

                            console.log('Abriendo galería nativa...');

                            // 1. Use updated MediaType API
                            const result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ['images'],
                                allowsEditing: false,
                                quality: 0.5,
                                base64: false,
                            });

                            if (!result.canceled && result.assets && result.assets.length > 0) {
                                // 2. FORCE RESIZE & JPEG CONVERSION (Crucial for PNG screenshots)
                                const originalUri = result.assets[0].uri;
                                console.log('Original URI:', originalUri);

                                // Procesamos SIEMPRE para asegurar JPEG
                                // MODIFICADO: Aumentamos a 1024px. 512px es muy poco para leer direcciones pequeñas.
                                // Mantenemos compress bajo para controlar el tamaño del string Base64.
                                const manipResult = await ImageManipulator.manipulateAsync(
                                    originalUri,
                                    [{ resize: { width: 1024 } }],
                                    { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG, base64: true }
                                );

                                // CLEAN BASE64 (Remove newlines to avoid JS Injection crash)
                                const cleanBase64 = manipResult.base64.replace(/(\r\n|\n|\r)/gm, "");
                                const base64Img = `data:image/jpeg;base64,${cleanBase64}`;
                                console.log('Base64 Length:', base64Img.length);

                                // 3. Safety Delay for WebView recovery
                                await new Promise(resolve => setTimeout(resolve, 500));

                                // 4. Check WebView Liveness
                                webviewRef.current.injectJavaScript(`
                                    try {
                                        // window.alert('WebView Vivo. Recibiendo imagen Base64...');
                                        console.log('WebView Vivo. Preparando envío...');
                                    } catch(e) {
                                        window.ReactNativeWebView.postMessage('JS_ERROR: WebView seems dead');
                                    }
                                    true;
                                `);

                                await new Promise(resolve => setTimeout(resolve, 500));

                                // 5. Send Image (BASE64)
                                webviewRef.current.injectJavaScript(`
                                    if(window.handleNativeImageReceive) {
                                        window.handleNativeImageReceive('${base64Img}');
                                    } else {
                                        alert('Error: Handler no encontrado');
                                    }
                                    true;
                                `);
                            }
                        } catch (err) {
                            alert('Error Nativo: ' + err.message);
                        }
                    } else if (data === 'GET_LAST_IMAGE') {
                        try {
                            // 1. Solicitar permisos de MediaLibrary
                            const { status } = await MediaLibrary.requestPermissionsAsync();
                            if (status !== 'granted') {
                                webviewRef.current.injectJavaScript(`alert('Permiso de galería denegado'); true;`);
                                return;
                            }

                            console.log('Buscando última imagen de la galería...');

                            // 2. Obtener el activo más reciente
                            const assets = await MediaLibrary.getAssetsAsync({
                                first: 1,
                                sortBy: [MediaLibrary.SortBy.creationTime],
                            });

                            if (assets.assets && assets.assets.length > 0) {
                                const lastAsset = assets.assets[0];
                                console.log('Última imagen encontrada:', lastAsset.uri);

                                // 3. Procesar imagen (RESIZE & JPEG)
                                const manipResult = await ImageManipulator.manipulateAsync(
                                    lastAsset.uri,
                                    [{ resize: { width: 1024 } }],
                                    { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG, base64: true }
                                );

                                const cleanBase64 = manipResult.base64.replace(/(\r\n|\n|\r)/gm, "");
                                const base64Img = `data:image/jpeg;base64,${cleanBase64}`;

                                // 4. Enviar a WebView
                                webviewRef.current.injectJavaScript(`
                                    if(window.handleNativeImageReceive) {
                                        window.handleNativeImageReceive('${base64Img}');
                                    } else {
                                        alert('Error: Handler no encontrado');
                                    }
                                    true;
                                `);
                            } else {
                                webviewRef.current.injectJavaScript(`alert('No se encontraron imágenes en la galería'); true;`);
                            }
                        } catch (err) {
                            alert('Error al obtener última imagen: ' + err.message);
                        }
                    } else if (data && data.startsWith('OPEN_URL:')) {
                        const url = data.substring('OPEN_URL:'.length);
                        console.log('Abriendo URL:', url);
                        Linking.openURL(url).catch(err => console.error('Error abriendo URL:', err));
                    } else if (data && data.startsWith('JS_ERROR:')) {
                        console.error('WebView JS Error:', data);
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A2E',
    },
    webview: {
        flex: 1,
        backgroundColor: '#1A1A2E',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#1A1A2E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: '#F8F9FF',
        marginTop: 20,
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    }
});
