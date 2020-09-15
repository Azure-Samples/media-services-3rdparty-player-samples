
const configuration = {
  players: [
    { name: 'Video.js', link: 'video.js/index.html', formats: ['DASH', 'HLS'], encryptions: ['CENC', 'CBCS', 'CBC'] },
    { name: 'Shaka', link: 'shaka/index.html', formats: ['DASH', 'HLS'], encryptions: ['CENC', 'CBCS', 'CBC'] },
    { name: 'hls.js', link: 'hls.js/index.html', formats: ['HLS'], encryptions: ['CENC', 'CBC'] },
    { name: 'dash.js', link: 'dash.js/index.html', formats: ['DASH'], encryptions: ['CENC', 'CBC'] },
    { name: 'ExoPlayer', link: 'azure-samples://exoplayer', formats: ['DASH', 'HLS'], encryptions: ['CENC', 'CBC'], mobile: true },
    { name: 'AVPlayer', link: 'azure-samples://avplayer', formats: ['HLS'], encryptions: ['CBC', 'CBCS'], mobile: true },
    { name: 'THEOPlayer', link: 'THEOPlayer/index.html', formats: ['DASH', 'HLS'], encryptions: ['CENC', 'CBCS', 'CBC'] }
  ]
}

export default configuration
