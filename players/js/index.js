const xmlhttp = new XMLHttpRequest()
xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const config = JSON.parse(this.responseText)
    const vod = config.VOD
    const live = config.LiveStream
    const categories = [
      { data: vod.clear, label: 'VOD Clear: ', subtitle: true },
      { data: vod.DRMOpen, label: 'VOD DRM Open: ', drm: true, kidcenc: vod.DRMOpenKIDCENC, kidcbcs: vod.DRMOpenKIDCBCS },
      { data: vod.DRMToken, label: 'VOD DRM Token: ', token: true, drm: true, kidcenc: vod.DRMTokenKIDCENC, kidcbcs: vod.DRMTokenKIDCBCS },
      { data: vod.encryptionOpen, label: 'VOD Encryption Open: ' },
      { data: vod.encryptionToken, label: 'VOD Encryption Token: ', token: true },
      { data: live.clear, label: `Live stream (${live.mode}) Clear: ` },
      { data: live.DRMOpen, label: `Live stream (${live.mode}) DRM Open: `, drm: true, kidcenc: live.DRMOpenKIDCENC, kidcbcs: live.DRMOpenKIDCBCS },
      { data: live.DRMToken, label: `Live stream (${live.mode}) DRM Token: `, token: true, drm: true, kidcenc: live.DRMTokenKIDCENC, kidcbcs: live.DRMTokenKIDCBCS },
      { data: live.encryptionOpen, label: `Live stream (${live.mode}) Encryption Open: ` },
      { data: live.encryptionToken, label: `Live stream (${live.mode}) Encryption Token: `, token: true }
    ]

    categories.forEach(function (category) {
      if (!category.data) return
      generateLinkElement(config, category, 'video.js', 'videojs-links')
      generateLinkElement(config, category, 'shaka', 'shaka-links')
    }, this)
  }
}

function generateLinkElement (config, category, path, links) {
  if (!category.data) { return }

  if (!Array.isArray(category.data)) {
    category.data = [category.data]
  }

  category.data.forEach(function (stream) {
    const htmlParagraphForLink = document.createElement('p')
    const htmlLinkElement = document.createElement('a')

    htmlLinkElement.href = `${path}/index.html?manifest=${stream.url}`
    const linksContainer = document.getElementById(links)

    if (stream.url.includes('m3u8') > 0) {
      htmlLinkElement.href += '&format=hls'
    } else {
      htmlLinkElement.href += '&format=dash'
    }

    if (category.drm) {
      htmlLinkElement.href += `&widevine=${config.WidevineLicenseURL}?kid=${category.kidcenc}`
      htmlLinkElement.href += `&playReady=${config.PlayReadyLicenseURL}`
      if (stream.url.includes('m3u8') > 0 && config.FairPlayCertificate) {
        htmlLinkElement.href += `&fairPlay=${config.FairPlayLicenseURL}?kid=${category.kidcbcs}`
        htmlLinkElement.href += `&fairPlayCertificate=${window.location}${config.FairPlayCertificate}`
      }
    }

    if (category.token) {
      htmlLinkElement.href += `&token=${config.Token}`
    }

    if (category.subtitle) {
      htmlLinkElement.href += `&caption=${window.location}transcript.vtt`
    }

    htmlLinkElement.target = '_blank'
    htmlLinkElement.textContent = category.label + stream.streamingProtocol
    htmlParagraphForLink.append(htmlLinkElement)

    linksContainer.append(htmlParagraphForLink)
  })
}

xmlhttp.open('GET', '/output.json', true)
xmlhttp.send()
