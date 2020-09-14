
const colors = {
  DEBUG: 'text-black',
  INFO: 'text-green-500',
  WARNING: 'text-yellow-500',
  ERROR: 'text-red-500'
}

class BasePlayer {
  constructor () {
    this.manifest = this.getUrlParameter('manifest')
    this.token = this.getUrlParameter('token')
    this.caption = this.getUrlParameter('caption')
    this.format = this.getUrlParameter('format')
    this.widevineLicenseUrl = this.getUrlParameter('widevine')
    this.playReadyLicenseUrl = this.getUrlParameter('playReady')
    this.fairPlayLicenseUrl = this.getUrlParameter('fairPlay')
    this.fairPlayCertificate = this.getUrlParameter('fairPlayCertificate')
    this.autoPlay = this.getUrlParameter('autoPlay')
    this.logLevel = this.getUrlParameter('logLevel')
    this.encryptionKeyUrl = this.getUrlParameter('encryption')
    this.player = {}

    this.initPage()
  }

  parseStreamingSettingsToText () {
    let format = '<b>Format</b>: '
    let protection = '<b>Protection</b>: '
    let authorizationToken = '<b>Token</b>: '

    if (this.manifest) {
      format += `${this.manifest.includes('m3u8') ? 'HLS' : 'DASH'} ${this.manifest.includes('cmaf') ? 'CMAF' : 'TS'}`

      let procTech = 'None'
      if (this.manifest.includes('encryption=cbcs')) {
        procTech = 'DRM with CBCS encryption'
      } else if (this.manifest.includes('encryption=cenc')) {
        procTech = 'DRM with CENC encryption'
      } else if (this.manifest.includes('encryption=cbc')) {
        procTech = 'AES-128'
      }
      protection += procTech

      authorizationToken += this.token ? 'ON' : 'OFF'
    }

    const pluginsInfo = this.getPluginsInfo()
    let plugins = '<b>Plugins</b>: '
    if (pluginsInfo !== null) {
      plugins += Object.keys(pluginsInfo).reduce((acc, key) => {
        return `<br>&nbsp;&nbsp;${acc}${key}: ${pluginsInfo[key]}`
      }, '')
    } else {
      plugins += 'None'
    }

    const version = `<b>Player</b>: ${this.getPlayerInfo()}`
    return `${version}<br>${plugins}<br>${format}<br>${protection}<br>${authorizationToken}`
  }

  $ (id) {
    return document.getElementById(id)
  }

  initPage () {
    this.$('streamingSettings').innerHTML = this.parseStreamingSettingsToText()

    this.$('captionCheckbox').addEventListener('click', this.configureCaption.bind(this))
    this.$('tokenCheckbox').addEventListener('click', this.configureToken.bind(this))

    if (this.$('encryptionCheckbox')) {
      this.$('encryptionCheckbox').addEventListener('click', this.configureEncryption.bind(this))
    }

    if (this.$('widevineCheckbox')) {
      this.$('widevineCheckbox').addEventListener('click', this.configureWidevine.bind(this))
    }

    if (this.$('playReadyCheckbox')) {
      this.$('playReadyCheckbox').addEventListener('click', this.configurePlayReady.bind(this))
    }

    if (this.$('fairPlayCheckbox')) {
      this.$('fairPlayCheckbox').addEventListener('click', this.configureFairPlay.bind(this))
    }

    if (this.$('fairPlayCertificateCheckbox')) {
      this.$('fairPlayCertificateCheckbox').addEventListener('click', this.configureFairPlayCertificate.bind(this))
    }

    if (this.$('fairPlayCertificateCheckbox')) {
      this.$('fairPlayCertificateCheckbox').addEventListener('click', this.configureFairPlayCertificate.bind(this))
    }

    if (this.$('autoPlayCheckbox')) {
      this.$('autoPlayCheckbox').addEventListener('click', this.configureAutoPlay.bind(this))
    }

    this.video = document.getElementsByTagName('video')[0]
    this.$('manifestInput').value = this.manifest

    if (this.encryptionKeyUrl && this.$('encryptionInput')) {
      this.$('encryptionInput').value = this.encryptionKeyUrl
      this.$('encryptionCheckbox').checked = true
      this.configureEncryption()
    }

    if (this.caption) {
      this.$('captionInput').value = this.caption
      this.$('captionCheckbox').checked = true
      this.configureCaption()
    }

    if (this.token) {
      this.$('tokenInput').value = this.token
      this.$('tokenCheckbox').checked = true
      this.configureToken()
    }

    if (this.widevineLicenseUrl && this.$('widevineCheckbox')) {
      this.$('widevineInput').value = this.widevineLicenseUrl
      this.$('widevineCheckbox').checked = true
      this.configureWidevine()
    }

    if (this.playReadyLicenseUrl && this.$('playReadyInput')) {
      this.$('playReadyInput').value = this.playReadyLicenseUrl
      this.$('playReadyCheckbox').checked = true
      this.configurePlayReady()
    }

    if (this.fairPlayLicenseUrl && this.$('fairPlayCheckbox')) {
      this.$('fairPlayInput').value = this.fairPlayLicenseUrl
      this.$('fairPlayCheckbox').checked = true
      this.configureFairPlay()
    }

    if (this.fairPlayCertificate && this.$('fairPlayCertificateCheckbox')) {
      this.$('fairPlayCertificateInput').value = this.fairPlayCertificate
      this.$('fairPlayCertificateCheckbox').checked = true
      this.configureFairPlayCertificate()
    }

    this.$('autoPlayCheckbox').checked = this.autoPlay ? this.autoPlay === 'true' : true
    this.$('autoPlayInput').value = this.autoPlay ? this.autoPlay : 'true'
    if (!this.$('autoPlayCheckbox').checked) {
      this.video.removeAttribute('muted')
      this.video.removeAttribute('autoplay')
    }

    if (this.keyDeliveryUrl && this.$('keyDeliveryUrl')) {
      this.$('keyDeliveryUrl').value = this.keyDeliveryUrl
    }

    if (this.format === 'hls' && this.$('selectHls')) {
      this.$('selectHls').selected = 'true'
    }

    if (this.format === 'dash' && this.$('selectDash')) {
      this.$('selectDash').selected = 'true'
    }

    if (!this.logLevel) {
      this.logLevel = '3'
    }
    this.$('selectLogLevel').value = this.logLevel
  }

