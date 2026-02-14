
(function() {
    console.log("[INIT] App_stable.js loading...");
    
    // Consola de depuracion visible opcional (se activa con error)
    function showDebug(title, msg, stack) {
        var d = document.getElementById('debug-overlay');
        if (!d) {
            d = document.createElement('div');
            d.id = 'debug-overlay';
            d.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#f00;padding:20px;z-index:999999;font-family:monospace;overflow:auto;display:block;";
            document.body.appendChild(d);
        }
        d.innerHTML = "<h1>" + title + "</h1>" +
                      "<p style='color:#fff'>" + msg + "</p>" +
                      "<pre style='color:#888;font-size:10px;'>" + (stack || "") + "</pre>" +
                      "<button onclick='location.reload()' style='padding:10px;margin-top:20px;'>REINTENTAR</button>";
    }

    // Capturar errores no manejados
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        console.error("[GLOBAL ERROR]", msg, url, lineNo);
        showDebug("ERROR GLOBAL", msg + " (Linea: " + lineNo + ")", (error ? error.stack : ""));
        return false;
    };

    try {
        if (typeof React === 'undefined') throw new Error("React library not found in folder 'libs'");
        if (typeof ReactDOM === 'undefined') throw new Error("ReactDOM library not found");
        
        console.log("[INIT] Libraries OK. Running App...");

        const {
  useState,
  useRef,
  useEffect
} = React;
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
    if (progress === 100 && !loading) {
      console.log("Scan 100% complete. Transitioning to results...");
      const timer = setTimeout(() => {
        try {
          setActiveTab('results');
        } catch (e) {
          console.error("Error switching to results tab:", e);
        }
      }, 1000); // 1 segundo de pausa para estabilizar memoria
      return () => clearTimeout(timer);
    }
  }, [progress, loading]);

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
          width: {
            ideal: 1280
          },
          height: {
            ideal: 720
          }
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

  // ========== UTILIDADES DE IMAGEN (OPTIMIZADAS PARA MEMORIA) ==========
  const resizeImage = (base64Str, maxWidth = 800) => {
    return new Promise(resolve => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = maxWidth / width * height;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Dibujar imagen
        ctx.drawImage(img, 0, 0, width, height);

        // CONVERTIR A ESCALA DE GRISES (Reduce memoria y mejora OCR)
        try {
          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // R
            data[i + 1] = avg; // G
            data[i + 2] = avg; // B
          }
          ctx.putImageData(imageData, 0, 0);
        } catch (e) {
          console.warn("No se pudo aplicar escala de grises:", e);
        }
        resolve(canvas.toDataURL('image/jpeg', 0.6)); // Compresión agresiva
      };
      img.onerror = err => {
        console.error("Error cargando imagen para redimensionar", err);
        resolve(base64Str); // Fallback al original
      };
    });
  };

  // ========== FUNCIÓN DE PROCESAMIENTO OCR CON TESSERACT ==========
  const processImage = async imageData => {
    setPreview(imageData);
    setLoading(true);
    setProgress(0);
    setExtractedLocation('');
    setError('');
    console.log("=== INICIO PROCESO DE IMAGEN (MODO OPTIMIZADO) ===");
    try {
      if (typeof Tesseract === 'undefined') {
        alert("ERROR CRÍTICO: Tesseract no se cargó.");
        throw new Error("Librería Tesseract no encontrada");
      }

      // CREACIÓN DEL WORKER USANDO ARCHIVOS DIRECTOS
      // Esto evita crear Blobs de 40MB en memoria
      const worker = await Tesseract.createWorker({
        workerPath: 'libs/worker.min.js',
        corePath: 'libs/tesseract-core.wasm.js',
        langPath: 'libs/',
        logger: m => {
          console.log("Tesseract:", m.status, m.progress);
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      console.log("Worker inicializado. Cargando idioma...");
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      console.log("Escanenando...");
      const result = await worker.recognize(imageData);
      const {
        data: {
          text
        }
      } = result;
      console.log("Texto extraido OK.");

      // ACTUALIZAR ESTADOS
      setText(text);
      extractLocationInfo(text);

      // AGREGAR AL HISTORIAL (Inyectado ahora que lo encontramos)
      const newHistoryItem = {
        id: Date.now(),
        date: new Date().toLocaleTimeString(),
        text: text.substring(0, 50) + '...',
        image: imageData.length < 500000 ? imageData : null // Solo guardar si no es gigante
      };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 19)]);
      setProgress(100);

      // Limpieza del worker post-procesamiento
      await worker.terminate();
    } catch (error) {
      console.error('Error en OCR:', error);
      setError('Error al procesar: ' + (error.message || 'Error desconocido'));
    } finally {
      // No quitamos el loading de inmediato para evitar flashes de UI
      setTimeout(() => {
        setLoading(false);
        setIsProcessing(false);
        setScanAnimation(false);
      }, 500);
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
    const handleMessage = event => {
      // ...
    };
    window.addEventListener('message', handleMessage);

    // FUNCION PARA RECIBIR IMAGEN DESDE NATIVO (URI o Base64)
    window.handleNativeImageReceive = async imageUri => {
      try {
        // RECIBIMOS BASE64 (Safe for rendering)
        // Nota: El nativo ya debería haberla redimensionado, pero podemos asegurar aquí si queremos.
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
  const captureImage = async () => {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const aspectRatio = video.videoWidth / video.videoHeight;
    canvas.width = Math.min(video.videoWidth, 1024);
    canvas.height = canvas.width / aspectRatio;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setPreview(imageData);
    setScanAnimation(true);
    setIsProcessing(true);
    processImage(imageData);
  };
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.match('image.*')) {
      setError('Por favor, selecciona un archivo de imagen válido');
      alert('Tipo de archivo no válido');
      return;
    }
    const reader = new FileReader();
    reader.onload = async e => {
      const rawImageData = e.target.result;

      // REDIMENSIONAR PARA EVITAR CRASH DE MEMORIA
      const resizedImageData = await resizeImage(rawImageData, 1024);
      setPreview(resizedImageData);
      setScanAnimation(true);
      setIsProcessing(true);
      processImage(resizedImageData);
    };
    reader.onerror = err => {
      setError('Error al leer el archivo');
      console.error(err);
    };
    reader.readAsDataURL(file);
  };

  /* DUPLICATED processImage REMOVED */

  const extractLocationInfo = text => {
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
      /[#Nnº°]\s*\d{1,5}\s*[-–]\s*\d{1,5}\s*[-–]?\s*\d{0,5}/gi];
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
        if (trimmed.length > 8 && trimmed.length < 100 && /[a-zA-Z]/.test(trimmed) && /\d/.test(trimmed) && !/\d{2}:\d{2}/.test(trimmed) && !/\d{2}\/\d{2}/.test(trimmed)) {
          console.log("Posible dirección genérica (línea):", trimmed);
          setAddress(trimmed);
          setExtractedLocation('📍 ' + trimmed);
          return;
        }
      }
      // 5. FALLBACK: SI NADA FUNCIONÓ, USAR LAS PRIMERAS LÍNEAS DE TEXTO
      if (!extractedLocation || extractedLocation.length < 5) {
        const fallbackText = text.split('\n').map(l => l.trim()).filter(l => l.length > 5 && !/\d{2}:\d{2}/.test(l)).slice(0, 2).join(' ');
        if (fallbackText) {
          console.log("Usando fallback de texto:", fallbackText);
          setExtractedLocation('📍 ' + fallbackText);
          setAddress(fallbackText);
        } else {
          setExtractedLocation('⚠️ No se detectó dirección clara');
          setAddress('Por favor, edita o intenta con otra foto');
        }
      }
    } catch (err) {
      console.error("Error SAFETY en extractLocationInfo:", err);
      setExtractedLocation('⚠️ Error al analizar texto');
    }
  };
  const copyToClipboard = textToCopy => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
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
          text: textToShare
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
  const fallbackShare = text => {
    // Intentar copiar al portapapeles
    navigator.clipboard.writeText(text).then(() => {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
      // Mostrar mensaje especial para fallback
      alert('✅ Texto copiado al portapapeles. Ahora puedes pegarlo en cualquier app para compartir.');
    }).catch(err => {
      console.error('Error al copiar:', err);
      setError('Error al intentar compartir');
    });
  };
  const openNativeUrl = url => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "app-container",
    style: {
      height: `${appHeight}px`
    }
  }, showSplash && /*#__PURE__*/React.createElement("div", {
    className: "splash-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "splash-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "splash-icon-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "splash-pulse-ring"
  }), /*#__PURE__*/React.createElement("div", {
    className: "splash-pulse-ring delay-1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "splash-icon"
  }, "\uD83C\uDF0D")), /*#__PURE__*/React.createElement("h1", {
    className: "splash-title"
  }, "UBERTRON"), /*#__PURE__*/React.createElement("h2", {
    className: "splash-subtitle"
  }, "PRO VISION"), /*#__PURE__*/React.createElement("div", {
    className: "splash-loader"
  }, /*#__PURE__*/React.createElement("div", {
    className: "splash-bar"
  })), /*#__PURE__*/React.createElement("div", {
    className: "splash-contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-icon"
  }, "\uD83D\uDCE7"), /*#__PURE__*/React.createElement("span", {
    className: "contact-text"
  }, "osiany@outlook.com")), /*#__PURE__*/React.createElement("div", {
    className: "contact-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-icon"
  }, "\uD83D\uDCF1"), /*#__PURE__*/React.createElement("span", {
    className: "contact-text"
  }, "Cel. 9983008729"))))), /*#__PURE__*/React.createElement("header", {
    className: "app-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "header-content"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "app-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "app-icon"
  }, "\uD83C\uDF0D"), /*#__PURE__*/React.createElement("div", {
    className: "title-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-title"
  }, "UBERTRON PRO"), /*#__PURE__*/React.createElement("div", {
    className: "sub-title"
  }, "VISION v6.0 NATIVE"))), /*#__PURE__*/React.createElement("p", {
    className: "app-subtitle"
  }, "INTELIGENCIA ARTIFICIAL PARA UBICACIONES")), /*#__PURE__*/React.createElement("div", {
    className: "header-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pulse-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pulse-ring"
  }))), /*#__PURE__*/React.createElement("nav", {
    className: "app-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: `tab-btn ${activeTab === 'capture' ? 'active' : ''}`,
    onClick: () => setActiveTab('capture')
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-icon-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tab-icon"
  }, "\uD83D\uDCF8")), /*#__PURE__*/React.createElement("span", null, "Captura"), /*#__PURE__*/React.createElement("div", {
    className: "tab-indicator"
  })), /*#__PURE__*/React.createElement("button", {
    className: `tab-btn ${activeTab === 'results' ? 'active' : ''}`,
    onClick: () => setActiveTab('results')
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-icon-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tab-icon"
  }, "\uD83D\uDCCD")), /*#__PURE__*/React.createElement("span", null, "Ubicaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "tab-indicator"
  })), /*#__PURE__*/React.createElement("button", {
    className: `tab-btn ${activeTab === 'text' ? 'active' : ''}`,
    onClick: () => setActiveTab('text')
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-icon-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tab-icon"
  }, "\uD83D\uDCC4")), /*#__PURE__*/React.createElement("span", null, "Texto"), /*#__PURE__*/React.createElement("div", {
    className: "tab-indicator"
  })), /*#__PURE__*/React.createElement("button", {
    className: `tab-btn ${activeTab === 'history' ? 'active' : ''}`,
    onClick: () => setActiveTab('history')
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-icon-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tab-icon"
  }, "\uD83D\uDD52")), /*#__PURE__*/React.createElement("span", null, "Historial"), /*#__PURE__*/React.createElement("div", {
    className: "tab-indicator"
  }))), /*#__PURE__*/React.createElement("main", {
    className: "app-main",
    ref: contentRef
  }, activeTab === 'capture' && /*#__PURE__*/React.createElement("div", {
    className: "tab-content"
  }, /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: "image/*",
    onChange: handleImageUpload,
    className: "file-input-hidden"
  }), !preview && /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon"
  }, "\u2699\uFE0F"), /*#__PURE__*/React.createElement("h2", {
    className: "card-title"
  }, "SELECCIONA TU MODO")), /*#__PURE__*/React.createElement("div", {
    className: "mode-grid"
  }, /*#__PURE__*/React.createElement("button", {
    className: `mode-option ${mode === 'upload' ? 'active' : ''}`,
    onClick: () => {
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
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mode-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mode-icon"
  }, "\uD83D\uDCC1"), /*#__PURE__*/React.createElement("div", {
    className: "mode-content"
  }, /*#__PURE__*/React.createElement("h3", null, "SUBIR ARCHIVO"), /*#__PURE__*/React.createElement("p", null, "Selecciona desde tu galer\xEDa"), /*#__PURE__*/React.createElement("div", {
    className: "mode-badge"
  }, "RECOMENDADO"))), /*#__PURE__*/React.createElement("button", {
    className: `mode-option ${mode === 'camera' ? 'active' : ''}`,
    onClick: () => setMode('camera')
  }, /*#__PURE__*/React.createElement("div", {
    className: "mode-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mode-icon"
  }, "\uD83D\uDCF7"), /*#__PURE__*/React.createElement("div", {
    className: "mode-content"
  }, /*#__PURE__*/React.createElement("h3", null, "CAPTURA EN VIVO"), /*#__PURE__*/React.createElement("p", null, "Usa tu c\xE1mara en tiempo real"), /*#__PURE__*/React.createElement("div", {
    className: "mode-badge"
  }, "INSTANT\xC1NEO"))))), mode === 'camera' && !preview && /*#__PURE__*/React.createElement("div", {
    className: "glass-card camera-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon"
  }, "\uD83C\uDFA5"), /*#__PURE__*/React.createElement("h2", {
    className: "card-title"
  }, "C\xC1MARA ACTIVA")), /*#__PURE__*/React.createElement("div", {
    className: "camera-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "camera-frame"
  }, /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    autoPlay: true,
    playsInline: true,
    muted: true,
    className: "camera-view"
  }), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "camera-overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scan-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "focus-ring"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "action-btn capture-btn",
    onClick: captureImage,
    disabled: isProcessing,
    style: isProcessing ? {
      background: `linear-gradient(135deg, ${scanColor} 0%, ${scanColor}80 100%)`,
      boxShadow: `0 0 20px ${scanColor}40`
    } : {}
  }, /*#__PURE__*/React.createElement("div", {
    className: "btn-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "btn-icon"
  }, isProcessing ? '🔍' : '📸'), /*#__PURE__*/React.createElement("span", {
    className: "btn-text"
  }, isProcessing ? `ESCANEANDO ${progress}%` : 'CAPTURAR IMAGEN')))), preview && /*#__PURE__*/React.createElement("div", {
    className: "glass-card preview-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon"
  }, "\uD83D\uDC41\uFE0F"), /*#__PURE__*/React.createElement("h2", {
    className: "card-title"
  }, "VISTA PREVIA")), /*#__PURE__*/React.createElement("div", {
    className: "preview-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-frame"
  }, /*#__PURE__*/React.createElement("img", {
    src: preview,
    alt: "Preview",
    className: "preview-image"
  }), scanAnimation && /*#__PURE__*/React.createElement("div", {
    className: "scan-animation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scan-line",
    style: {
      top: `${progress}%`,
      backgroundColor: scanColor,
      boxShadow: `0 0 20px ${scanColor}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "scan-dots"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scan-dot",
    style: {
      animationDelay: '0s',
      backgroundColor: scanColor,
      left: '20%',
      top: `${progress}%`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "scan-dot",
    style: {
      animationDelay: '0.5s',
      backgroundColor: scanColor,
      left: '50%',
      top: `${progress}%`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "scan-dot",
    style: {
      animationDelay: '1s',
      backgroundColor: scanColor,
      left: '80%',
      top: `${progress}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "progress-overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "progress-title"
  }, "ESCANEANDO IMAGEN"), /*#__PURE__*/React.createElement("span", {
    className: "progress-value",
    style: {
      color: scanColor
    }
  }, progress, "%")), /*#__PURE__*/React.createElement("div", {
    className: "progress-bar-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-indicator",
    style: {
      width: `${progress}%`,
      background: scanColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "color-markers"
  }, /*#__PURE__*/React.createElement("div", {
    className: "color-marker red",
    style: {
      left: '0%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "color-marker orange",
    style: {
      left: '25%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "color-marker yellow",
    style: {
      left: '50%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "color-marker green",
    style: {
      left: '75%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "progress-labels"
  }, /*#__PURE__*/React.createElement("span", {
    className: "progress-label",
    style: {
      color: progress >= 0 ? scanColor : '#777'
    }
  }, "ROJO"), /*#__PURE__*/React.createElement("span", {
    className: "progress-label",
    style: {
      color: progress >= 25 ? scanColor : '#777'
    }
  }, "NARANJA"), /*#__PURE__*/React.createElement("span", {
    className: "progress-label",
    style: {
      color: progress >= 50 ? scanColor : '#777'
    }
  }, "AMARILLO"), /*#__PURE__*/React.createElement("span", {
    className: "progress-label",
    style: {
      color: progress >= 75 ? scanColor : '#777'
    }
  }, "VERDE")))))), /*#__PURE__*/React.createElement("button", {
    className: "action-btn secondary",
    onClick: () => {
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
    },
    style: isProcessing ? {
      background: `linear-gradient(135deg, ${scanColor} 0%, ${scanColor}80 100%)`,
      color: 'white',
      border: 'none',
      boxShadow: `0 0 20px ${scanColor}40`
    } : preview && !isProcessing && progress === 0 ? {
      background: '#4CD964',
      // Green for start
      color: 'white'
    } : {}
  }, /*#__PURE__*/React.createElement("span", {
    className: "btn-icon"
  }, isProcessing ? '🔍' : preview && !isProcessing && progress === 0 ? '▶️' : '🔄'), /*#__PURE__*/React.createElement("span", {
    className: "btn-text"
  }, isProcessing ? `ESCANEANDO ${progress}%` : preview && !isProcessing && progress === 0 ? 'INICIAR ESCANEO' : 'CAMBIAR IMAGEN')))), loading && /*#__PURE__*/React.createElement("div", {
    className: "glass-card processing-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon"
  }, "\u26A1"), /*#__PURE__*/React.createElement("h2", {
    className: "card-title"
  }, "PROCESANDO CON IA")), /*#__PURE__*/React.createElement("div", {
    className: "processing-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ai-loader"
  }, /*#__PURE__*/React.createElement("div", {
    className: "loader-ring",
    style: {
      borderTopColor: scanColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "loader-core",
    style: {
      background: `linear-gradient(135deg, ${scanColor} 0%, ${scanColor}80 100%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "loader-particle",
    style: {
      backgroundColor: scanColor
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "processing-info"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "processing-title"
  }, "ANALIZANDO TU IMAGEN"), /*#__PURE__*/React.createElement("div", {
    className: "ai-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ai-progress-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ai-progress-fill",
    style: {
      width: `${progress}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "progress-labels"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: progress >= 0 ? scanColor : '#999'
    }
  }, "0%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: progress >= 25 ? scanColor : '#999'
    }
  }, "25%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: progress >= 50 ? scanColor : '#999'
    }
  }, "50%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: progress >= 75 ? scanColor : '#999'
    }
  }, "75%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: progress >= 100 ? scanColor : '#999'
    }
  }, "100%")), /*#__PURE__*/React.createElement("div", {
    className: "progress-text",
    style: {
      color: scanColor
    }
  }, progress, "% COMPLETADO")), /*#__PURE__*/React.createElement("div", {
    className: "processing-details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-icon"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("span", {
    className: "detail-text"
  }, "Extrayendo texto con OCR avanzado")), /*#__PURE__*/React.createElement("div", {
    className: "detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-icon"
  }, "\uD83E\uDDE0"), /*#__PURE__*/React.createElement("span", {
    className: "detail-text"
  }, "Analizando patrones de ubicaci\xF3n")), /*#__PURE__*/React.createElement("div", {
    className: "detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-icon"
  }, "\u26A1"), /*#__PURE__*/React.createElement("span", {
    className: "detail-text"
  }, "Optimizando resultados con IA")))))), error && /*#__PURE__*/React.createElement("div", {
    className: "glass-card error-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "error-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "error-icon"
  }, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("h2", {
    className: "error-title"
  }, "ALGO SALI\xD3 MAL"), /*#__PURE__*/React.createElement("p", {
    className: "error-text"
  }, error), /*#__PURE__*/React.createElement("button", {
    className: "action-btn secondary",
    onClick: resetAll
  }, /*#__PURE__*/React.createElement("span", {
    className: "btn-icon"
  }, "\uD83D\uDD04"), /*#__PURE__*/React.createElement("span", {
    className: "btn-text"
  }, "INTENTAR DE NUEVO"))))), activeTab === 'results' && /*#__PURE__*/React.createElement("div", {
    className: "tab-content"
  }, extractedLocation ? /*#__PURE__*/React.createElement("div", {
    className: "glass-card result-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon"
  }, "\uD83C\uDFAF"), /*#__PURE__*/React.createElement("h2", {
    className: "card-title"
  }, "RESULTADOS ENCONTRADOS")), /*#__PURE__*/React.createElement("div", {
    className: "result-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "location-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "location-icon"
  }, coordinates ? '📍' : '🏠', /*#__PURE__*/React.createElement("div", {
    className: "icon-glow"
  })), /*#__PURE__*/React.createElement("div", {
    className: "location-type"
  }, /*#__PURE__*/React.createElement("h3", null, coordinates ? 'COORDENADAS GPS' : 'DIRECCIÓN'), /*#__PURE__*/React.createElement("p", null, coordinates ? 'Precisión máxima' : 'Extraída del texto'))), /*#__PURE__*/React.createElement("div", {
    className: "location-display"
  }, /*#__PURE__*/React.createElement("div", {
    className: "location-text"
  }, isEditing ? /*#__PURE__*/React.createElement("textarea", {
    className: "edit-area",
    value: editableText,
    onChange: e => setEditableText(e.target.value),
    style: {
      width: '100%',
      background: 'transparent',
      border: '1px solid var(--accent)',
      color: 'white',
      borderRadius: '8px',
      padding: '10px',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      minHeight: '80px'
    }
  }) : coordinates || address || extractedLocation), /*#__PURE__*/React.createElement("button", {
    className: `edit-btn-float ${isEditing ? 'active' : ''}`,
    onClick: handleEditToggle,
    style: {
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
    }
  }, isEditing ? '💾' : '✏️'), /*#__PURE__*/React.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/React.createElement("button", {
    className: `copy-btn ${copied ? 'copied' : ''}`,
    onClick: () => copyToClipboard(coordinates || address || extractedLocation)
  }, /*#__PURE__*/React.createElement("div", {
    className: "copy-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "copy-icon"
  }, copied ? '✓' : '📋'), /*#__PURE__*/React.createElement("span", {
    className: "copy-text"
  }, copied ? 'COPIADO' : 'COPIAR')), /*#__PURE__*/React.createElement("button", {
    className: `share-btn ${shared ? 'shared' : ''}`,
    onClick: shareContent
  }, /*#__PURE__*/React.createElement("div", {
    className: "copy-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "copy-icon"
  }, "\uD83D\uDCE4"), /*#__PURE__*/React.createElement("span", {
    className: "copy-text"
  }, shared ? 'COMPARTIDO' : 'COMPARTIR')))), /*#__PURE__*/React.createElement("p", {
    className: "location-hint"
  }, copied ? '✅ ¡Texto copiado al portapapeles!' : shared ? '✅ ¡Contenido compartido exitosamente!' : '👆 Copia o comparte la ubicación extraída')), /*#__PURE__*/React.createElement("div", {
    className: "actions-section"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "actions-title"
  }, "ACCIONES DISPONIBLES"), /*#__PURE__*/React.createElement("div", {
    className: "actions-grid-2x2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "action-card-2x2 sygic",
    onClick: openInSygic
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-glow-2x2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "action-icon-2x2"
  }, "\uD83D\uDDFA\uFE0F"), /*#__PURE__*/React.createElement("div", {
    className: "action-label-2x2"
  }, "SYGIC"), /*#__PURE__*/React.createElement("div", {
    className: "action-sub-2x2"
  }, "Abrir mapa")), /*#__PURE__*/React.createElement("button", {
    className: "action-card-2x2 google",
    onClick: openInGoogleMaps
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-glow-2x2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "action-icon-2x2"
  }, "\uD83C\uDF10"), /*#__PURE__*/React.createElement("div", {
    className: "action-label-2x2"
  }, "GOOGLE"), /*#__PURE__*/React.createElement("div", {
    className: "action-sub-2x2"
  }, "Maps")), /*#__PURE__*/React.createElement("button", {
    className: "action-card-2x2 apple",
    onClick: openInAppleMaps
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-glow-2x2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "action-icon-2x2"
  }, "\uD83C\uDF4E"), /*#__PURE__*/React.createElement("div", {
    className: "action-label-2x2"
  }, "APPLE"), /*#__PURE__*/React.createElement("div", {
    className: "action-sub-2x2"
  }, "Maps")), /*#__PURE__*/React.createElement("button", {
    className: "action-card-2x2 reset",
    onClick: resetAll
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-glow-2x2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "action-icon-2x2"
  }, "\uD83D\uDD04"), /*#__PURE__*/React.createElement("div", {
    className: "action-label-2x2"
  }, "NUEVO"), /*#__PURE__*/React.createElement("div", {
    className: "action-sub-2x2"
  }, "Escanear"))))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-card empty-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83D\uDCF7"), /*#__PURE__*/React.createElement("h2", {
    className: "empty-title"
  }, "SIN RESULTADOS"), /*#__PURE__*/React.createElement("p", {
    className: "empty-text"
  }, loading ? 'Analizando imagen con IA...' : 'Sube o captura una imagen para comenzar'), /*#__PURE__*/React.createElement("button", {
    className: "action-btn",
    onClick: () => setActiveTab('capture')
  }, /*#__PURE__*/React.createElement("span", {
    className: "btn-icon"
  }, "\uD83D\uDCF8"), /*#__PURE__*/React.createElement("span", {
    className: "btn-text"
  }, "CAPTURAR IMAGEN")))), error && /*#__PURE__*/React.createElement("div", {
    className: "glass-card error-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "error-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "error-icon"
  }, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("h2", {
    className: "error-title"
  }, "ERROR"), /*#__PURE__*/React.createElement("p", {
    className: "error-text"
  }, error), /*#__PURE__*/React.createElement("button", {
    className: "action-btn secondary",
    onClick: resetAll
  }, /*#__PURE__*/React.createElement("span", {
    className: "btn-icon"
  }, "\uD83D\uDD04"), /*#__PURE__*/React.createElement("span", {
    className: "btn-text"
  }, "INTENTAR NUEVAMENTE"))))), activeTab === 'text' && /*#__PURE__*/React.createElement("div", {
    className: "tab-content"
  }, text ? /*#__PURE__*/React.createElement("div", {
    className: "glass-card text-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon"
  }, "\uD83D\uDCC4"), /*#__PURE__*/React.createElement("h2", {
    className: "card-title"
  }, "TEXTO EXTRA\xCDDO")), /*#__PURE__*/React.createElement("div", {
    className: "text-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-display"
  }, isEditing ? /*#__PURE__*/React.createElement("textarea", {
    className: "edit-area",
    value: editableText,
    onChange: e => setEditableText(e.target.value),
    style: {
      width: '100%',
      background: 'transparent',
      border: '1px solid var(--accent)',
      color: 'white',
      borderRadius: '8px',
      padding: '10px',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      minHeight: '200px'
    }
  }) : text, /*#__PURE__*/React.createElement("button", {
    className: `edit-btn-float ${isEditing ? 'active' : ''}`,
    onClick: handleEditToggle,
    style: {
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
    }
  }, isEditing ? '💾' : '✏️')), /*#__PURE__*/React.createElement("button", {
    className: "action-btn",
    onClick: () => copyToClipboard(text)
  }, /*#__PURE__*/React.createElement("span", {
    className: "btn-icon"
  }, "\uD83D\uDCCB"), /*#__PURE__*/React.createElement("span", {
    className: "btn-text"
  }, "COPIAR TEXTO COMPLETO")))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-card empty-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83D\uDD24"), /*#__PURE__*/React.createElement("h2", {
    className: "empty-title"
  }, "NO HAY TEXTO"), /*#__PURE__*/React.createElement("p", {
    className: "empty-text"
  }, "Procesa una imagen para extraer texto mediante OCR"), /*#__PURE__*/React.createElement("button", {
    className: "action-btn",
    onClick: () => setActiveTab('capture')
  }, /*#__PURE__*/React.createElement("span", {
    className: "btn-icon"
  }, "\uD83D\uDCF8"), /*#__PURE__*/React.createElement("span", {
    className: "btn-text"
  }, "IR A CAPTURAR"))))), activeTab === 'history' && /*#__PURE__*/React.createElement("div", {
    className: "tab-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card history-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon"
  }, "\uD83D\uDD52"), /*#__PURE__*/React.createElement("h2", {
    className: "card-title"
  }, "HISTORIAL RECIENTE"), history.length > 0 && /*#__PURE__*/React.createElement("button", {
    className: "clear-all-btn",
    onClick: clearHistory,
    style: {
      background: 'rgba(255, 77, 77, 0.2)',
      border: '1px solid #FF4D4D',
      color: '#FF4D4D',
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '0.7rem'
    }
  }, "BORRAR")), /*#__PURE__*/React.createElement("div", {
    className: "history-list",
    style: {
      maxHeight: '60vh',
      overflowY: 'auto'
    }
  }, history.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state",
    style: {
      textAlign: 'center',
      padding: '40px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '3rem',
      marginBottom: '15px'
    }
  }, "\uD83D\uDCED"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,0.6)'
    }
  }, "No hay escaneos guardados localmente.")) : history.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: "history-item",
    onClick: () => restoreHistoryItem(item),
    style: {
      padding: '15px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      gap: '12px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "history-thumb",
    style: {
      width: '50px',
      height: '50px',
      borderRadius: '8px',
      overflow: 'hidden',
      background: '#000'
    }
  }, item.image && /*#__PURE__*/React.createElement("img", {
    src: item.image,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "history-info",
    style: {
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.7rem',
      color: 'var(--accent)',
      fontWeight: 'bold'
    }
  }, item.date), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.9rem',
      color: 'white',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, item.text)), /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'center',
      color: 'rgba(255,255,255,0.3)'
    }
  }, "\u27A1\uFE0F"))))))), /*#__PURE__*/React.createElement("footer", {
    className: "app-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "footer-content"
  }, /*#__PURE__*/React.createElement("p", {
    className: "footer-brand"
  }, "UBERTRON PRO AI v6.0"), /*#__PURE__*/React.createElement("div", {
    className: "footer-contact-mini"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCE7 osiany@uotlook.com"), /*#__PURE__*/React.createElement("span", {
    className: "separator"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCF1 9983008729")))));
}
;

// Renderizar la aplicación
ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById('root'));
        
        console.log("[INIT] Setup complete.");
    } catch (e) {
        console.error("[CRITICAL ERROR]", e);
        showDebug("ERROR CRITICO", e.message, e.stack);
    }
})();
