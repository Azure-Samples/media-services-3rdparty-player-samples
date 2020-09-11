
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

    this.initPage()
  }

  $ (id) {
    return document.getElementById(id)
  }

  initPage () {
    this.$('captionCheckbox').addEventListener('click', this.configureCaption.bind(this))
    this.$('tokenCheckbox').addEventListener('click', this.configureToken.bind(this))

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

    this.video = this.$('video')
    this.$('manifestInput').value = this.manifest

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

    if (this.format === 'hls' && this.$('selectHls')) {
      this.$('selectHls').selected = 'true'
    }

    if (this.format === 'dash' && this.$('selectDash')) {
      this.$('selectDash').selected = 'true'
    }
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

  configureToken () {
    this.$('tokenInput').disabled = !this.$('tokenCheckbox').checked

    if (this.$('tokenInput').disabled) {
      this.$('tokenInput').value = ''
    }
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
}

export default BasePlayer