  chooseFormat () {
    this.selectFormat = this.$('formatsUrl').value
  }

  getUrlParameter (name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    const results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  }

  configureCaption () {
    this.$('captionInput').disabled = !this.$('captionCheckbox').checked

    if (this.$('captionInput').disabled) {
      this.$('captionInput').value = ''
    }
  }

  configureEncryption () {
    this.$('encryptionInput').disabled = !this.$('encryptionCheckbox').checked

    if (this.$('encryptionInput').disabled) {
      this.$('encryptionInput').value = ''
    }
  }

  configureToken () {
    this.$('tokenInput').disabled = !this.$('tokenCheckbox').checked

    if (this.$('tokenInput').disabled) {
      this.$('tokenInput').value = ''
    }
  }

  getInputToken () {
    return this.$('tokenInput').value
  }

  configureWidevine () {
    this.$('widevineInput').disabled = !this.$('widevineCheckbox').checked

    if (this.$('widevineInput').disabled) {
      this.$('widevineInput').value = ''
    }
  }

  configurePlayReady () {
    this.$('playReadyInput').disabled = !this.$('playReadyCheckbox').checked

    if (this.$('playReadyInput').disabled) {
      this.$('playReadyInput').value = ''
    }
  }

  configureFairPlay () {
    this.$('fairPlayInput').disabled = !this.$('fairPlayCheckbox').checked

    if (this.$('fairPlayInput').disabled) {
      this.$('fairPlayInput').value = ''
    }
  }

  configureFairPlayCertificate () {
    this.$('fairPlayCertificateInput').disabled = !this.$('fairPlayCertificateCheckbox').checked

    if (this.$('fairPlayCertificateInput').disabled) {
      this.$('fairPlayCertificateInput').value = ''
    }
  }

  configureAutoPlay () {
    this.$('autoPlayInput').value = this.$('autoPlayCheckbox').checked ? 'true' : 'false'
  }

  addErrorMessage (message) {
    this.addMessage('ERROR', message)
  }

  addWarningMessage (message) {
    if (this.logLevel > 1) {
      this.addMessage('WARNING', message)
    }
  }

  addInfoMessage (message) {
    if (this.logLevel > 2) {
      this.addMessage('INFO', message)
    }
  }

  addDebugMessage (message) {
    if (this.logLevel > 3) {
      this.addMessage('DEBUG', message)
    }
  }

  addMessage (type, message) {
    if (!message) {
      return
    }

    const log = document.createElement('p')
    log.classList.add(colors[type])

    const now = new Date()
    log.textContent += now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds() + ' '
    log.textContent += '[' + type + '] '
    log.textContent += message

    const playerEvents = this.$('playerEvents')
    playerEvents.append(log)

    playerEvents.scrollTop = playerEvents.scrollHeight
  }

  interceptLog (type) {
    return function () {
      this.addMessage(type, Array.from(arguments).filter(Boolean).join(' '))
    }.bind(this)
  }

  getLocation (href) {
    const l = document.createElement('a')
    l.href = href
    return l
  }

  getPlayerInfo () {
    return ''
  }

  getPluginsInfo () {
    // override in each player as key-value pair with format label: version
    return null
  }
}

export default BasePlayer
