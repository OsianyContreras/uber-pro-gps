
console.log("🚀 App_stable.js iniciado");
try {
    if (typeof React === 'undefined') throw new Error("React no está cargado. Revisa index.html y la carpeta libs/");
    if (typeof ReactDOM === 'undefined') throw new Error("ReactDOM no está cargado. Revisa index.html y la carpeta libs/");
    
    console.log("✅ React y ReactDOM detectados");

    "use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _React = React,
  useState = _React.useState,
  useRef = _React.useRef,
  useEffect = _React.useEffect;
function App() {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    preview = _useState2[0],
    setPreview = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    text = _useState4[0],
    setText = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    coordinates = _useState6[0],
    setCoordinates = _useState6[1];
  var _useState7 = useState(''),
    _useState8 = _slicedToArray(_useState7, 2),
    address = _useState8[0],
    setAddress = _useState8[1];
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    loading = _useState0[0],
    setLoading = _useState0[1];
  var _useState1 = useState(0),
    _useState10 = _slicedToArray(_useState1, 2),
    progress = _useState10[0],
    setProgress = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    copied = _useState12[0],
    setCopied = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    shared = _useState14[0],
    setShared = _useState14[1]; // NUEVO ESTADO PARA COMPARTIR
  var _useState15 = useState('upload'),
    _useState16 = _slicedToArray(_useState15, 2),
    mode = _useState16[0],
    setMode = _useState16[1];
  var _useState17 = useState(''),
    _useState18 = _slicedToArray(_useState17, 2),
    error = _useState18[0],
    setError = _useState18[1];
  var _useState19 = useState(''),
    _useState20 = _slicedToArray(_useState19, 2),
    extractedLocation = _useState20[0],
    setExtractedLocation = _useState20[1];
  var _useState21 = useState(false),
    _useState22 = _slicedToArray(_useState21, 2),
    scanAnimation = _useState22[0],
    setScanAnimation = _useState22[1];
  var _useState23 = useState(window.innerHeight),
    _useState24 = _slicedToArray(_useState23, 2),
    appHeight = _useState24[0],
    setAppHeight = _useState24[1];
  var _useState25 = useState(false),
    _useState26 = _slicedToArray(_useState25, 2),
    isProcessing = _useState26[0],
    setIsProcessing = _useState26[1];
  var _useState27 = useState('#FF4D4D'),
    _useState28 = _slicedToArray(_useState27, 2),
    scanColor = _useState28[0],
    setScanColor = _useState28[1];
  var fileInputRef = useRef(null);
  var videoRef = useRef(null);
  var canvasRef = useRef(null);
  var _useState29 = useState('capture'),
    _useState30 = _slicedToArray(_useState29, 2),
    activeTab = _useState30[0],
    setActiveTab = _useState30[1];
  var _useState31 = useState(true),
    _useState32 = _slicedToArray(_useState31, 2),
    showSplash = _useState32[0],
    setShowSplash = _useState32[1]; // Nuevo estado para Splash Screen
  var contentRef = useRef(null);
  var _useState33 = useState(false),
    _useState34 = _slicedToArray(_useState33, 2),
    hasAutoOpenedFilePicker = _useState34[0],
    setHasAutoOpenedFilePicker = _useState34[1];
  var _useState35 = useState([]),
    _useState36 = _slicedToArray(_useState35, 2),
    history = _useState36[0],
    setHistory = _useState36[1];
  var _useState37 = useState(false),
    _useState38 = _slicedToArray(_useState37, 2),
    isEditing = _useState38[0],
    setIsEditing = _useState38[1];
  var _useState39 = useState(''),
    _useState40 = _slicedToArray(_useState39, 2),
    editableText = _useState40[0],
    setEditableText = _useState40[1];

  // Auto-cambiar a pestaña de resultados cuando termine el escaneo
  useEffect(function () {
    // MODIFICADO: Cambiar siempre si progres es 100, incluso si extraedLocation es débil
    if (progress === 100 && !loading) {
      var timer = setTimeout(function () {
        setActiveTab('results');
      }, 800); // Un poco más de tiempo para que se vea el 100%
      return function () {
        return clearTimeout(timer);
      };
    }
  }, [progress, loading]);

  // Actualizar altura de la app para móviles
  useEffect(function () {
    var updateHeight = function updateHeight() {
      setAppHeight(window.innerHeight);
    };
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    return function () {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  // Actualizar color del botón según progreso
  useEffect(function () {
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
  useEffect(function () {
    var timer = setTimeout(function () {
      setShowSplash(false);
    }, 6000); // 6 segundos de splash
    return function () {
      return clearTimeout(timer);
    };
  }, []);

  // Cargar historial al iniciar
  useEffect(function () {
    var savedHistory = localStorage.getItem('ubertronHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error loading history", e);
      }
    }
  }, []);

  // Guardar historial cuando cambie
  useEffect(function () {
    localStorage.setItem('ubertronHistory', JSON.stringify(history));
  }, [history]);

  // Inicializar cámara
  useEffect(function () {
    var mounted = true;
    if (mode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return function () {
      stopCamera();
    };
  }, [mode]);

  // Ajustar altura del contenido para móviles
  useEffect(function () {
    if (contentRef.current) {
      var tabHeight = 65;
      var headerHeight = 80;
      var footerHeight = 55;
      var mainHeight = appHeight - tabHeight - headerHeight - footerHeight;
      contentRef.current.style.minHeight = "".concat(mainHeight, "px");
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

  var startCamera = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var stream, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return navigator.mediaDevices.getUserMedia({
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
          case 1:
            stream = _context.v;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Error accessing camera:', _t);
            setError('No se pudo acceder a la cámara. Asegúrate de permitir el acceso.');
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function startCamera() {
      return _ref.apply(this, arguments);
    };
  }();
  var stopCamera = function stopCamera() {
    if (videoRef.current && videoRef.current.srcObject) {
      var stream = videoRef.current.srcObject;
      var tracks = stream.getTracks();
      tracks.forEach(function (track) {
        return track.stop();
      });
      videoRef.current.srcObject = null;
    }
  };

  // ========== UTILIDADES DE IMAGEN (OPTIMIZADAS PARA MEMORIA) ==========
  var resizeImage = function resizeImage(base64Str) {
    var maxWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    return new Promise(function (resolve) {
      var img = new Image();
      img.src = base64Str;
      img.onload = function () {
        var canvas = document.createElement('canvas');
        var width = img.width;
        var height = img.height;
        if (width > maxWidth) {
          height = maxWidth / width * height;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');

        // Dibujar imagen
        ctx.drawImage(img, 0, 0, width, height);

        // CONVERTIR A ESCALA DE GRISES (Reduce memoria y mejora OCR)
        try {
          var imageData = ctx.getImageData(0, 0, width, height);
          var data = imageData.data;
          for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
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
      img.onerror = function (err) {
        console.error("Error cargando imagen para redimensionar", err);
        resolve(base64Str); // Fallback al original
      };
    });
  };

  // ========== FUNCIÓN DE PROCESAMIENTO OCR CON TESSERACT ==========
  var processImage = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(imageData) {
      var worker, result, _text, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            setPreview(imageData);
            setLoading(true);
            setProgress(0);
            setExtractedLocation('');
            setError('');
            console.log("=== INICIO PROCESO DE IMAGEN (MODO OPTIMIZADO) ===");
            _context2.p = 1;
            if (!(typeof Tesseract === 'undefined')) {
              _context2.n = 2;
              break;
            }
            alert("ERROR CRÍTICO: Tesseract no se cargó.");
            throw new Error("Librería Tesseract no encontrada");
          case 2:
            _context2.n = 3;
            return Tesseract.createWorker({
              workerPath: 'libs/worker.min.js',
              corePath: 'libs/tesseract-core.wasm.js',
              langPath: 'libs/',
              logger: function logger(m) {
                console.log("Tesseract:", m.status, m.progress);
                if (m.status === 'recognizing text') {
                  setProgress(Math.round(m.progress * 100));
                }
              }
            });
          case 3:
            worker = _context2.v;
            console.log("Worker inicializado. Cargando idioma...");
            _context2.n = 4;
            return worker.loadLanguage('eng');
          case 4:
            _context2.n = 5;
            return worker.initialize('eng');
          case 5:
            console.log("Escanenando...");
            _context2.n = 6;
            return worker.recognize(imageData);
          case 6:
            result = _context2.v;
            _text = result.data.text;
            console.log("Texto extraído longitud:", _text ? _text.length : 0);
            _context2.n = 7;
            return worker.terminate();
          case 7:
            setText(_text);
            extractLocationInfo(_text);
            setProgress(100);
            _context2.n = 9;
            break;
          case 8:
            _context2.p = 8;
            _t2 = _context2.v;
            console.error('Error en OCR:', _t2);
            setError('Error al procesar: ' + (_t2.message || 'Error desconocido'));
          case 9:
            _context2.p = 9;
            setLoading(false);
            setIsProcessing(false);
            setScanAnimation(false);
            console.log("=== FIN PROCESO DE IMAGEN ===");
            return _context2.f(9);
          case 10:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 8, 9, 10]]);
    }));
    return function processImage(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  // ========== COMUNICACIÓN CON REACT NATIVE ==========
  useEffect(function () {
    // Notificar a React Native que las bibliotecas están cargadas
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('LIBS_LOADED_OK');
    }

    // Listener para mensajes desde React Native
    // Listener para mensajes desde React Native
    var handleMessage = function handleMessage(event) {
      // ...
    };
    window.addEventListener('message', handleMessage);

    // FUNCION PARA RECIBIR IMAGEN DESDE NATIVO (URI o Base64)
    window.handleNativeImageReceive = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(imageUri) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              try {
                // RECIBIMOS BASE64 (Safe for rendering)
                // Nota: El nativo ya debería haberla redimensionado, pero podemos asegurar aquí si queremos.
                setPreview(imageUri);

                // INICIAR PROCESAMIENTO AUTOMÁTICO
                setTimeout(function () {
                  setScanAnimation(true);
                  setIsProcessing(true);
                  processImage(imageUri);
                }, 500);
              } catch (e) {
                alert("Error procesando imagen nativa: " + e.message);
              }
            case 1:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }();
    return function () {
      window.removeEventListener('message', handleMessage);
      delete window.handleNativeImageReceive;
    };
  }, []);

  // ... (captureImage function remains)

  var triggerFileInput = function triggerFileInput() {
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
  var captureImage = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var canvas, video, aspectRatio, context, imageData;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (videoRef.current) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            canvas = canvasRef.current;
            video = videoRef.current;
            if (!(!canvas || !video)) {
              _context4.n = 2;
              break;
            }
            return _context4.a(2);
          case 2:
            aspectRatio = video.videoWidth / video.videoHeight;
            canvas.width = Math.min(video.videoWidth, 1024);
            canvas.height = canvas.width / aspectRatio;
            context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            imageData = canvas.toDataURL('image/jpeg', 0.8);
            setPreview(imageData);
            setScanAnimation(true);
            setIsProcessing(true);
            processImage(imageData);
          case 3:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    return function captureImage() {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleImageUpload = function handleImageUpload(event) {
    var file = event.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.match('image.*')) {
      setError('Por favor, selecciona un archivo de imagen válido');
      alert('Tipo de archivo no válido');
      return;
    }
    var reader = new FileReader();
    reader.onload = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(e) {
        var rawImageData, resizedImageData;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              rawImageData = e.target.result; // REDIMENSIONAR PARA EVITAR CRASH DE MEMORIA
              _context5.n = 1;
              return resizeImage(rawImageData, 1024);
            case 1:
              resizedImageData = _context5.v;
              setPreview(resizedImageData);
              setScanAnimation(true);
              setIsProcessing(true);
              processImage(resizedImageData);
            case 2:
              return _context5.a(2);
          }
        }, _callee5);
      }));
      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }();
    reader.onerror = function (err) {
      setError('Error al leer el archivo');
      console.error(err);
    };
    reader.readAsDataURL(file);
  };

  /* DUPLICATED processImage REMOVED */

  var extractLocationInfo = function extractLocationInfo(text) {
    if (!text) return;
    try {
      // Limpieza inicial segura
      var cleanText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ');
      console.log("Texto limpio para extracción:", cleanText.substring(0, 100) + "...");

      // 1. Buscar coordenadas GPS
      // Ej: 41.40338, 2.17403 | 41°24'12.2"N 2°10'26.5"E
      var coordinateRegex = /([-+]?\d{1,3}[.,]\d{3,}\s*[,;]\s*[-+]?\d{1,3}[.,]\d{3,})|(\d{1,3}°\d{1,2}'\d{1,2}(\.\d+)?\"[NS]\s*\d{1,3}°\d{1,2}'\d{1,2}(\.\d+)?\"[EW])/g;
      var coordinatesMatch = text.match(coordinateRegex);
      if (coordinatesMatch) {
        var rawCoords = coordinatesMatch[0];
        var numberPattern = /[-+]?\d+[.,]\d+/g;
        var parts = rawCoords.match(numberPattern);
        if (parts && parts.length >= 2) {
          var lat = parts[0].replace(',', '.');
          var lng = parts[1].replace(',', '.');
          var finalCoords = "".concat(lat, ", ").concat(lng);
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
      var labelRegex = /(?:Direcci[oó]n|Domicilio|Ubicaci[oó]n|Address|Lugar|Destino|Entrega)\s*[:\.]?\s*([^\n]+(?:\n[^\n]+)?)/gi;
      // Usamos 'text' original para preservar saltos de línea en regex si fuera necesario, o cleanText. labelRegex uses 'text'.
      var labelMatch = labelRegex.exec(text);
      if (labelMatch && labelMatch[1] && labelMatch[1].length > 5) {
        var addr = labelMatch[1].trim().replace(/\s+/g, ' ');
        console.log("Dirección por etiqueta encontrada:", addr);
        setAddress(addr);
        setExtractedLocation('📍 ' + addr);
        return;
      }

      // 3. DIRECCIONES CON PALABRAS CLAVE (REGEX MEJORADO V5 - CFE STRICT)
      var addressKeywords = [
      // Soporte "REG77", "M41", "SM 77". Requiere palabra clave seguida de dígito (con o sin espacio/punto)
      /\b(?:Reg|Region|Región|Supermanzana|Superm|Sm|Manzana|Mza|Mz|Lote|Lte|Lt|Solar|Condominio|Cond|Edificio|Depto|Departamento)[\s\.]*\d+[\w\d\s#\-\.,áéíóúñÁÉÍÓÚÑ]{5,150}/gi,
      // Español - Patrones generales (Calle, Av, etc)
      /\b(?:Calle|Carrera|Cra|Cll|Cl|Ave|Avenida|Av|Transversal|Trans|Tv|Diagonal|Diag|Dg|Circular|Circ|Vía|Via|Boulevard|Blvd|Camino|Carretera|Autopista|Paseo|Plaza|Glorieta|Interior|Int|Apartamento|Apto|Oficina|Of|Casa|Colonia|Col|Barrio|Urb|Sector)\b[\w\d\s#\-\.,áéíóúñÁÉÍÓÚÑ]{5,150}/gi,
      // Formato internacional
      /\d{1,5}\s+[A-Za-z0-9\s\.]+?(?:Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Drive|Dr|Boulevard|Blvd|Way|Plaza|Square)\b/gi,
      // Formato LatAm numérico: # 12-34
      /[#Nnº°]\s*\d{1,5}\s*[-–]\s*\d{1,5}\s*[-–]?\s*\d{0,5}/gi];
      for (var _i = 0, _addressKeywords = addressKeywords; _i < _addressKeywords.length; _i++) {
        var pattern = _addressKeywords[_i];
        var match = cleanText.match(pattern);
        if (match) {
          var bestMatch = match.find(function (m) {
            return /\d/.test(m);
          }) || match.reduce(function (a, b) {
            return a.length > b.length ? a : b;
          });
          var _addr = bestMatch.trim();
          console.log("Dirección con keyword encontrada:", _addr);
          var finalAddr = _addr.replace(/^[^a-zA-Z0-9]+/, '');
          setAddress(finalAddr);
          setExtractedLocation('📍 ' + finalAddr);
          return;
        }
      }

      // 4. PATRÓN GENÉRICO ACTUALIZADO (Contextual)
      var lines = text.split('\n'); // Usar text original para split por lineas
      var _iterator = _createForOfIteratorHelper(lines),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          var trimmed = line.trim();
          if (trimmed.length > 8 && trimmed.length < 100 && /[a-zA-Z]/.test(trimmed) && /\d/.test(trimmed) && !/\d{2}:\d{2}/.test(trimmed) && !/\d{2}\/\d{2}/.test(trimmed)) {
            console.log("Posible dirección genérica (línea):", trimmed);
            setAddress(trimmed);
            setExtractedLocation('📍 ' + trimmed);
            return;
          }
        }
        // 5. FALLBACK: SI NADA FUNCIONÓ, USAR LAS PRIMERAS LÍNEAS DE TEXTO
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (!extractedLocation || extractedLocation.length < 5) {
        var fallbackText = text.split('\n').map(function (l) {
          return l.trim();
        }).filter(function (l) {
          return l.length > 5 && !/\d{2}:\d{2}/.test(l);
        }).slice(0, 2).join(' ');
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
  var copyToClipboard = function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy).then(function () {
      setCopied(true);
      setTimeout(function () {
        return setCopied(false);
      }, 2000);
    })["catch"](function (err) {
      console.error('Error copying:', err);
      setError('Error al copiar al portapapeles');
    });
  };

  // FUNCIÓN PARA COMPARTIR
  var shareContent = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var textToShare, _t3;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            textToShare = coordinates || address || extractedLocation;
            if (textToShare) {
              _context6.n = 1;
              break;
            }
            setError('No hay contenido para compartir');
            return _context6.a(2);
          case 1:
            console.log("Intentando compartir:", textToShare);

            // Intentar usar Share API Nativa primero (Web Share API)
            if (!navigator.share) {
              _context6.n = 6;
              break;
            }
            _context6.p = 2;
            _context6.n = 3;
            return navigator.share({
              title: 'Ubicación - Ubertron',
              text: textToShare
            });
          case 3:
            setShared(true);
            setTimeout(function () {
              return setShared(false);
            }, 2000);
            _context6.n = 5;
            break;
          case 4:
            _context6.p = 4;
            _t3 = _context6.v;
            console.log("Share API error/cancel:", _t3);
            // Si falla o usuario cancela, no hacemos fallback automático para no ser molestos,
            // salvo que sea error de soporte.
          case 5:
            _context6.n = 7;
            break;
          case 6:
            // Fallback directo a Portapapeles si no hay Share API
            copyToClipboard(textToShare);
            alert('Enlace copiado al portapapeles (Tu dispositivo no soporta compartir nativo desde Web)');
          case 7:
            return _context6.a(2);
        }
      }, _callee6, null, [[2, 4]]);
    }));
    return function shareContent() {
      return _ref6.apply(this, arguments);
    };
  }();

  // FUNCIÓN DE RESPALDO PARA COMPARTIR
  var fallbackShare = function fallbackShare(text) {
    // Intentar copiar al portapapeles
    navigator.clipboard.writeText(text).then(function () {
      setShared(true);
      setTimeout(function () {
        return setShared(false);
      }, 2000);
      // Mostrar mensaje especial para fallback
      alert('✅ Texto copiado al portapapeles. Ahora puedes pegarlo en cualquier app para compartir.');
    })["catch"](function (err) {
      console.error('Error al copiar:', err);
      setError('Error al intentar compartir');
    });
  };
  var openNativeUrl = function openNativeUrl(url) {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('OPEN_URL:' + url);
    } else {
      window.open(url, '_blank');
    }
  };
  var openInGoogleMaps = function openInGoogleMaps() {
    var query = coordinates || address || extractedLocation;
    if (!query) return;

    // Limpieza y formateo para Google Maps
    if (coordinates) {
      // Intentar extraer lat y lng decimales
      // Regex busca: (numero) (separador) (numero)
      var parts = coordinates.match(/([-+]?\d+(?:\.\d+)?)[,\s]+([-+]?\d+(?:\.\d+)?)/);
      if (parts && parts.length >= 3) {
        // Asumimos que el OCR devuelve "Lat, Lng". 
        // Si el OCR devuelve "Lng, Lat" (poco común pero posible en algunos formatos), esto estaría invertido.
        // Sin embargo, Google Maps espera "Lat,Lng".

        var lat = parts[1];
        var lng = parts[2];

        // Limpieza extra: asegurar que son números válidos y formatear
        query = "".concat(lat.trim(), ",").concat(lng.trim());
        console.log("Coordenadas Google formateadas:", query);

        // Usamos 'api=1&query=' con las coordenadas limpias
        openNativeUrl("https://www.google.com/maps/search/?api=1&query=".concat(encodeURIComponent(query)));
        return;
      }
    }
    var encodedQuery = encodeURIComponent(query);
    openNativeUrl("https://www.google.com/maps/search/?api=1&query=".concat(encodedQuery));
  };
  var openInAppleMaps = function openInAppleMaps() {
    var query = coordinates || address || extractedLocation;
    if (!query) return;

    // Limpieza para Apple Maps
    if (coordinates) {
      var parts = coordinates.match(/([-+]?\d+(?:\.\d+)?)[,\s]+([-+]?\d+(?:\.\d+)?)/);
      if (parts && parts.length >= 3) {
        var lat = parts[1].trim();
        var lng = parts[2].trim();
        query = "".concat(lat, ",").concat(lng);
        console.log("Coordenadas Apple formateadas:", query);

        // Apple Maps: 'll' es para centrar el mapa, 'q' es para el marcador.
        // IMPORTANTE: Apple Maps es muy sensible a espacios.
        var encodedQ = encodeURIComponent(query);
        // Usamos 'http://maps.apple.com/' que redirige a la app nativa.
        // Forzamos "ll" Y "q" para asegurar marcador y centro.
        openNativeUrl("http://maps.apple.com/?ll=".concat(lat, ",").concat(lng, "&q=").concat(encodedQ));
        return;
      }
    }
    var encodedQuery = encodeURIComponent(query);
    openNativeUrl("http://maps.apple.com/?q=".concat(encodedQuery));
  };
  var openInSygic = function openInSygic() {
    var query = coordinates || address || extractedLocation;
    if (!query) return;

    // SYGIC FIX: Usar esquema URL correcto "com.sygic.aura"
    // Formato coord: com.sygic.aura://coordinate|long|lat|drive
    // Formato address: com.sygic.aura://search|address (menos fiable)

    if (coordinates) {
      // Extraer lat/lng limpios
      // Asumimos formato "lat, lng" o similar
      var parts = coordinates.match(/([-+]?\d+(\.\d+)?)/g);
      if (parts && parts.length >= 2) {
        var lat = parts[0];
        var lng = parts[1];
        // Sygic pide longitude primero en el esquema coordinate: coordinate|long|lat|type
        openNativeUrl("com.sygic.aura://coordinate|".concat(lng, "|").concat(lat, "|drive"));
        return;
      }
    }

    // Fallback para dirección (Sygic no tiene buen deep link de búsqueda texto libre universal)
    // Intentamos fallback a Waze que es popular, o simplemente Google Maps como fallback declarado
    // Pero el usuario pidió Sygic explícitamente.
    // Esquema alternativo Android: sygic_navigation://
    // Intentaremos el esquema de búsqueda web de Sygic que a veces intercepta
    var encodedQuery = encodeURIComponent(query);
    openNativeUrl("https://go.sygic.com/travel/place?q=".concat(encodedQuery));
  };
  var resetAll = function resetAll() {
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
      height: "".concat(appHeight, "px")
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
    className: "tab-btn ".concat(activeTab === 'capture' ? 'active' : ''),
    onClick: function onClick() {
      return setActiveTab('capture');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-icon-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tab-icon"
  }, "\uD83D\uDCF8")), /*#__PURE__*/React.createElement("span", null, "Captura"), /*#__PURE__*/React.createElement("div", {
    className: "tab-indicator"
  })), /*#__PURE__*/React.createElement("button", {
    className: "tab-btn ".concat(activeTab === 'results' ? 'active' : ''),
    onClick: function onClick() {
      return setActiveTab('results');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-icon-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tab-icon"
  }, "\uD83D\uDCCD")), /*#__PURE__*/React.createElement("span", null, "Ubicaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "tab-indicator"
  })), /*#__PURE__*/React.createElement("button", {
    className: "tab-btn ".concat(activeTab === 'text' ? 'active' : ''),
    onClick: function onClick() {
      return setActiveTab('text');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-icon-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tab-icon"
  }, "\uD83D\uDCC4")), /*#__PURE__*/React.createElement("span", null, "Texto"), /*#__PURE__*/React.createElement("div", {
    className: "tab-indicator"
  })), /*#__PURE__*/React.createElement("button", {
    className: "tab-btn ".concat(activeTab === 'history' ? 'active' : ''),
    onClick: function onClick() {
      return setActiveTab('history');
    }
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
    className: "mode-option ".concat(mode === 'upload' ? 'active' : ''),
    onClick: function onClick() {
      setMode('upload');
      setHasAutoOpenedFilePicker(false);
      // Auto-abrir explorador NATIVO después de cambiar modo
      setTimeout(function () {
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
    className: "mode-option ".concat(mode === 'camera' ? 'active' : ''),
    onClick: function onClick() {
      return setMode('camera');
    }
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
      background: "linear-gradient(135deg, ".concat(scanColor, " 0%, ").concat(scanColor, "80 100%)"),
      boxShadow: "0 0 20px ".concat(scanColor, "40")
    } : {}
  }, /*#__PURE__*/React.createElement("div", {
    className: "btn-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "btn-icon"
  }, isProcessing ? '🔍' : '📸'), /*#__PURE__*/React.createElement("span", {
    className: "btn-text"
  }, isProcessing ? "ESCANEANDO ".concat(progress, "%") : 'CAPTURAR IMAGEN')))), preview && /*#__PURE__*/React.createElement("div", {
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
      top: "".concat(progress, "%"),
      backgroundColor: scanColor,
      boxShadow: "0 0 20px ".concat(scanColor)
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "scan-dots"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scan-dot",
    style: {
      animationDelay: '0s',
      backgroundColor: scanColor,
      left: '20%',
      top: "".concat(progress, "%")
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "scan-dot",
    style: {
      animationDelay: '0.5s',
      backgroundColor: scanColor,
      left: '50%',
      top: "".concat(progress, "%")
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "scan-dot",
    style: {
      animationDelay: '1s',
      backgroundColor: scanColor,
      left: '80%',
      top: "".concat(progress, "%")
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
      width: "".concat(progress, "%"),
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
    onClick: function onClick() {
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
      background: "linear-gradient(135deg, ".concat(scanColor, " 0%, ").concat(scanColor, "80 100%)"),
      color: 'white',
      border: 'none',
      boxShadow: "0 0 20px ".concat(scanColor, "40")
    } : preview && !isProcessing && progress === 0 ? {
      background: '#4CD964',
      // Green for start
      color: 'white'
    } : {}
  }, /*#__PURE__*/React.createElement("span", {
    className: "btn-icon"
  }, isProcessing ? '🔍' : preview && !isProcessing && progress === 0 ? '▶️' : '🔄'), /*#__PURE__*/React.createElement("span", {
    className: "btn-text"
  }, isProcessing ? "ESCANEANDO ".concat(progress, "%") : preview && !isProcessing && progress === 0 ? 'INICIAR ESCANEO' : 'CAMBIAR IMAGEN')))), loading && /*#__PURE__*/React.createElement("div", {
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
      background: "linear-gradient(135deg, ".concat(scanColor, " 0%, ").concat(scanColor, "80 100%)")
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
      width: "".concat(progress, "%")
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
    onChange: function onChange(e) {
      return setEditableText(e.target.value);
    },
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
    className: "edit-btn-float ".concat(isEditing ? 'active' : ''),
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
    className: "copy-btn ".concat(copied ? 'copied' : ''),
    onClick: function onClick() {
      return copyToClipboard(coordinates || address || extractedLocation);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "copy-glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "copy-icon"
  }, copied ? '✓' : '📋'), /*#__PURE__*/React.createElement("span", {
    className: "copy-text"
  }, copied ? 'COPIADO' : 'COPIAR')), /*#__PURE__*/React.createElement("button", {
    className: "share-btn ".concat(shared ? 'shared' : ''),
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
    onClick: function onClick() {
      return setActiveTab('capture');
    }
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
    onChange: function onChange(e) {
      return setEditableText(e.target.value);
    },
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
    className: "edit-btn-float ".concat(isEditing ? 'active' : ''),
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
    onClick: function onClick() {
      return copyToClipboard(text);
    }
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
    onClick: function onClick() {
      return setActiveTab('capture');
    }
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
  }, "No hay escaneos guardados localmente.")) : history.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      className: "history-item",
      onClick: function onClick() {
        return restoreHistoryItem(item);
      },
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
    }, "\u27A1\uFE0F"));
  }))))), /*#__PURE__*/React.createElement("footer", {
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
    
    console.log("✅ App renderizada sin errores");
} catch (e) {
    console.error("❌ ERROR CRITICO EN APP_STABLE:", e);
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:black; color:#ff4444; padding:20px; z-index:99999; font-family:monospace; overflow:auto;";
    errorDiv.innerHTML = "<h2>❌ ERROR DE CARGA</h2>" + 
                        "<p><b>Mensaje:</b> " + e.message + "</p>" + 
                        "<p><b>Stack:</b></p><pre>" + e.stack + "</pre>" +
                        "<hr><p>Verifica que la carpeta 'libs' esté subida correctamente a GitHub.</p>";
    document.body.appendChild(errorDiv);
}
