var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var config = JSON.parse(this.responseText);
    var vod = config.VOD;
    var live = config.LiveStream;
    var categories = [
      { data: vod.clear, label: "VOD Clear: ", subtitle: true },
      { data: vod.DRMOpen, label: "VOD DRM Open: ", drm: true, kid: vod.DRMOpenKID },
      { data: vod.DRMToken, label: "VOD DRM Token: ", token: true, drm: true, kid: vod.DRMTokenKID },
      { data: vod.encryptionOpen, label: "VOD Encryption Open: " },
      { data: vod.encryptionToken, label: "VOD Encryption Token: ", token: true },
      { data: live.clear, label: `Live stream (${live.mode}) Clear: ` },
      { data: live.DRMOpen, label: `Live stream (${live.mode}) DRM Open: `, drm: true, kid: live.DRMOpenKID },
      { data: live.DRMToken, label: `Live stream (${live.mode}) DRM Token: `, token: true, drm: true, kid: live.DRMTokenKID },
      { data: live.encryptionOpen, label: `Live stream (${live.mode}) Encryption Open: `, },
      { data: live.encryptionToken, label: `Live stream (${live.mode}) Encryption Token: `, token: true },
    ];

        
    categories.forEach(function (category) {
      if (!category.data) return;
      generateLinkElement(config, category, "video.js", "videojs-links");
      generateLinkElement(config, category, "shaka", "shaka-links");
    }, this);
  }
};

function generateLinkElement(config, category, path, links) {
  if (!category.data)
    return

  if (!Array.isArray(category.data)) {
    category.data = [category.data];
  }

  category.data.forEach(function (stream) {
    var htmlParagraphForLink = document.createElement("p");
    var htmlLinkElement = document.createElement("a");
    
    htmlLinkElement.href = `${path}/index.html?manifest=${stream.url}`;
    var linksContainer = document.getElementById(links);

    if (stream.url.includes('m3u8') > 0) {
      htmlLinkElement.href += `&format=hls`;
    }
    else {
      htmlLinkElement.href += `&format=dash`;
    }
    

    if (category.token) {
      htmlLinkElement.href += `&token=${config.Token}`;
    }

    if (category.subtitle) {
      htmlLinkElement.href += `&caption=${window.location}transcript.vtt`;
    }

    if (category.drm) {
      htmlLinkElement.href += `&widevine=${config.WidevineLicenseURL}?kid=${category.kid}`;
      htmlLinkElement.href += `&playReady=${config.PlayReadyLicenseURL}`;
      htmlLinkElement.href += `&fairPlay=${config.FairPlayLicenseURL}`;
      htmlLinkElement.href += `&fairPlayCertificate=${config.FairPlayCertificateURL}`;
    }

    htmlLinkElement.target = "_blank";
    htmlLinkElement.textContent = category.label + stream.streamingProtocol;
    htmlParagraphForLink.append(htmlLinkElement);

    linksContainer.append(htmlParagraphForLink);
  });
}

xmlhttp.open("GET", "/output.json", true);
xmlhttp.send();
