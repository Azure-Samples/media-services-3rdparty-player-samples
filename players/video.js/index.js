function initPlayer() {

  var videoJS = videojs("video");

  let subtitleKind = 'subtitles';
  let subtitleLang = 'eng';
  let subtitleLabel = 'test';

  videojs.Hls.xhr.beforeRequest = setupTokenForDecrypt;

  var typeUrl = constants.hlsType;
  if (format == "dash") {
    var typeUrl = constants.dashType;
  }

  videoJS.eme();

  if (playReadyLicenseUrl || widevineLicenseUrl || fairPlayCertificate) {
    videoJS.src({
      src: manifest,
      type: typeUrl,
      emeHeaders: {'Authorization':  "Bearer=" + getInputToken()},
      keySystems: {
        "com.microsoft.playready": playReadyLicenseUrl,
        "com.widevine.alpha": widevineLicenseUrl,
        "com.apple.fps.1_0": {
          certificateUri: fairPlayCertificate,
          licenseUri: fairPlayLicenseUrl
        }
      }
    })
  }
  else {
    videoJS.src({
      src: manifest,
      type: typeUrl
    })
  }

  var logLevelDetailsChosen = 4;

  if (logLevelDetailsChosen >= 1) {
    videojs.log.error = interceptLog("ERROR", videojs.log.error);
  };
  if (logLevelDetailsChosen >= 2) {
    videojs.log.warn = interceptLog("WARNING", videojs.log.warn);
  };
  if (logLevelDetailsChosen >= 3) {
    videojs.log.info = interceptLog("INFO", videojs.log.info);
  };
  if (logLevelDetailsChosen >= 4) {
    videojs.log.debug = interceptLog("DEBUG", videojs.log.debug);
  };

  if (caption) {
    videojs.players.video.addRemoteTextTrack({
      kind: subtitleKind,
      src: caption,
      srclang: subtitleLang,
      label: subtitleLabel
    });
  };


};

getInputToken = function () {
  return document.getElementById("tokenInput").value;
};

setupTokenForDecrypt = function (options) {
  if (options.uri.includes("keydeliver")) {
    options.headers = options.headers || {};
    options.headers.Authorization = "Bearer=" + getInputToken();
  }
  return options;
};

constants = {
  hlsType: "application/x-mpegURL",
  dashType: "application/dash+xml",
  dashCmaf: "mpd-time-cmaf",
};

colors = {
  DEBUG: "text-black",
  INFO: "text-green-500",
  WARNING: "text-yellow-500",
  ERROR: "text-red-500",
};

document.addEventListener("DOMContentLoaded", () => {
  initPlayer();
});
