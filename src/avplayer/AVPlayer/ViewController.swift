import UIKit
import AVKit
import AVFoundation

var audioSession = AVAudioSession.sharedInstance()

class ViewController: UIViewController, AVAssetResourceLoaderDelegate {
    @IBOutlet weak var versionLabel: UILabel!
    @IBOutlet weak var formatLabel: UILabel!
    @IBOutlet weak var protectionLabel: UILabel!
    @IBOutlet weak var tokenLabel: UILabel!
    @IBOutlet weak var urlInput: UITextField!
    @IBOutlet weak var Token: UITextField!
    @IBOutlet weak var urlLicense: UITextField!
    @IBOutlet weak var urlCertificate: UITextField!
    @IBOutlet weak var autoPlay: UISwitch!
    @IBOutlet weak var playerEvents: UITextView!
    var player: AVPlayer?
    let controller = AVPlayerViewController()
    var alertController: UIAlertController?
    var pipe = Pipe()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        alertController = UIAlertController(title: "No URL.", message: "You must add an URL to play video.", preferredStyle: UIAlertController.Style.alert)
        alertController!.addAction(UIAlertAction(title: "Ok", style: UIAlertAction.Style.default, handler: nil))
        self.avPlayerSetup()
        self.setLabelsValues()
        let name = Notification.Name("loadFromDeepLinking")
        NotificationCenter.default.addObserver(self, selector: #selector(onDidReceiveData(_:)), name: name, object: nil)
        _ = player?.observe(\.currentItem, options: [.new]) {
            [weak self] (player, _) in
            self!.logEvents(notification: "Player is ready", type: "debug")
        }
    }
    
    @objc func onDidReceiveData(_ notification:Notification ) {
        var dataFromDeepLinking: [String:String] = [:]
        dataFromDeepLinking = notification.userInfo as? [String:String] ?? [:]
        updateFromDeepLinking(data: dataFromDeepLinking)
    }
    
    func logEvents(notification: String, type: String) {
        playerEvents.text += "\n" + notification
    }
    
    func avPlayerSetup() {
         do {
            try audioSession.setCategory(AVAudioSession.Category.playback)
            try audioSession.overrideOutputAudioPort(AVAudioSession.PortOverride.speaker)
            try audioSession.setActive(true)
        } catch {
            playerEvents.text += "\n" + "AVPlayer setup error \(error.localizedDescription)"
        }

    }

    func addPlayer() {
        guard let manifestURL = urlInput.text else {
            present(alertController!, animated: true, completion: nil)
            return
        }
        guard let videoUrl = URL(string: manifestURL) else {
            present(alertController!, animated: true, completion: nil)
            return
        }
        
        guard let token = Token.text else {
            present(alertController!, animated: true, completion:nil)
            return
        }
        setLabelsValues()
       
        var options = [String: [String: String]]()
        if (!token.isEmpty) {
            let headers = ["Authorization": "Bearer " + Token.text!]
            options = ["AVURLAssetHTTPHeaderFieldsKey": headers]
        }
        let avAsset = AVURLAsset(url: videoUrl, options: options)
        let avItem = AVPlayerItem(asset: avAsset)
        let player = AVPlayer(playerItem: avItem)
        
        let playerFrame = view.viewWithTag(1)?.frame
        controller.player = player
        if (autoPlay.isOn) {
            player.rate = 1
        }
        controller.view.frame = playerFrame ?? CGRect(x: 0, y: 0, width: view.frame.width , height: 250)
        addChild(controller)
        view.viewWithTag(1)?.addSubview(controller.view)
        controller.didMove(toParent: self)

    }
    
    @IBAction func playVideo(_ sender: AnyObject) {
        player = nil
        addPlayer()
    }
    
