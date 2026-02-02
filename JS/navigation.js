// navigation-capacitor-ready.js
// Usar esto en tu index.html o importarlo como js/navigation.js

async function navigatePro() {
  if (!currentCoords) {
    log('❌ Primero analiza la imagen');
    return;
  }

  const [lat, lon] = currentCoords.split(',').map(s => s.trim());
  const sygicUrl = `com.sygic.aura://coordinate|${lat}|${lon}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${lat},${lon}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

  // Si estamos en Capacitor (app nativa) intentamos usar plugin nativo para canOpenURL
  if (window.Capacitor) {
    try {
      // 1) pedir al plugin nativo si Sygic puede abrirse
      const { isInstalled } = await window.SygicChecker?.isInstalled({ scheme: 'com.sygic.aura' }) || { isInstalled: false };

      if (isInstalled) {
        // abrir Sygic
        await window.Capacitor.Plugins.App.openUrl({ url: sygicUrl });
        return;
      } else {
        // abrir Apple Maps (mejor experiencia iOS)
        await window.Capacitor.Plugins.App.openUrl({ url: appleMapsUrl });
        return;
      }
    } catch (err) {
      console.warn('Capacitor openUrl error, fallback a Apple Maps', err);
      window.location.href = appleMapsUrl;
      return;
    }
  }

  // WEB / PWA fallback: intentar abrir Sygic scheme y luego Google
  try {
    const a = document.createElement('a');
    a.href = sygicUrl;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      window.location.href = googleMapsUrl;
    }, 1200);
  } catch (e) {
    window.location.href = googleMapsUrl;
  }
}
