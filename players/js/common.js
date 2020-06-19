var manifest = getUrlParameter('manifest');
var token = getUrlParameter('token');
var caption = getUrlParameter('caption');
var format = getUrlParameter('format');
var widevineLicenseUrl = getUrlParameter('widevine');
var playReadyLicenseUrl = getUrlParameter('playReady');
var fairPlayLicenseUrl = getUrlParameter('fairPlay');
var fairPlayCertificate = getUrlParameter('fairPlayCertificate');

function initPage() {
  document.getElementById('captionCheckbox').addEventListener('click', configureCaption);
  document.getElementById('tokenCheckbox').addEventListener('click', configureToken);

  if (document.getElementById('widevineCheckbox'))
    document.getElementById('widevineCheckbox').addEventListener('click', configureWidevine);
  if (document.getElementById('playReadyCheckbox'))
    document.getElementById('playReadyCheckbox').addEventListener('click', configurePlayReady);
  if (document.getElementById('fairPlayCheckbox'))
    document.getElementById('fairPlayCheckbox').addEventListener('click', configureFairPlay);
  if (document.getElementById('fairPlayCertificateCheckbox'))
    document.getElementById('fairPlayCertificateCheckbox').addEventListener('click', configureFairPlayCertificate);

  var video = document.getElementById('video');
  document.getElementById('manifestInput').value = manifest;

  if (caption) {
    document.getElementById('captionInput').value = caption;
    document.getElementById('captionCheckbox').checked = true;
    configureCaption();
  }

  if (token) {
    document.getElementById('tokenInput').value = token;
    document.getElementById('tokenCheckbox').checked = true;
    configureToken();
  }

  if (widevineLicenseUrl && document.getElementById('widevineCheckbox')) {
    document.getElementById('widevineInput').value = widevineLicenseUrl;
    document.getElementById('widevineCheckbox').checked = true;
    configureWidevine();
  }

  if (playReadyLicenseUrl && document.getElementById('playReadyInput')) {
    document.getElementById('playReadyInput').value = playReadyLicenseUrl;
    document.getElementById('playReadyCheckbox').checked = true;
    configurePlayReady();
  }

  if (fairPlayLicenseUrl && document.getElementById('fairPlayCheckbox')) {
    document.getElementById('fairPlayInput').value = fairPlayLicenseUrl;
    document.getElementById('fairPlayCheckbox').checked = true;
    configureFairPlay();
  }

  if (fairPlayCertificate && document.getElementById('fairPlayCertificateCheckbox')) {
    document.getElementById('fairPlayCertificateInput').value = fairPlayCertificate;
    document.getElementById('fairPlayCertificateCheckbox').checked = true;
    configureFairPlayCertificate();
  }


  if (format == 'hls' && document.getElementById("selectHls")) {
    document.getElementById("selectHls").selected = "true";
  }

  if (format == 'dash' && document.getElementById("selectDash")) {
    document.getElementById("selectDash").selected = "true";
  }
}

function chooseFormat() {
  selectFormat = document.getElementById("formatsUrl").value;
}


function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function configureCaption() {
  document.getElementById('captionInput').disabled = !document.getElementById('captionCheckbox').checked


  if (document.getElementById('captionInput').disabled)
    document.getElementById('captionInput').value = '';
}

function configureToken() {
  document.getElementById('tokenInput').disabled = !document.getElementById('tokenCheckbox').checked

  if (document.getElementById('tokenInput').disabled)
    document.getElementById('tokenInput').value = '';
}

function configureWidevine() {
  document.getElementById('widevineInput').disabled = !document.getElementById('widevineCheckbox').checked

  if (document.getElementById('widevineInput').disabled)
    document.getElementById('widevineInput').value = '';
}

function configurePlayReady() {
  document.getElementById('playReadyInput').disabled = !document.getElementById('playReadyCheckbox').checked

  if (document.getElementById('playReadyInput').disabled)
    document.getElementById('playReadyInput').value = '';
}
function configureFairPlay() {
  document.getElementById('fairPlayInput').disabled = !document.getElementById('fairPlayCheckbox').checked

  if (document.getElementById('fairPlayInput').disabled)
    document.getElementById('fairPlayInput').value = '';
}

function configureFairPlayCertificate() {
  document.getElementById('fairPlayCertificateInput').disabled = !document.getElementById('fairPlayCertificateCheckbox').checked

  if (document.getElementById('fairPlayCertificateInput').disabled)
    document.getElementById('fairPlayCertificateInput').value = '';
}

function addMessage(type, message) {
  if (!message) return

  var log = document.createElement('p');
  log.classList.add(colors[type]);

  var now = new Date();
  log.textContent += now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds() + ' ';
  log.textContent += '[' + type + '] ';
  log.textContent += message;

  playerEvents.append(log);

  playerEvents.scrollTop = playerEvents.scrollHeight;
}

function interceptLog(type, log) {
  return function () {
    addMessage(type, Array.from(arguments).filter(Boolean).join(' '));
  }
}

document.addEventListener('DOMContentLoaded', initPage);
