# Media Services 3rd Party Player Samples - AVPlayer

## Overview

AVPlayer is a controller object used to manage the playback and timing of a media asset on iOS. You can use an AVPlayer to play local and remote file-based media, such as QuickTime movies and MP3 audio files, as well as audiovisual media served using HTTP Live Streaming.
Its official documentation can be found [here](https://developer.apple.com/documentation/avfoundation/avplayer "AVPlayer documentation").

## Sample code

Sample code for this article is available at [Azure-Samples/media-services-3rdparty-player-samples](https://github.com/Azure-Samples/media-services-3rdparty-player-samples).

## Implement the player

Follow these instructions if you need to implement your own instance of the player.

1. Import `AVFoundation` and `AVKit` in your view Controller.

    ```swift
    import AVKit
    import AVFoundation
    ```

2. Creating asset with the URL of the manifest and the Player item from it:

    ```swift
    let avAsset = AVURLAsset(url: manifestURL)
    let avItem = avPlayerItem(asset: avAsset)
    ```

3. Replace `ManifestURI` with the HLS URL from the streaming locator of your asset which can be found on the streaming locator page in the Azure portal.

    ![streaming locator URLs](https://docs.microsoft.com/en-us/azure/media-services/latest/media/how-to-shaka-player/streaming-urls.png)
    
4. Create the player with the player item:

    ```swift
    let player = AVPlayer(playerItem: avItem)
    ```

5. Assign the player to the view, creating a controller

   ```swift
   let controller = AVPlayerViewController()
   controller.player = player
   addChild(controller)
   ```

## Set up captions

### Set up VOD captions

With AVPlayer to reproduce captions from an URL, it must be specified in the manifest. Since Azure Media Services don't include this in the HLS manifests, it is not posible.

### Set up live stream captions

AVPlayer reproduce WebVTT and TTML captions without any extra configuration.

## Set up token authentication

### AES-128

You must include in the creation of the AVURLAsset the Authorization header with:

```swift
let headers = ["Authorization": "Bearer "+JWTToken]
let options = ["AVURLAssetHTTPHeaderFieldsKey": headers]
let avAsset = AVURLAsset(url: manifestURL, options: options)
```

### DRM

You must add to the request the header with:

```swift
request.setValue("Bearer "+JWTToken, forHTTPHeaderField: "Authorization")
```

## Set up AES-128 encryption

AVPlayer automatically reads the configuration of AES-128 from the manifest and resolves the request without further input from the user.

## Set up DRM protection

One key thing to note is FairPlay HLS streaming will only work on a real Apple device, not on a simulator.
First you must adopt the AVAssetResourceLoaderDelegate protocol in our view controller:

```swift
class ViewController: UIViewController, AVAssetResourceLoaderDelegate {
```

And then add a resourceLoader function which will be triggered as soon as the AVPlayer tries to play the encrypted streams.

```swift
func resourceLoader(_ resourceLoader: AVAssetResourceLoader, shouldWaitForLoadingOfRequestedResource loadingRequest: AVAssetResourceLoadingRequest) -> Bool {
    // We first check if a url is set in the manifest.
    guard let url = loadingRequest.request.url else {
        print("", #function, "Unable to read the url/host data.")
        loadingRequest.finishLoading(with: NSError(domain: "com.error", code: -1, userInfo: nil))
        return false
    }       
    ckcURLString = url.absoluteString.replacingOccurrences(of: "skd", with: "https")

    // When the url is correctly found we try to load the certificate data.
    guard
        let certificateURL = Bundle.main.url(forResource: "certfps", withExtension: "cer"),
        let certificateData = try? Data(contentsOf: certificateURL) else {
            print(#function, "Unable to read the certificate data.")
            loadingRequest.finishLoading(with: NSError(domain: "com.error", code: -2, userInfo: nil))
            return false
    }

    // Request the Server Playback Context.
    guard
        let contentIdData = contentID.data(using: String.Encoding.utf8),
        let spcData = try? loadingRequest.streamingContentKeyRequestData(forApp: certificateData, contentIdentifier: contentIdData, options: nil),
        let dataRequest = loadingRequest.dataRequest else {
            loadingRequest.finishLoading(with: NSError(domain: "com.error", code: -3, userInfo: nil))
            print(#function, "Unable to read the SPC data.")
            return false
    }

    //get CKC
    let ckcURL = URL(string: self.ckcURLString )!
    var request = URLRequest(url: ckcURL)
    request.httpMethod = "POST"
    let assetIDString = self.contentID
    let postString = "spc=\(spcData.base64EncodedString())&assetId=\(assetIDString)"
    request.setValue(String(postString.count), forHTTPHeaderField: "Content-Length")
    request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
    request.setValue("Bearer \(jwt)", forHTTPHeaderField: "Authorization")
    request.httpBody = postString.data(using: .ascii, allowLossyConversion: true)
    let session = URLSession(configuration: URLSessionConfiguration.default)
    let task = session.dataTask(with: request) { data, response, error in
        if let data = data {
            // The CKC is correctly returned and is now send to the `AVPlayer` instance so you can continue to play the stream.
            if var responseString = String(data: data, encoding: .utf8) {
                responseString = responseString.replacingOccurrences(of: "<ckc>", with: "").replacingOccurrences(of: "</ckc>", with: "")
                let ckcData = Data(base64Encoded: responseString)!
                dataRequest.respond(with: ckcData)
                loadingRequest.finishLoading()
            }
            else{
                print(#function, "Empty response")
            }

        } else {
            print(#function, "Unable to fetch the CKC.")
            loadingRequest.finishLoading(with: NSError(domain: "com.error", code: -4, userInfo: nil))
        }
    }
    task.resume()
    return true
}
```