    func setLabelsValues () {
        guard let manifestURL = urlInput.text else {
            present(alertController!, animated: true, completion: nil)
            return
        }
        
        guard let token = Token.text else {
            present(alertController!, animated: true, completion:nil)
            return
        }
        
        let PlayerVersion = "AVPlayer v." + String(AVPlayer.version())
        var TokenActivated = ""
        var Format = ""
        var Protection = ""
        if (!manifestURL.isEmpty) {
            let ContentProtocol = manifestURL.contains("m3u8") ? "HLS" : "CMAF"
            let ProtocolVersion = manifestURL.contains("cmaf") ? "CMAF" : "TS"
            Format = ContentProtocol + " " + ProtocolVersion
            Protection = "NONE"
            if (manifestURL.contains("encryption=cbcs")) {
                Protection = "DRM with CBCS encryption"
            } else if (manifestURL.contains("encryption=cenc")) {
                Protection = "DRM with CENC encryption"
            } else if (manifestURL.contains("encyption=cbc")) {
                Protection = "AES-128"
            }
            TokenActivated = token.isEmpty ? "OFF" : "ON"
        }
        versionLabel.text = PlayerVersion
        formatLabel.text = Format
        protectionLabel.text = Protection
        tokenLabel.text = TokenActivated
        
    }
    
    func updateFromDeepLinking (data: [String: String]) {
        urlInput.text = data["manifest"] ?? ""
        Token.text = data["token"] ?? ""
        urlLicense.text = data["fairPlay"] ?? ""
        urlCertificate.text = data["fairPlayCertificate"] ?? ""
        player = nil
        addPlayer()
    }
    
    func resourceLoader(_ resourceLoader: AVAssetResourceLoader, shouldWaitForLoadingOfRequestedResource loadingRequest: AVAssetResourceLoadingRequest) -> Bool {
        
        let ckcURLString = urlCertificate.text!
        
        guard
            let certificateURL = Bundle.main.url(forResource: "certfps", withExtension: "cer"),
            let certificateData = try? Data(contentsOf: certificateURL) else {
                playerEvents.text += "\n" + "Unable to read the certificate data."
                loadingRequest.finishLoading(with: NSError(domain: "com.error", code: -2, userInfo: nil))
                return false
        }
        
        let contentID = urlLicense.text!
        guard
            let contentIdData = contentID.data(using: String.Encoding.utf8),
            let spcData = try? loadingRequest.streamingContentKeyRequestData(forApp: certificateData, contentIdentifier: contentIdData, options: nil),
            let dataRequest = loadingRequest.dataRequest else {
                loadingRequest.finishLoading(with: NSError(domain: "com.error", code: -3, userInfo: nil))
                playerEvents.text += "\n" + "Unable to read the SPC data."
                return false
        }
        
        let ckcURL = URL(string: ckcURLString )!
        var request = URLRequest(url: ckcURL)
        request.httpMethod = "POST"
        let assetIDString = contentID
        let postString = "spc=\(spcData.base64EncodedString())&assetId=\(assetIDString)"
        request.setValue(String(postString.count), forHTTPHeaderField: "Content-Length")
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
        let JWTToken = Token.text ?? ""
        if (!JWTToken.isEmpty) {
            request.setValue("Bearer \(JWTToken)", forHTTPHeaderField: "Authorization")
        }
        request.httpBody = postString.data(using: .ascii, allowLossyConversion: true)
        let session = URLSession(configuration: URLSessionConfiguration.default)
        let task = session.dataTask(with: request) { data, response, error in
            if let data = data {
                if var responseString = String(data: data, encoding: .utf8) {
                    responseString = responseString.replacingOccurrences(of: "<ckc>", with: "").replacingOccurrences(of: "</ckc>", with: "")
                    let ckcData = Data(base64Encoded: responseString)!
                    dataRequest.respond(with: ckcData)
                    loadingRequest.finishLoading()
                }
                else{
                    self.playerEvents.text += "\n" + "Empty response"
                }

            } else {
                self.playerEvents.text += "\n" +  "Unable to fetch the CKC."
                loadingRequest.finishLoading(with: NSError(domain: "com.error", code: -4, userInfo: nil))
            }
        }
        task.resume()

        return true
    }
    
}

extension ViewController : UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}
