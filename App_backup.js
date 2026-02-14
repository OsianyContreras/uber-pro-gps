const { useState, useRef, useEffect } = React;

function App() {
    const [preview, setPreview] = useState(null);
    const [text, setText] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const [shared, setShared] = useState(false); // NUEVO ESTADO PARA COMPARTIR
    const [mode, setMode] = useState('upload');
    const [error, setError] = useState('');
    const [extractedLocation, setExtractedLocation] = useState('');
    const [scanAnimation, setScanAnimation] = useState(false);
    const [appHeight, setAppHeight] = useState(window.innerHeight);
    const [isProcessing, setIsProcessing] = useState(false);
    const [scanColor, setScanColor] = useState('#FF4D4D');
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [activeTab, setActiveTab] = useState('capture');
    const [showSplash, setShowSplash] = useState(true); // Nuevo estado para Splash Screen
    const contentRef = useRef(null);
    const [hasAutoOpenedFilePicker, setHasAutoOpenedFilePicker] = useState(false);
    const [history, setHistory] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editableText, setEditableText] = useState('');

    // Auto-cambiar a pestaña de resultados cuando termine el escaneo
    useEffect(() => {
        if (progress === 100 && !loading && extractedLocation) {
            setTimeout(() => {
                setActiveTab('results');
            }, 500);
        }
    }, [progress, loading, extractedLocation]);

    // Actualizar altura de la app para móviles
    useEffect(() => {
        const updateHeight = () => {
            setAppHeight(window.innerHeight);
        };

        window.addEventListener('resize', updateHeight);
        window.addEventListener('orientationchange', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('orientationchange', updateHeight);
        };
    }, []);

    // Actualizar color del botón según progreso
    useEffect(() => {
        if (progress < 25) {
            setScanColor('#FF4D4D'); // Rojo
        } else if (progress < 50) {
            setScanColor('#FFB74D'); // Naranja
        } else if (progress < 75) {
            setScanColor('#FFD700'); // Amarillo
        } else {
            setScanColor('#4CD964'); // Verde
        }
    }, [progress]);

    // Efecto para el Splash Screen animado
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 6000); // 6 segundos de splash
        return () => clearTimeout(timer);
    }, []);

    // Cargar historial al iniciar
    useEffect(() => {
        const savedHistory = localStorage.getItem('ubertronHistory');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error("Error loading history", e);
            }
        }
    }, []);

    // Guardar historial cuando cambie
    useEffect(() => {
        localStorage.setItem('ubertronHistory', JSON.stringify(history));
    }, [history]);

    // Inicializar cámara
    useEffect(() => {
        let mounted = true;
        if (mode === 'camera') {
            startCamera();
        } else {
            stopCamera();
        }

        return () => {
            stopCamera();
        };
    }, [mode]);

    // Ajustar altura del contenido para móviles
    useEffect(() => {
        if (contentRef.current) {
            const tabHeight = 65;
            const headerHeight = 80;
            const footerHeight = 55;
            const mainHeight = appHeight - tabHeight - headerHeight - footerHeight;
            contentRef.current.style.minHeight = `${mainHeight}px`;
        }
    }, [appHeight, activeTab]);

    // Auto-abrir explorador de archivos cuando se selecciona modo upload
    // Auto-abrir explorador de archivos cuando se selecciona modo upload
    // MODIFICADO: El usuario solicitó que NO se abra automáticamente.
    // Se debe presionar el botón "Subir Archivo" explícitamente.
    /*
    useEffect(() => {
        if (mode === 'upload' && !hasAutoOpenedFilePicker) {
            // USAR BRIDGE NATIVO EN LUGAR DE INPUT HTML
            if (window.ReactNativeWebView) {
                // Pequeño delay para asegurar que la UI reaccione
                const timer = setTimeout(() => {
                    window.ReactNativeWebView.postMessage('PICK_IMAGE');
                    setHasAutoOpenedFilePicker(true);
                }, 300);
                return () => clearTimeout(timer);
            } else {
                // Fallback para Web (si se usa en navegador)
                const timer = setTimeout(() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.click();
                        setHasAutoOpenedFilePicker(true);
                    }
                }, 300);
                return () => clearTimeout(timer);
            }
        }

        if (mode !== 'upload') {
            setHasAutoOpenedFilePicker(false);
        }
    }, [mode, hasAutoOpenedFilePicker]);
    */

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setError('No se pudo acceder a la cámara. Asegúrate de permitir el acceso.');
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    // ========== FUNCIÓN DE PROCESAMIENTO OCR CON TESSERACT ==========
    // ========== FUNCIÓN DE PROCESAMIENTO OCR CON TESSERACT ==========
    const processImage = async (imageData) => {
        setPreview(imageData);
        setLoading(true);
        setProgress(0);
        setExtractedLocation('');
        setError('');
        console.log("=== INICIO PROCESO DE IMAGEN ===");

        try {
            // Validar que Tesseract existe
            if (typeof Tesseract === 'undefined') {
                alert("ERROR CRÍTICO: Tesseract NO está definido. La librería no se cargó.");
                throw new Error("Librería Tesseract no encontrada");
            }

            // Construir rutas absolutas basadas en la ubicación del HTML

            // 1. PREPARAR WORKER BLOB
            let workerUrl;
            try {
                if (!window.LIB_WORKER_JS) throw new Error("LIB_WORKER_JS missing");
                const blob = new Blob([window.LIB_WORKER_JS], { type: 'application/javascript' });
                workerUrl = URL.createObjectURL(blob);
            } catch (e) {
                console.error("Worker Creation Error:", e);
                // Fallback?
            }

            // 2. PREPARAR CORE BLOB 
            // Estrategia: NO inyectar wasmBinary directamente (causa mismatch de firmas).
            // En su lugar, crear un Blob URL para el .wasm y dejar que el Core JS lo cargue vía locateFile.
            let coreUrl;
            try {
                if (!window.LIB_CORE_JS) throw new Error("LIB_CORE_JS missing");

                // Crear Blob URL para el WASM binary
                const wasmB64 = window.wasmBase64 || "";
                let wasmBlobUrl = "";
                if (wasmB64) {
                    const wasmBytes = base64ToUint8Array(wasmB64);
                    const wasmBlob = new Blob([wasmBytes], { type: 'application/wasm' });
                    wasmBlobUrl = URL.createObjectURL(wasmBlob);
                    console.log("WASM Blob URL created:", wasmBlobUrl, "Size:", wasmBytes.length);
                }

                const langString = window.TESSERACT_LANG_BASE64 || "";

                // El coreBlobContent NO define Module.wasmBinary.
                // En su lugar, usa locateFile para que Emscripten localice el .wasm via Blob URL.
                const coreBlobContent = `
                    var global = this;
                    
                    function base64ToUint8Array(base64) {
                        var binary_string = atob(base64);
                        var len = binary_string.length;
                        var bytes = new Uint8Array(len);
                        for (var i = 0; i < len; i++) {
                            bytes[i] = binary_string.charCodeAt(i);
                        }
                        return bytes;
                    }
                    
                    var langBase64 = "${langString}";
                    var wasmUrl = "${wasmBlobUrl}";

                    // Configurar Module SOLO con locateFile y preRun (NO wasmBinary)
                    var Module = {
                        locateFile: function(path) {
                            if (path.endsWith('.wasm')) {
                                return wasmUrl;
                            }
                            return path;
                        },
                        preRun: [function() {
                            try {
                                if (langBase64) {
                                    var langBytes = base64ToUint8Array(langBase64);
                                    FS.mkdir('/tessdata');
                                    FS.writeFile('/tessdata/eng.traineddata', langBytes);
                                    console.log("[Worker] Lang written: " + langBytes.length + " bytes");
                                }
                            } catch(e) {
                                console.error("[Worker] FS Error:", e);
                            }
                        }],
                        onAbort: function(what) { 
                            console.error("CORE ABORTED:", what); 
                        },
                        print: function(text) { console.log("[WASM]", text); },
                        printErr: function(text) { console.error("[WASM-ERR]", text); }
                    };
                    
                    // Ejecutar Core JS (define TesseractCoreWASM, usa Module via locateFile)
                    ${window.LIB_CORE_JS}
                `;

                const blob = new Blob([coreBlobContent], { type: 'application/javascript' });
                coreUrl = URL.createObjectURL(blob);
                console.log("Custom Core Blob created (locateFile strategy).");

            } catch (e) {
                console.error("Core Creation Error:", e);
            }

            // 3. INICIALIZAR WORKER
            // Puentear logs a React Native para depuración
            (function () {
                var oldLog = console.log;
                var oldError = console.error;
                console.log = function () {
                    var args = Array.from(arguments).map(a => {
                        try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch (e) { return String(a); }
                    }).join(' ');
                    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage("LOG: " + args);
                    oldLog.apply(console, arguments);
                };
                console.error = function () {
                    var args = Array.from(arguments).map(a => {
                        try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch (e) { return String(a); }
                    }).join(' ');
                    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage("ERROR: " + args);
                    oldError.apply(console, arguments);
                };
            })();

            console.log("Cargando App_backup.js...");

            console.log("Creando Tesseract Worker...");

            // Helper para decodificar Base64 a Uint8Array de forma segura (evita StackOverflow en strings grandes)
            function base64ToUint8Array(base64) {
                var binary_string = window.atob(base64);
                var len = binary_string.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = binary_string.charCodeAt(i);
                }
                return bytes;
            }

            // TESSERACT V4 MANUAL INITIALIZATION
            // Intentamos inicialización paso a paso para depurar el error 'I.SetVariable' (API null).

            console.log("Creando Worker RAW (V4)...");

            // 1. Crear worker sin auto-inicialización (langs=null)
            const worker = await Tesseract.createWorker(null, 1, {
                workerPath: workerUrl,
                corePath: coreUrl,
                logger: m => {
                    console.log("Tesseract:", m.status, m.progress);
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 100));
                    }
                },
                errorHandler: err => console.error("Worker Error:", err)
            });

            console.log("Worker RAW creado. Cargando idioma 'eng'...");

            // 2. Cargar idioma explícitamente
            try {
                await worker.loadLanguage('eng');
                console.log("Idioma 'eng' cargado correctamente.");
            } catch (langErr) {
                console.error("Error cargando idioma:", langErr);
                throw new Error("Fallo carga de idioma: " + langErr.message);
            }

            console.log("Inicializando API Tesseract (OEM 1)...");

            // 3. Inicializar API explícitamente
            try {
                await worker.initialize('eng', 1);
                console.log("API Inicializada correctamente.");
            } catch (initErr) {
                console.error("Error inicializando API:", initErr);
                throw new Error("Fallo inicialización API: " + initErr.message);
            }

            console.log("Worker listo. Configurando parámetros...");

            // CONFIGURAR PARÁMETROS
            // Mantenemos PSM 3 (Auto) y OEM 1 (LSTM)
            await worker.setParameters({
                tessedit_pageseg_mode: '3',
                tessedit_ocr_engine_mode: '1',
            });

            console.log("Parámetros configurados (PSM=3, OEM=1, Outputs=OFF). Preparando imagen...");

            // CONVERTIR BASE64 A PIXEL DATA RAW -> ELIMINADO
            // Tesseract.js v4 maneja perfectamente Base64/DataURI.
            // Pasar objetos {data, width, height} manuales suele causar problemas si el formato no es exacto.

            console.log("Enviando imagen Base64 directa a reconocer...");

            // Pasamos opciones. 
            // INTENTO 4: Pasar imagen directa para que Tesseract la decodifique internamente.
            const result = await worker.recognize(imageData, {
                blocks: true,
                hocr: false,
                tsv: false,
                box: false
            });

            const { data: { text } } = result;
            console.log("Texto extraído longitud:", text ? text.length : 0);
            if (text) {
                console.log("MUESTRA TEXTO OCR (Primeros 500 chars):", text.substring(0, 500).replace(/\n/g, ' | '));
            }

            await worker.terminate();
            console.log("Worker terminado.");

            // Procesar el texto extraído
            setText(text);
            extractLocationInfo(text); // Usar la función de extracción
            setProgress(100);
        } catch (error) {
            console.error('Error CRÍTICO en OCR:', error);
            const errorMsg = 'Error al procesar: ' + (error.message || JSON.stringify(error));
            setError(errorMsg);
            alert(errorMsg); // ALERT VISIBLE
        } finally {
            setLoading(false);
            setIsProcessing(false);
            setScanAnimation(false);
            console.log("=== FIN PROCESO DE IMAGEN ===");
        }
    };

    // ========== COMUNICACIÓN CON REACT NATIVE ==========
    useEffect(() => {
        // Notificar a React Native que las bibliotecas están cargadas
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('LIBS_LOADED_OK');
        }

        // Listener para mensajes desde React Native
        // Listener para mensajes desde React Native
        const handleMessage = (event) => {
            // ...
        };
        window.addEventListener('message', handleMessage);

        // FUNCION PARA RECIBIR IMAGEN DESDE NATIVO (URI o Base64)
        window.handleNativeImageReceive = async (imageUri) => {
            try {
                // RECIBIMOS BASE64 (Safe for rendering)
                setPreview(imageUri);

                // INICIAR PROCESAMIENTO AUTOMÁTICO
                setTimeout(() => {
                    setScanAnimation(true);
                    setIsProcessing(true);
                    processImage(imageUri);
                }, 500);

            } catch (e) {
                alert("Error procesando imagen nativa: " + e.message);
            }
        };

        return () => {
            window.removeEventListener('message', handleMessage);
            delete window.handleNativeImageReceive;
        };
    }, []);

    // ... (captureImage function remains)

    const triggerFileInput = () => {
        // EN LUGAR DE ABRIR INPUT FILE, PEDIMOS AL NATIVO QUE ABRA LA GALERIA
        // Esto evita el crash del WebView en iOS
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('PICK_IMAGE');
        } else {
            // Fallback para web browser normal
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }
    };
    const captureImage = () => {
        if (!videoRef.current) return;

        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (!canvas || !video) return;

        const aspectRatio = video.videoWidth / video.videoHeight;
        canvas.width = Math.min(video.videoWidth, 800);
        canvas.height = canvas.width / aspectRatio;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setPreview(imageData);
        setScanAnimation(true);
        setIsProcessing(true);
        processImage(imageData);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.match('image.*')) {
            setError('Por favor, selecciona un archivo de imagen válido');
            alert('Tipo de archivo no válido');
            return;
        }

        // PRUEBA DE AISLAMIENTO: NO LEER NADA
        // Solo mostrar alerta con datos del archivo
        try {
            console.log("Archivo seleccionado:", file.name, file.size);
            alert(`✅ ARCHIVO DETECTADO\nNombre: ${file.name}\nTamaño: ${(file.size / 1024 / 1024).toFixed(2)} MB\n\nSi ves esto, el selector NO está fallando. El problema era la memoria al leerlo.`);

            // No seteamos preview para evitar renderizado
            // setPreview(...) 
        } catch (e) {
            alert("Error: " + e.message);
        }
    };

    /* DUPLICATED processImage REMOVED */

    const extractLocationInfo = (text) => {
        if (!text) return;

        try {
            // Limpieza inicial segura
            const cleanText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ');
            console.log("Texto limpio para extracción:", cleanText.substring(0, 100) + "...");

            // 1. Buscar coordenadas GPS
            // Ej: 41.40338, 2.17403 | 41°24'12.2"N 2°10'26.5"E
            const coordinateRegex = /([-+]?\d{1,3}[.,]\d{3,}\s*[,;]\s*[-+]?\d{1,3}[.,]\d{3,})|(\d{1,3}°\d{1,2}'\d{1,2}(\.\d+)?\"[NS]\s*\d{1,3}°\d{1,2}'\d{1,2}(\.\d+)?\"[EW])/g;
            const coordinatesMatch = text.match(coordinateRegex);

            if (coordinatesMatch) {
                let rawCoords = coordinatesMatch[0];
                const numberPattern = /[-+]?\d+[.,]\d+/g;
                const parts = rawCoords.match(numberPattern);

                if (parts && parts.length >= 2) {
                    const lat = parts[0].replace(',', '.');
                    const lng = parts[1].replace(',', '.');
                    const finalCoords = `${lat}, ${lng}`;
                    console.log("Coordenadas normalizadas:", finalCoords);
                    setCoordinates(finalCoords);
                    setExtractedLocation('📍 ' + finalCoords);
                    return;
                }
                setCoordinates(rawCoords);
                setExtractedLocation(rawCoords);
                return;
            }

            // 2. ESTRATEGIA: BUSCAR ETIQUETAS EXPLÍCITAS (Alta prioridad)
            const labelRegex = /(?:Direcci[oó]n|Domicilio|Ubicaci[oó]n|Address|Lugar|Destino|Entrega)\s*[:\.]?\s*([^\n]+(?:\n[^\n]+)?)/gi;
            // Usamos 'text' original para preservar saltos de línea en regex si fuera necesario, o cleanText. labelRegex uses 'text'.
            const labelMatch = labelRegex.exec(text);
            if (labelMatch && labelMatch[1] && labelMatch[1].length > 5) {
                const addr = labelMatch[1].trim().replace(/\s+/g, ' ');
                console.log("Dirección por etiqueta encontrada:", addr);
                setAddress(addr);
                setExtractedLocation('📍 ' + addr);
                return;
            }

            // 3. DIRECCIONES CON PALABRAS CLAVE (REGEX MEJORADO V5 - CFE STRICT)
            const addressKeywords = [
                // Soporte "REG77", "M41", "SM 77". Requiere palabra clave seguida de dígito (con o sin espacio/punto)
                /\b(?:Reg|Region|Región|Supermanzana|Superm|Sm|Manzana|Mza|Mz|Lote|Lte|Lt|Solar|Condominio|Cond|Edificio|Depto|Departamento)[\s\.]*\d+[\w\d\s#\-\.,áéíóúñÁÉÍÓÚÑ]{5,150}/gi,
                // Español - Patrones generales (Calle, Av, etc)
                /\b(?:Calle|Carrera|Cra|Cll|Cl|Ave|Avenida|Av|Transversal|Trans|Tv|Diagonal|Diag|Dg|Circular|Circ|Vía|Via|Boulevard|Blvd|Camino|Carretera|Autopista|Paseo|Plaza|Glorieta|Interior|Int|Apartamento|Apto|Oficina|Of|Casa|Colonia|Col|Barrio|Urb|Sector)\b[\w\d\s#\-\.,áéíóúñÁÉÍÓÚÑ]{5,150}/gi,
                // Formato internacional
                /\d{1,5}\s+[A-Za-z0-9\s\.]+?(?:Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Drive|Dr|Boulevard|Blvd|Way|Plaza|Square)\b/gi,
                // Formato LatAm numérico: # 12-34
                /[#Nnº°]\s*\d{1,5}\s*[-–]\s*\d{1,5}\s*[-–]?\s*\d{0,5}/gi
            ];

            for (const pattern of addressKeywords) {
                const match = cleanText.match(pattern);
                if (match) {
                    const bestMatch = match.find(m => /\d/.test(m)) || match.reduce((a, b) => a.length > b.length ? a : b);
                    const addr = bestMatch.trim();
                    console.log("Dirección con keyword encontrada:", addr);
                    const finalAddr = addr.replace(/^[^a-zA-Z0-9]+/, '');
                    setAddress(finalAddr);
                    setExtractedLocation('📍 ' + finalAddr);
                    return;
                }
            }

            // 4. PATRÓN GENÉRICO ACTUALIZADO (Contextual)
            const lines = text.split('\n'); // Usar text original para split por lineas
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.length > 8 && trimmed.length < 100 &&
                    /[a-zA-Z]/.test(trimmed) && /\d/.test(trimmed) &&
                    !/\d{2}:\d{2}/.test(trimmed) && !/\d{2}\/\d{2}/.test(trimmed)) {

                    console.log("Posible dirección genérica (línea):", trimmed);
                    setAddress(trimmed);
                    setExtractedLocation('📍 ' + trimmed);
                    return;
                }
            }
        } catch (err) {
            console.error("Error SAFETY en extractLocationInfo:", err);
            // No hacemos throw para no matar el proceso, solo logueamos
        }
    };

    const copyToClipboard = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Error copying:', err);
                setError('Error al copiar al portapapeles');
            });
    };

    // FUNCIÓN PARA COMPARTIR
    const shareContent = async () => {
        const textToShare = coordinates || address || extractedLocation;

        if (!textToShare) {
            setError('No hay contenido para compartir');
            return;
        }

        console.log("Intentando compartir:", textToShare);

        // Intentar usar Share API Nativa primero (Web Share API)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Ubicación - Ubertron',
                    text: textToShare,
                });
                setShared(true);
                setTimeout(() => setShared(false), 2000);
            } catch (error) {
                console.log("Share API error/cancel:", error);
                // Si falla o usuario cancela, no hacemos fallback automático para no ser molestos,
                // salvo que sea error de soporte.
            }
        } else {
            // Fallback directo a Portapapeles si no hay Share API
            copyToClipboard(textToShare);
            alert('Enlace copiado al portapapeles (Tu dispositivo no soporta compartir nativo desde Web)');
        }
    };

    // FUNCIÓN DE RESPALDO PARA COMPARTIR
    const fallbackShare = (text) => {
        // Intentar copiar al portapapeles
        navigator.clipboard.writeText(text)
            .then(() => {
                setShared(true);
                setTimeout(() => setShared(false), 2000);
                // Mostrar mensaje especial para fallback
                alert('✅ Texto copiado al portapapeles. Ahora puedes pegarlo en cualquier app para compartir.');
            })
            .catch(err => {
                console.error('Error al copiar:', err);
                setError('Error al intentar compartir');
            });
    };

    const openNativeUrl = (url) => {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('OPEN_URL:' + url);
        } else {
            window.open(url, '_blank');
        }
    };

    const openInGoogleMaps = () => {
        let query = coordinates || address || extractedLocation;
        if (!query) return;

        // Limpieza y formateo para Google Maps
        if (coordinates) {
            // Intentar extraer lat y lng decimales
            // Regex busca: (numero) (separador) (numero)
            const parts = coordinates.match(/([-+]?\d+(?:\.\d+)?)[,\s]+([-+]?\d+(?:\.\d+)?)/);
            if (parts && parts.length >= 3) {
                // Asumimos que el OCR devuelve "Lat, Lng". 
                // Si el OCR devuelve "Lng, Lat" (poco común pero posible en algunos formatos), esto estaría invertido.
                // Sin embargo, Google Maps espera "Lat,Lng".

                const lat = parts[1];
                const lng = parts[2];

                // Limpieza extra: asegurar que son números válidos y formatear
                query = `${lat.trim()},${lng.trim()}`;

                console.log("Coordenadas Google formateadas:", query);

                // Usamos 'api=1&query=' con las coordenadas limpias
                openNativeUrl(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`);
                return;
            }
        }

        const encodedQuery = encodeURIComponent(query);
        openNativeUrl(`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`);
    };

    const openInAppleMaps = () => {
        let query = coordinates || address || extractedLocation;
        if (!query) return;

        // Limpieza para Apple Maps
        if (coordinates) {
            const parts = coordinates.match(/([-+]?\d+(?:\.\d+)?)[,\s]+([-+]?\d+(?:\.\d+)?)/);
            if (parts && parts.length >= 3) {
                const lat = parts[1].trim();
                const lng = parts[2].trim();

                query = `${lat},${lng}`;
                console.log("Coordenadas Apple formateadas:", query);

                // Apple Maps: 'll' es para centrar el mapa, 'q' es para el marcador.
                // IMPORTANTE: Apple Maps es muy sensible a espacios.
                const encodedQ = encodeURIComponent(query);
                // Usamos 'http://maps.apple.com/' que redirige a la app nativa.
                // Forzamos "ll" Y "q" para asegurar marcador y centro.
                openNativeUrl(`http://maps.apple.com/?ll=${lat},${lng}&q=${encodedQ}`);
                return;
            }
        }

        const encodedQuery = encodeURIComponent(query);
        openNativeUrl(`http://maps.apple.com/?q=${encodedQuery}`);
    };

    const openInSygic = () => {
        const query = coordinates || address || extractedLocation;
        if (!query) return;

        // SYGIC FIX: Usar esquema URL correcto "com.sygic.aura"
        // Formato coord: com.sygic.aura://coordinate|long|lat|drive
        // Formato address: com.sygic.aura://search|address (menos fiable)

        if (coordinates) {
            // Extraer lat/lng limpios
            // Asumimos formato "lat, lng" o similar
            const parts = coordinates.match(/([-+]?\d+(\.\d+)?)/g);
            if (parts && parts.length >= 2) {
                const lat = parts[0];
                const lng = parts[1];
                // Sygic pide longitude primero en el esquema coordinate: coordinate|long|lat|type
                openNativeUrl(`com.sygic.aura://coordinate|${lng}|${lat}|drive`);
                return;
            }
        }

        // Fallback para dirección (Sygic no tiene buen deep link de búsqueda texto libre universal)
        // Intentamos fallback a Waze que es popular, o simplemente Google Maps como fallback declarado
        // Pero el usuario pidió Sygic explícitamente.
        // Esquema alternativo Android: sygic_navigation://
        // Intentaremos el esquema de búsqueda web de Sygic que a veces intercepta
        const encodedQuery = encodeURIComponent(query);
        openNativeUrl(`https://go.sygic.com/travel/place?q=${encodedQuery}`);
    };

    const resetAll = () => {
        setPreview(null);
        setText('');
        setCoordinates('');
        setAddress('');
        setLoading(false);
        setProgress(0);
        setCopied(false);
        setShared(false);
        setError('');
        setExtractedLocation('');
        setScanAnimation(false);
        setIsProcessing(false);
        setActiveTab('capture');
        setHasAutoOpenedFilePicker(false);
        stopCamera();

        // Resetear input de archivo
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="app-container" style={{ height: `${appHeight}px` }}>
            {/* SPLASH SCREEN ANIMADO */}
            {showSplash && (
                <div className="splash-screen">
                    <div className="splash-content">
                        <div className="splash-icon-container">
                            <div className="splash-pulse-ring"></div>
                            <div className="splash-pulse-ring delay-1"></div>
                            <div className="splash-icon">🌍</div>
                        </div>

                        <h1 className="splash-title">UBERTRON</h1>
                        <h2 className="splash-subtitle">PRO VISION</h2>

                        <div className="splash-loader">
                            <div className="splash-bar"></div>
                        </div>

                        <div className="splash-contact">
                            <div className="contact-row">
                                <span className="contact-icon">📧</span>
                                <span className="contact-text">osiany@outlook.com</span>
                            </div>
                            <div className="contact-row">
                                <span className="contact-icon">📱</span>
                                <span className="contact-text">Cel. 9983008729</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Premium */}
            <header className="app-header">
                <div className="header-glow"></div>
                <div className="header-content">
                    <h1 className="app-title">
                        <span className="app-icon">🌍</span>
                        <div className="title-text">
                            <div className="main-title">UBERTRON PRO</div>
                            <div className="sub-title">VISION v6.0 NATIVE</div>
                        </div>
                    </h1>
                    <p className="app-subtitle">INTELIGENCIA ARTIFICIAL PARA UBICACIONES</p>
                </div>
                <div className="header-pulse">
                    <div className="pulse-dot"></div>
                    <div className="pulse-ring"></div>
                </div>
            </header>

            {/* Tabs de navegación optimizados            {/* Navigation Tabs - OPTIMIZADO PARA 4 TABS */}
            <nav className="app-tabs">
                <button
                    className={`tab-btn ${activeTab === 'capture' ? 'active' : ''}`}
                    onClick={() => setActiveTab('capture')}
                >
                    <div className="tab-icon-container">
                        <div className="tab-glow"></div>
                        <span className="tab-icon">📸</span>
                    </div>
                    <span>Captura</span>
                    <div className="tab-indicator"></div>
                </button>

                <button
                    className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
                    onClick={() => setActiveTab('results')}
                >
                    <div className="tab-icon-container">
                        <div className="tab-glow"></div>
                        <span className="tab-icon">📍</span>
                    </div>
                    <span>Ubicación</span>
                    <div className="tab-indicator"></div>
                </button>

                <button
                    className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                    onClick={() => setActiveTab('text')}
                >
                    <div className="tab-icon-container">
                        <div className="tab-glow"></div>
                        <span className="tab-icon">📄</span>
                    </div>
                    <span>Texto</span>
                    <div className="tab-indicator"></div>
                </button>

                <button
                    className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    <div className="tab-icon-container">
                        <div className="tab-glow"></div>
                        <span className="tab-icon">🕒</span>
                    </div>
                    <span>Historial</span>
                    <div className="tab-indicator"></div>
                </button>
            </nav>

            {/* Contenido principal optimizado para móviles */}
            <main className="app-main" ref={contentRef}>
                {/* Pestaña de Captura - SOLO VISTA PREVIA */}
                {activeTab === 'capture' && (
                    <div className="tab-content">
                        {/* Input de archivo oculto que se abre automáticamente */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input-hidden"
                        />

                        {/* Card de selección de modo */}
                        {!preview && (
                            <div className="glass-card">
                                <div className="card-header">
                                    <div className="card-icon">⚙️</div>
                                    <h2 className="card-title">SELECCIONA TU MODO</h2>
                                </div>

                                <div className="mode-grid">
                                    <button
                                        className={`mode-option ${mode === 'upload' ? 'active' : ''}`}
                                        onClick={() => {
                                            setMode('upload');
                                            setHasAutoOpenedFilePicker(false);
                                            // Auto-abrir explorador NATIVO después de cambiar modo
                                            setTimeout(() => {
                                                if (window.ReactNativeWebView) {
                                                    window.ReactNativeWebView.postMessage('PICK_IMAGE');
                                                    setHasAutoOpenedFilePicker(true);
                                                } else if (fileInputRef.current) {
                                                    fileInputRef.current.click();
                                                    setHasAutoOpenedFilePicker(true);
                                                }
                                            }, 100);
                                        }}
                                    >
                                        <div className="mode-glow"></div>
                                        <div className="mode-icon">📁</div>
                                        <div className="mode-content">
                                            <h3>SUBIR ARCHIVO</h3>
                                            <p>Selecciona desde tu galería</p>
                                            <div className="mode-badge">RECOMENDADO</div>
                                        </div>
                                    </button>

                                    <button
                                        className={`mode-option ${mode === 'camera' ? 'active' : ''}`}
                                        onClick={() => setMode('camera')}
                                    >
                                        <div className="mode-glow"></div>
                                        <div className="mode-icon">📷</div>
                                        <div className="mode-content">
                                            <h3>CAPTURA EN VIVO</h3>
                                            <p>Usa tu cámara en tiempo real</p>
                                            <div className="mode-badge">INSTANTÁNEO</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Vista de cámara */}
                        {mode === 'camera' && !preview && (
                            <div className="glass-card camera-card">
                                <div className="card-header">
                                    <div className="card-icon">🎥</div>
                                    <h2 className="card-title">CÁMARA ACTIVA</h2>
                                </div>

                                <div className="camera-preview">
                                    <div className="camera-frame">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className="camera-view"
                                        />
                                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                                        <div className="camera-overlay">
                                            <div className="scan-grid"></div>
                                            <div className="focus-ring"></div>
                                        </div>
                                    </div>

                                    <button
                                        className="action-btn capture-btn"
                                        onClick={captureImage}
                                        disabled={isProcessing}
                                        style={isProcessing ? {
                                            background: `linear-gradient(135deg, ${scanColor} 0%, ${scanColor}80 100%)`,
                                            boxShadow: `0 0 20px ${scanColor}40`
                                        } : {}}
                                    >
                                        <div className="btn-glow"></div>
                                        <span className="btn-icon">
                                            {isProcessing ? '🔍' : '📸'}
                                        </span>
                                        <span className="btn-text">
                                            {isProcessing ? `ESCANEANDO ${progress}%` : 'CAPTURAR IMAGEN'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Vista previa con escaneo - ÚNICO ELEMENTO QUE SE MUESTRA DESPUÉS DE SELECCIONAR IMAGEN */}
                        {preview && (
                            <div className="glass-card preview-card">
                                <div className="card-header">
                                    <div className="card-icon">👁️</div>
                                    <h2 className="card-title">VISTA PREVIA</h2>
                                </div>

                                <div className="preview-container">
                                    <div className="image-frame">
                                        <img src={preview} alt="Preview" className="preview-image" />

                                        {/* Efecto de escaneo mejorado */}
                                        {scanAnimation && (
                                            <div className="scan-animation">
                                                {/* Línea de escaneo que se mueve */}
                                                <div
                                                    className="scan-line"
                                                    style={{
                                                        top: `${progress}%`,
                                                        backgroundColor: scanColor,
                                                        boxShadow: `0 0 20px ${scanColor}`
                                                    }}
                                                ></div>

                                                {/* Puntos de escaneo */}
                                                <div className="scan-dots">
                                                    <div
                                                        className="scan-dot"
                                                        style={{
                                                            animationDelay: '0s',
                                                            backgroundColor: scanColor,
                                                            left: '20%',
                                                            top: `${progress}%`
                                                        }}
                                                    ></div>
                                                    <div
                                                        className="scan-dot"
                                                        style={{
                                                            animationDelay: '0.5s',
                                                            backgroundColor: scanColor,
                                                            left: '50%',
                                                            top: `${progress}%`
                                                        }}
                                                    ></div>
                                                    <div
                                                        className="scan-dot"
                                                        style={{
                                                            animationDelay: '1s',
                                                            backgroundColor: scanColor,
                                                            left: '80%',
                                                            top: `${progress}%`
                                                        }}
                                                    ></div>
                                                </div>

                                                {/* Barra de progreso sobre la imagen */}
                                                <div className="progress-overlay">
                                                    <div className="progress-header">
                                                        <span className="progress-title">ESCANEANDO IMAGEN</span>
                                                        <span className="progress-value" style={{ color: scanColor }}>
                                                            {progress}%
                                                        </span>
                                                    </div>

                                                    <div className="progress-bar-container">
                                                        <div className="progress-track">
                                                            <div
                                                                className="progress-indicator"
                                                                style={{
                                                                    width: `${progress}%`,
                                                                    background: scanColor
                                                                }}
                                                            ></div>
                                                            {/* Marcadores de color */}
                                                            <div className="color-markers">
                                                                <div className="color-marker red" style={{ left: '0%' }}></div>
                                                                <div className="color-marker orange" style={{ left: '25%' }}></div>
                                                                <div className="color-marker yellow" style={{ left: '50%' }}></div>
                                                                <div className="color-marker green" style={{ left: '75%' }}></div>
                                                            </div>
                                                        </div>

                                                        <div className="progress-labels">
                                                            <span className="progress-label" style={{ color: progress >= 0 ? scanColor : '#777' }}>ROJO</span>
                                                            <span className="progress-label" style={{ color: progress >= 25 ? scanColor : '#777' }}>NARANJA</span>
                                                            <span className="progress-label" style={{ color: progress >= 50 ? scanColor : '#777' }}>AMARILLO</span>
                                                            <span className="progress-label" style={{ color: progress >= 75 ? scanColor : '#777' }}>VERDE</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Botón que cambia de color según progreso */}
                                    <button
                                        className="action-btn secondary"
                                        onClick={() => {
                                            if (isProcessing) {
                                                // Si está procesando, no hace nada o cancela
                                            } else if (preview && !isProcessing && progress === 0) {
                                                // START MANUAL SCAN
                                                setIsProcessing(true);
                                                setScanAnimation(true);
                                                processImage(preview);
                                            } else {
                                                resetAll();
                                            }
                                        }}
                                        style={isProcessing ? {
                                            background: `linear-gradient(135deg, ${scanColor} 0%, ${scanColor}80 100%)`,
                                            color: 'white',
                                            border: 'none',
                                            boxShadow: `0 0 20px ${scanColor}40`
                                        } : (preview && !isProcessing && progress === 0) ? {
                                            background: '#4CD964', // Green for start
                                            color: 'white'
                                        } : {}}
                                    >
                                        <span className="btn-icon">
                                            {isProcessing ? '🔍' : (preview && !isProcessing && progress === 0) ? '▶️' : '🔄'}
                                        </span>
                                        <span className="btn-text">
                                            {isProcessing ? `ESCANEANDO ${progress}%` :
                                                (preview && !isProcessing && progress === 0) ? 'INICIAR ESCANEO' : 'CAMBIAR IMAGEN'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Estado de procesamiento */}
                        {loading && (
                            <div className="glass-card processing-card">
                                <div className="card-header">
                                    <div className="card-icon">⚡</div>
                                    <h2 className="card-title">PROCESANDO CON IA</h2>
                                </div>

                                <div className="processing-content">
                                    <div className="ai-loader">
                                        <div className="loader-ring" style={{ borderTopColor: scanColor }}></div>
                                        <div className="loader-core" style={{ background: `linear-gradient(135deg, ${scanColor} 0%, ${scanColor}80 100%)` }}></div>
                                        <div className="loader-particle" style={{ backgroundColor: scanColor }}></div>
                                    </div>

                                    <div className="processing-info">
                                        <h3 className="processing-title">ANALIZANDO TU IMAGEN</h3>

                                        <div className="ai-progress">
                                            <div className="ai-progress-bar">
                                                <div
                                                    className="ai-progress-fill"
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                ></div>
                                            </div>

                                            <div className="progress-labels">
                                                <span style={{ color: progress >= 0 ? scanColor : '#999' }}>0%</span>
                                                <span style={{ color: progress >= 25 ? scanColor : '#999' }}>25%</span>
                                                <span style={{ color: progress >= 50 ? scanColor : '#999' }}>50%</span>
                                                <span style={{ color: progress >= 75 ? scanColor : '#999' }}>75%</span>
                                                <span style={{ color: progress >= 100 ? scanColor : '#999' }}>100%</span>
                                            </div>

                                            <div className="progress-text" style={{ color: scanColor }}>
                                                {progress}% COMPLETADO
                                            </div>
                                        </div>

                                        <div className="processing-details">
                                            <div className="detail">
                                                <span className="detail-icon">🔍</span>
                                                <span className="detail-text">Extrayendo texto con OCR avanzado</span>
                                            </div>
                                            <div className="detail">
                                                <span className="detail-icon">🧠</span>
                                                <span className="detail-text">Analizando patrones de ubicación</span>
                                            </div>
                                            <div className="detail">
                                                <span className="detail-icon">⚡</span>
                                                <span className="detail-text">Optimizando resultados con IA</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MENSAJE DE ERROR EN TAB DE CAPTURA - PARA QUE EL USUARIO PUEDA REINTENTAR */}
                        {error && (
                            <div className="glass-card error-card">
                                <div className="error-content">
                                    <div className="error-icon">⚠️</div>
                                    <h2 className="error-title">ALGO SALIÓ MAL</h2>
                                    <p className="error-text">{error}</p>
                                    <button className="action-btn secondary" onClick={resetAll}>
                                        <span className="btn-icon">🔄</span>
                                        <span className="btn-text">INTENTAR DE NUEVO</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Pestaña de Resultados con GRID 2x2 FIJO */}
                {activeTab === 'results' && (
                    <div className="tab-content">
                        {extractedLocation ? (
                            <div className="glass-card result-card">
                                <div className="card-header">
                                    <div className="card-icon">🎯</div>
                                    <h2 className="card-title">RESULTADOS ENCONTRADOS</h2>
                                </div>

                                <div className="result-content">
                                    <div className="location-header">
                                        <div className="location-icon">
                                            {coordinates ? '📍' : '🏠'}
                                            <div className="icon-glow"></div>
                                        </div>
                                        <div className="location-type">
                                            <h3>{coordinates ? 'COORDENADAS GPS' : 'DIRECCIÓN'}</h3>
                                            <p>{coordinates ? 'Precisión máxima' : 'Extraída del texto'}</p>
                                        </div>
                                    </div>

                                    <div className="location-display">
                                        <div className="location-text">
                                            {isEditing ? (
                                                <textarea
                                                    className="edit-area"
                                                    value={editableText}
                                                    onChange={(e) => setEditableText(e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        background: 'transparent',
                                                        border: '1px solid var(--accent)',
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                        padding: '10px',
                                                        fontSize: 'inherit',
                                                        fontFamily: 'inherit',
                                                        minHeight: '80px'
                                                    }}
                                                />
                                            ) : (
                                                coordinates || address || extractedLocation
                                            )}
                                        </div>

                                        <button
                                            className={`edit-btn-float ${isEditing ? 'active' : ''}`}
                                            onClick={handleEditToggle}
                                            style={{
                                                position: 'absolute',
                                                top: '-15px',
                                                right: '10px',
                                                background: 'var(--primary)',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '35px',
                                                height: '35px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '1.2rem',
                                                boxShadow: '0 0 15px var(--primary)',
                                                zIndex: 5
                                            }}
                                        >
                                            {isEditing ? '💾' : '✏️'}
                                        </button>

                                        {/* CONTENEDOR DE DOS BOTONES: COPIAR Y COMPARTIR */}
                                        <div className="button-group">
                                            <button
                                                className={`copy-btn ${copied ? 'copied' : ''}`}
                                                onClick={() => copyToClipboard(coordinates || address || extractedLocation)}
                                            >
                                                <div className="copy-glow"></div>
                                                <span className="copy-icon">{copied ? '✓' : '📋'}</span>
                                                <span className="copy-text">{copied ? 'COPIADO' : 'COPIAR'}</span>
                                            </button>

                                            <button
                                                className={`share-btn ${shared ? 'shared' : ''}`}
                                                onClick={shareContent}
                                            >
                                                <div className="copy-glow"></div>
                                                <span className="copy-icon">📤</span>
                                                <span className="copy-text">{shared ? 'COMPARTIDO' : 'COMPARTIR'}</span>
                                            </button>
                                        </div>
                                    </div>

                                    <p className="location-hint">
                                        {copied ? '✅ ¡Texto copiado al portapapeles!' :
                                            shared ? '✅ ¡Contenido compartido exitosamente!' :
                                                '👆 Copia o comparte la ubicación extraída'}
                                    </p>
                                </div>

                                <div className="actions-section">
                                    <h3 className="actions-title">ACCIONES DISPONIBLES</h3>

                                    {/* GRID 2x2 FIJO para móviles */}
                                    <div className="actions-grid-2x2">
                                        <button className="action-card-2x2 sygic" onClick={openInSygic}>
                                            <div className="action-glow-2x2"></div>
                                            <div className="action-icon-2x2">🗺️</div>
                                            <div className="action-label-2x2">SYGIC</div>
                                            <div className="action-sub-2x2">Abrir mapa</div>
                                        </button>

                                        <button className="action-card-2x2 google" onClick={openInGoogleMaps}>
                                            <div className="action-glow-2x2"></div>
                                            <div className="action-icon-2x2">🌐</div>
                                            <div className="action-label-2x2">GOOGLE</div>
                                            <div className="action-sub-2x2">Maps</div>
                                        </button>

                                        <button className="action-card-2x2 apple" onClick={openInAppleMaps}>
                                            <div className="action-glow-2x2"></div>
                                            <div className="action-icon-2x2">🍎</div>
                                            <div className="action-label-2x2">APPLE</div>
                                            <div className="action-sub-2x2">Maps</div>
                                        </button>

                                        <button className="action-card-2x2 reset" onClick={resetAll}>
                                            <div className="action-glow-2x2"></div>
                                            <div className="action-icon-2x2">🔄</div>
                                            <div className="action-label-2x2">NUEVO</div>
                                            <div className="action-sub-2x2">Escanear</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="glass-card empty-card">
                                <div className="empty-content">
                                    <div className="empty-icon">📷</div>
                                    <h2 className="empty-title">SIN RESULTADOS</h2>
                                    <p className="empty-text">
                                        {loading
                                            ? 'Analizando imagen con IA...'
                                            : 'Sube o captura una imagen para comenzar'}
                                    </p>
                                    <button
                                        className="action-btn"
                                        onClick={() => setActiveTab('capture')}
                                    >
                                        <span className="btn-icon">📸</span>
                                        <span className="btn-text">CAPTURAR IMAGEN</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Mensaje de error */}
                        {error && (
                            <div className="glass-card error-card">
                                <div className="error-content">
                                    <div className="error-icon">⚠️</div>
                                    <h2 className="error-title">ERROR</h2>
                                    <p className="error-text">{error}</p>
                                    <button className="action-btn secondary" onClick={resetAll}>
                                        <span className="btn-icon">🔄</span>
                                        <span className="btn-text">INTENTAR NUEVAMENTE</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Pestaña de Texto */}
                {activeTab === 'text' && (
                    <div className="tab-content">
                        {text ? (
                            <div className="glass-card text-card">
                                <div className="card-header">
                                    <div className="card-icon">📄</div>
                                    <h2 className="card-title">TEXTO EXTRAÍDO</h2>
                                </div>

                                <div className="text-content">
                                    <div className="text-display">
                                        {isEditing ? (
                                            <textarea
                                                className="edit-area"
                                                value={editableText}
                                                onChange={(e) => setEditableText(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    background: 'transparent',
                                                    border: '1px solid var(--accent)',
                                                    color: 'white',
                                                    borderRadius: '8px',
                                                    padding: '10px',
                                                    fontSize: 'inherit',
                                                    fontFamily: 'inherit',
                                                    minHeight: '200px'
                                                }}
                                            />
                                        ) : (
                                            text
                                        )}

                                        <button
                                            className={`edit-btn-float ${isEditing ? 'active' : ''}`}
                                            onClick={handleEditToggle}
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                background: 'var(--primary)',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '35px',
                                                height: '35px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '1.2rem',
                                                boxShadow: '0 0 15px var(--primary)',
                                                zIndex: 5
                                            }}
                                        >
                                            {isEditing ? '💾' : '✏️'}
                                        </button>
                                    </div>

                                    <button
                                        className="action-btn"
                                        onClick={() => copyToClipboard(text)}
                                    >
                                        <span className="btn-icon">📋</span>
                                        <span className="btn-text">COPIAR TEXTO COMPLETO</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="glass-card empty-card">
                                <div className="empty-content">
                                    <div className="empty-icon">🔤</div>
                                    <h2 className="empty-title">NO HAY TEXTO</h2>
                                    <p className="empty-text">
                                        Procesa una imagen para extraer texto mediante OCR
                                    </p>
                                    <button
                                        className="action-btn"
                                        onClick={() => setActiveTab('capture')}
                                    >
                                        <span className="btn-icon">📸</span>
                                        <span className="btn-text">IR A CAPTURAR</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {/* Pestaña de Historial */}
                {activeTab === 'history' && (
                    <div className="tab-content">
                        <div className="glass-card history-card">
                            <div className="card-header">
                                <div className="card-icon">🕒</div>
                                <h2 className="card-title">HISTORIAL RECIENTE</h2>
                                {history.length > 0 && (
                                    <button className="clear-all-btn" onClick={clearHistory} style={{
                                        background: 'rgba(255, 77, 77, 0.2)',
                                        border: '1px solid #FF4D4D',
                                        color: '#FF4D4D',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '0.7rem'
                                    }}>BORRAR</button>
                                )}
                            </div>

                            <div className="history-list" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                                {history.length === 0 ? (
                                    <div className="empty-state" style={{ textAlign: 'center', padding: '40px 20px' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📭</div>
                                        <p style={{ color: 'rgba(255,255,255,0.6)' }}>No hay escaneos guardados localmente.</p>
                                    </div>
                                ) : (
                                    history.map(item => (
                                        <div key={item.id} className="history-item" onClick={() => restoreHistoryItem(item)} style={{
                                            padding: '15px',
                                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            gap: '12px',
                                            cursor: 'pointer'
                                        }}>
                                            <div className="history-thumb" style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                background: '#000'
                                            }}>
                                                {item.image && <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                                            </div>
                                            <div className="history-info" style={{ flex: 1, overflow: 'hidden' }}>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 'bold' }}>{item.date}</div>
                                                <div style={{ fontSize: '0.9rem', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {item.text}
                                                </div>
                                            </div>
                                            <div style={{ alignSelf: 'center', color: 'rgba(255,255,255,0.3)' }}>➡️</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer optimizado para móviles con contacto */}
            <footer className="app-footer">
                <div className="footer-glow"></div>
                <div className="footer-content">
                    <p className="footer-brand">UBERTRON PRO AI v6.0</p>
                    <div className="footer-contact-mini">
                        <span>📧 osiany@uotlook.com</span>
                        <span className="separator">•</span>
                        <span>📱 9983008729</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Renderizar la aplicación
ReactDOM.render(<App />, document.getElementById('root'));
