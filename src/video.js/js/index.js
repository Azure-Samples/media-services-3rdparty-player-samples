import configuration from './configuration.js'

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
      { data: vod.encryptionOpen, label: 'VOD Encryption Open: ', encryption: true },
      { data: vod.encryptionToken, label: 'VOD Encryption Token: ', encryption: true, token: true },
      { data: live.clear, label: `Live stream (${live.mode}) Clear: ` },
      { data: live.DRMOpen, label: `Live stream (${live.mode}) DRM Open: `, drm: true, kidcenc: live.DRMOpenKIDCENC, kidcbcs: live.DRMOpenKIDCBCS },
      { data: live.DRMToken, label: `Live stream (${live.mode}) DRM Token: `, token: true, drm: true, kidcenc: live.DRMTokenKIDCENC, kidcbcs: live.DRMTokenKIDCBCS },
      { data: live.encryptionOpen, label: `Live stream (${live.mode}) Encryption Open: `, encryption: true },
      { data: live.encryptionToken, label: `Live stream (${live.mode}) Encryption Token: `, encryption: true, token: true }
    ]

    configuration.players.forEach(function (player) {
      generatePlayerConteiner(player)
    }, this)

    categories.forEach(function (category) {
      if (!category.data) return

      configuration.players.forEach(function (player) {
        generateLinkElement(config, category, player)
      }, this)
    }, this)
  }
}

function generatePlayerConteiner (player) {
  const htmlLinkPlayer = document.createElement('a')
  htmlLinkPlayer.href = player.link
  htmlLinkPlayer.target = '_blank'
  htmlLinkPlayer.textContent = player.name

  const htmlH3ForPlayer = document.createElement('h3')
  htmlH3ForPlayer.setAttribute('class', 'my-0 mb-2 text-xl font-bold')
  htmlH3ForPlayer.append(htmlLinkPlayer)

  const htmlDivForPlayer = document.createElement('div')
  htmlDivForPlayer.setAttribute('class', 'my-4 p-4 bg-gray-200 rounded shadow')
  htmlDivForPlayer.id = player.name
  htmlDivForPlayer.append(htmlH3ForPlayer)

  const playersContainer = document.getElementById('playersContainer')
  if (player.mobile) {
    const htmlSpanForPlayer = document.createElement('span')
    htmlSpanForPlayer.setAttribute('class', 'mobileShow')
    htmlSpanForPlayer.append(htmlDivForPlayer)

    playersContainer.append(htmlSpanForPlayer)
  } else {
    playersContainer.append(htmlDivForPlayer)
  }
}

function generateLinkElement (config, category, player) {
  if (!category.data) { return }

  if (!Array.isArray(category.data)) {
    category.data = [category.data]
  }

  category.data.forEach(function (stream) {
    if (player.formats.indexOf(stream.format) === -1) { return }
    if (stream.encryption !== '' && player.encryptions.indexOf(stream.encryption) === -1) { return }

    const htmlParagraphForLink = document.createElement('p')
    const htmlLinkElement = document.createElement('a')

    htmlLinkElement.href = `${player.link}?manifest=${stream.url}`
    const linksContainer = document.getElementById(player.name)

    if (stream.url.includes('m3u8') > 0) {
      htmlLinkElement.href += '&format=hls'
    } else {
      htmlLinkElement.href += '&format=dash'
    }

    if (category.drm) {
      htmlLinkElement.href += `&widevine=${config.WidevineLicenseURL}?kid=${category.kidcenc}`
      htmlLinkElement.href += `&playReady=${config.PlayReadyLicenseURL}`
      if (stream.url.includes('m3u8') > 0 && config.FairPlayPublicCertPath) {
        htmlLinkElement.href += `&fairPlay=${config.FairPlayLicenseURL}?kid=${category.kidcbcs}`
        htmlLinkElement.href += `&fairPlayCertificate=${window.location}${config.FairPlayPublicCertPath}`
      }
    }

    if (category.token) {
      htmlLinkElement.href += `&token=${config.Token}`
      htmlLinkElement.href += `&encryption=${config.KeyDeliveryUrl}`
    }

    if (category.subtitle) {
      htmlLinkElement.href += `&caption=${window.location}transcript.vtt`
    }

    htmlLinkElement.target = '_blank'
    htmlLinkElement.textContent = category.label + stream.description
    htmlParagraphForLink.append(htmlLinkElement)

    linksContainer.append(htmlParagraphForLink)
  })
}

xmlhttp.open('GET', 'output.json', true)
xmlhttp.send()
