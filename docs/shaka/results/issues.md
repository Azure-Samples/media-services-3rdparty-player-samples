# Issues

## Issue #1

HLS CMAF with Widevine

Azure Media Services does not yet support EXT-X-KEY in the manifest for Widevine with HLS.

------

## Issue #2

AES-128

Shaka Player doesn't directly do any decryption. That's a matter for the Encrypted Media Extensions (EME) and for the Content Decryption Module (CDM) implementations, which use a version of Common Encryption (CENC) which only uses AES-128-CTR.  
The ClearKey CDM (which has been implemented in Chrome and Firefox and is the component that does the decryption) uses AES-128-CTR only at this time.

In Azure Media Services, PlayReady and Widevine utilize common encryption (AES CTR mode). FairPlay utilizes AES CBC-mode encryption. AES-128 ClearKey encryption utilizes envelope encryption.

**In conclusion, Shaka player is not compatible with the AES-128 content generated in Azure media services.**

- The issue is reported [here](https://github.com/google/shaka-player/issues/850).

------

## Issue #4

DASH CMAF on iOS

On iOS 12+ through Apple's native HLS player. Shaka provides the same top-level API, but Shaka just sets the video's src element to the manifest/media. So Shaka is dependent on the browser supporting the manifests. So DASH is not supported yet.

- The issue is reported [here](https://github.com/google/shaka-player#platform-and-browser-support-matrix).

------

## Issue #6

PlayReady in HLS

Shaka doesn't support PlayReady in HLS yet. Shaka team is working on it.

- The issue is reported: [here](https://github.com/google/shaka-player/issues/1145).

------

## Issue #10

PlayReady in DASH CMAF for the new chromium version Edge is not compatible. 

------

## Issue #11 

DASH in Android with Firefox

Shaka does not reproduce DASH CMAF with Widevine using Azure Media Services.

- The issue is reported [here](https://github.com/google/shaka-player/issues/2696).

------

## Issue #12

HLS with Live transcription and IMSC1 in MP4 tracks

Shaka does not reproduce HLS with live transcription.
There are known issues with parsing the right codec for IMSC1 in MP4 fragments (ISO 14496 part 30).  
There are some workarounds available, but they are still not perfect.

- The error is reported [here](https://github.com/google/shaka-player/issues/1996).
- and [here](https://github.com/google/shaka-player/issues/1959)

------
