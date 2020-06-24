async function initPlayer() {
  shaka.polyfill.installAll();
  var loglevel = parseInt(getUrlParameter('loglevel')) || shaka.log.Level.INFO;
  shaka.log.setLevel(loglevel);
  document.getElementById('loglevelInput').value = loglevel;

  switch (loglevel) {
    case 6:
      shaka.log.v2 = interceptLog('V2', shaka.log.v2);
    case 5:
      shaka.log.v1 = interceptLog('V1', shaka.log.v1);
    case 4:
      shaka.log.debug = interceptLog('DEBUG', shaka.log.debug);
    case 3:
      shaka.log.info = interceptLog('INFO', shaka.log.info);
    case 2:
      shaka.log.warning = interceptLog('WARNING', shaka.log.warning);
    case 1:
      shaka.log.error = interceptLog('ERROR', shaka.log.error);
  }

  if (manifest) {
    var player = new shaka.Player(video);
    window.player = player;

    player.addEventListener('error', ErrHandler);

    function ErrHandler(err) {
      if (err.detail.code === shaka.util.Error.Code.LICENSE_REQUEST_FAILED) {
        var originalError = err.detail.data[0];
        addMessage('ERROR', 'HTTP Error ' + originalError.data[1] + ' at ' + originalError.data[0]);
      }
    }

    if (token) {
      player.getNetworkingEngine().registerRequestFilter(function (type, request) {
        if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
          request.headers['Authorization'] = 'Bearer ' + token;
        }
      });
    }

    player.setTextTrackVisibility(true)
    if (caption)
      player.configure('streaming.alwaysStreamText', true)

    if (fairPlayCertificate){
      try {
	const req = await fetch(fairPlayCertificate);
	const cert = await req.arrayBuffer();
	player.configure('drm.advanced.com\\.apple\\.fps\\.1_0.serverCertificate', new Uint8Array(cert));
      } catch (error) {
	addMessage('ERROR', 'Load FairPlay Certificate Error: ' + error);
	return false;
      }
    }

    player.load(manifest).then(function () {
      if (caption) {
        player.addTextTrack(caption, 'en', 'caption', 'text/vtt');
        var tracks = player.getTextTracks();
        player.selectTextTrack(tracks[0]);
      }
    }).catch(function (error) {
      addMessage('ERROR', 'Load Manifest Error: ' + error);
      return false;
    });
  }

  return true;
}

colors = {
  DEBUG: 'text-black',
  INFO: 'text-green-500',
  WARNING: 'text-yellow-500',
  ERROR: 'text-red-500',
};

document.addEventListener('DOMContentLoaded', initPlayer);
