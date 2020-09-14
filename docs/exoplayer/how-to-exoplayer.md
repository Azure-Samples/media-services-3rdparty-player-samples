# Media Services 3rd Party Player Samples - ExoPlayer

## Overview

ExoPlayer is an application level media player for Android. It provides an alternative to Android’s MediaPlayer API for playing audio and video both locally and over the Internet. ExoPlayer supports features not currently supported by Android’s MediaPlayer API, including DASH and SmoothStreaming adaptive playbacks.

Its official documentation can be found [here](https://exoplayer.dev/ "ExoPlayer documentation").

## Sample code

Sample code for this article is available at [Azure-Samples/media-services-3rdparty-player-samples](https://github.com/Azure-Samples/media-services-3rdparty-player-samples).

## Implement the player

Follow these instructions if you need to implement your own instance of the player.

1. Add `ExoPlayer` as a dependency to your project.

    The first step to getting started is to make sure you have the Google and JCenter repositories included in the `build.gradle` file in the root of your project.

    ```gradle
    repositories {
        google()
        jcenter()
    }
    ```

    Next add the dependency in the `build.gradle` file of your app module;  the following will add a dependency to the full ExoPlayer library (Use your preferred version):

    ```json
    implementation 'com.google.android.exoplayer:exoplayer:2.11.7'
    ```

    If not enabled already, you need to turn on Java 8 support in all `build.gradle` files, depending on ExoPlayer, by adding the following to the android section:

    ```gradle
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    ```

    Add internet access permission to your app:

    ```xml
    <uses-permission android:name="android.permission.INTERNET" />
    ```

2. Creating the player in your Java file:
  
    Before creating the player you need a `TrackSelector`. Track selection determines which of the available media tracks are played by the player.
    Track selection is the responsibility of a `TrackSelector`, an instance of which can be provided whenever an ExoPlayer is built.

    ```java
    // Creation of the Track Selection
    TrackSelection.Factory trackSelectionFactory;
    trackSelectionFactory = new AdaptiveTrackSelection.Factory();
    trackSelector = new DefaultTrackSelector(context, trackSelectionFactory);
    // Creation of the player
    SimpleExoPlayer player = new SimpleExoPlayer.Builder(context).setTrackSelector(trackSelector).build();
    ```

3. In the XML view add a `PlayerView`:

    ```xml
    <com.google.android.exoplayer2.ui.PlayerView
    android:id="@+id/player_view"/>
    ```

4. Attach the player to a view:

    ```java
    playerView.setPlayer(player);
    ```

5. Preparing the player:

    In ExoPlayer every piece of media is represented by a `MediaSource`. To play a piece of media you must first create a corresponding `MediaSource` and then pass this object to `ExoPlayer.prepare`. The ExoPlayer library provides `MediaSource` implementations for DASH (`DashMediaSource`), SmoothStreaming (`SsMediaSource`), HLS (`HlsMediaSource`) and regular media files (`ProgressiveMediaSource`). The following code shows how to prepare the player with a `MediaSource` suitable for HLS or DASH.

    ```java
    // Produces DataSource instances through which media data is loaded.
    DataSource.Factory dataSourceFactory = new DefaultDataSourceFactory(context, "userAgent");
    // Instantiate media source factory for initial media source depending the streaming protocol specified.
    MediaSourceFactory factory = new HlsMediaSource.Factory(dataSourceFactory);
    //or
    MediaSourceFactory factory = new DashMediaSource.Factory(dataSourceFactory);
    // Create media source.
    MediaSource mediaSource = mediaSrcFactory.createMediaSource(ManifestURI);
    // Prepare Player.
    boolean resetPosition = false;
    boolean resetState = false;
    player.prepare(mediaSource, resetPosition, resetState);
    ```

6. Replace `ManifestURI`  with the HLS or DASH URL from the streaming locator of your asset which can be found on the streaming locator page in the Azure portal.

    ![streaming locator URLs](https://docs.microsoft.com/en-us/azure/media-services/latest/media/how-to-shaka-player/streaming-urls.png)

7. Controlling the player:

    Once the player has been prepared, playback can be controlled by calling methods on the player. For example `setPlayWhenReady` starts and pauses playback, the various `seekTo` methods seek within the media, `setRepeatMode` controls if and how media is looped, `setShuffleModeEnabled` controls playlist shuffling, and `setPlaybackParameters` adjusts playback speed and pitch.

    ```java
    player.setPlayWhenReady(true);
    ```

## Set up captions

### Set up VOD captions

Follow these instructions if you need to implement your own captions.

1. Create a text format, and from the `dataSourceFactory` already created, create a new media source and merge it with the existing one before preparing the player:

    ```java
    Format textFormat = Format.createTextSampleFormat(
        null,
        MimeTypes.TEXT_VTT,
        Format.NO_VALUE,
        "en");
    MediaSource subtitleSource = new SingleSampleMediaSource.Factory(dataSourceFactory).createMediaSource(subtitleUri, textFormat, C.TIME_UNSET);
    MediaSource MergedMediaSources = new MergingMediaSource(targetMediaSource, subtitleSource);
    ```

2. Use that new media source to prepare the player:

    ```java
    player.prepare(MergedMediaSources, false, false);
    ```

3. Initialize the `TextOutput`:

    ```java
    player.addTextOutput((List<Cue> cues) -> {
        if (subtitleView != null) {
            subtitleView.onCues(cues);
        }
    });
    ```

### Set up live stream captions

For DASH live stream with embedded captions, there is no need for changes, but if using HLS, you have to add a parameter to the TrackSelector to select undetermined text language:

```java
DefaultTrackSelector.Parameters currentParameters = trackSelector.getParameters();
DefaultTrackSelector.Parameters newParameters = currentParameters
.buildUpon()
.setSelectUndeterminedTextLanguage(true)
.build();
trackSelector.setParameters(newParameters);
```

## Set up token authentication

### AES-128

To implement token authentication in AES-128 encrypted content you need to modify the media source factory creation and add to the Authorization property value the JWT token:

```java
factory = new HlsMediaSource.Factory(() => {
  HttpDataSource dataSource = new DefaultHttpDataSource("userAgent");
  dataSource.setRequestProperty("Authorization", "Bearer=JWTToken");
  return dataSource;
});
//or
MediaSourceFactory factory = new DashMediaSource.Factory(() => {
  HttpDataSource dataSource = new DefaultHttpDataSource("userAgent");
  dataSource.setRequestProperty("Authorization", "Bearer=JWTToken");
  return dataSource;
});
```

### DRM

For token encryption you have to append an Authorization header to the request that is sent to the DRM license request endpoint. For this you can add any header to the DRM license request with:

```java
mediaDrmCallback.setKeyRequestProperty("Authorization", "Bearer="+JWTToken);
```

## Set up AES-128 encryption

ExoPlayer automatically reads the configuration of AES-128 from the manifest and resolves the request without further input from the user.

## Set up DRM protection

Instantiate a `HttpMediaDrmCallback` with the license URL and build with it a new `DefaultDrmSessionManager` and set it to the created media source factory before you create the media source.

```java
DrmSessionManager drmSessionManager = null;
HttpMediaDrmCallback mediaDrmCallback = new HttpMediaDrmCallback(WIDEVINE_LICENSE_URL, new DefaultHttpDataSourceFactory("Player-Test"));
drmSessionManager = new DefaultDrmSessionManager.Builder().build(mediaDrmCallback);
mediaSrcFactory.setDrmSessionManager(drmSessionManager);
```
