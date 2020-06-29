## Issue #1

HLS wiht Widevine is not suported. It may be thatAzure  is not providing the EXT-X-Key in the HLS manifest.

------

## Issue #2 AES-128 

Shaka Player doesn't directly do any decryption. That's a matter for the Encrypted Media Extensions (EME) and for the Content Decryption Module (CDM) implementations, which use a version of Common Encryption (CENC) which only uses AES-128-CTR.  
The Clear Key CDM (which has been implemented in Chrome and Firefox and is the component that does the decryption) uses AES-128-CTR only at this time. 

In Azure Media Services, PlayReady and Widevine utilize common encryption (AES CTR mode). FairPlay utilizes AES CBC-mode encryption. AES-128 clear key encryption utilizes envelope encryption. 

**In conclusion, Shaka player is not compatible with the AES-128 content generated in Azure media services.**

A link to a github issue to follow the status of this feature in Shaka: 

https://github.com/google/shaka-player/issues/850

------

## Issue #4 DAHS CMAF on iOS

On iOS 12+ through Apple's native HLS player. Shaka provides the same top-level API, but Shaka just set the video's src element to the manifest/media. So Shaka is dependent on the browser supporting the manifests. So DASH is not souported11

https://github.com/google/shaka-player#platform-and-browser-support-matrix

------

## Issue #6

Shaka doesn't support PlayReady in HLS. We found that Shaka are working on it. The issues is reported in: https://github.com/google/shaka-player/issues/1145 

------

## Issue #7 Edge HLS LowLatency Clear

We did not find an issues on Video.js GitHub.

------

## Issue #8 Mac with Low Latency

We did not find an issues on Video.js GitHub.

------

## Issue #11 DASH in Android with Firefox 

We did not find an issues on Video.js GitHub.

------

## Issue #12 HLS with Live transcription

https://github.com/google/shaka-player/issues/1996

------
