package com.azuresamples.exoplayer;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.text.Html;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.view.View;
import android.util.Log;
import android.widget.Spinner;
import android.widget.TextView;

import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayerLibraryInfo;
import com.google.android.exoplayer2.Format;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.Timeline;
import com.google.android.exoplayer2.drm.DefaultDrmSessionManager;
import com.google.android.exoplayer2.drm.DrmSessionManager;
import com.google.android.exoplayer2.drm.HttpMediaDrmCallback;
import com.google.android.exoplayer2.source.MergingMediaSource;
import com.google.android.exoplayer2.source.SingleSampleMediaSource;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.text.Cue;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.MediaSourceFactory;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.source.dash.DashMediaSource;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.upstream.DefaultHttpDataSource;
import com.google.android.exoplayer2.upstream.DefaultHttpDataSourceFactory;
import com.google.android.exoplayer2.upstream.HttpDataSource;
import com.google.android.exoplayer2.util.EventLogger;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.ui.SubtitleView;
import com.google.android.exoplayer2.C;

import com.google.android.exoplayer2.trackselection.AdaptiveTrackSelection;
import com.google.android.exoplayer2.trackselection.TrackSelection;
import com.google.android.exoplayer2.util.MimeTypes;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import static android.text.Html.FROM_HTML_MODE_LEGACY;

public class MainActivity extends AppCompatActivity {

    Uri SUBTITLES_URL;
    String WIDEVINE_URL;
    PlayerView playerView;
    SubtitleView subtitleView;
    EditText manifestURL;
    CheckBox checkBoxCaption;
    CheckBox checkBoxToken;
    CheckBox checkBoxAutoPlay;
    CheckBox checkBoxWidevine;
    EditText inputToken;
    EditText inputCaption;
    EditText inputWidevine;
    Button btPlay;
    SimpleExoPlayer player;
    Spinner protocolSelector;
    Spinner logLevelSelector;
    DefaultTrackSelector trackSelector;
    ArrayAdapter<String> adapterProtocols;
    ArrayAdapter<String> adapterLogLevel;
    TextView eventView;
    TextView playerVersion;
    TextView contentFormat;
    TextView contentProtection;
    TextView contentToken;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        playerView = findViewById(R.id.player_view);
        playerView.setKeepContentOnPlayerReset(true);

        subtitleView = playerView.getSubtitleView();
        manifestURL= findViewById(R.id.urlInput);
        checkBoxCaption = findViewById(R.id.checkBox_caption);
        checkBoxToken = findViewById(R.id.checkBox_token);
        checkBoxWidevine = findViewById(R.id.checkBox_widevine);
        checkBoxAutoPlay = findViewById(R.id.checkBox_auto_play);
        inputCaption = findViewById(R.id.input_caption);
        inputToken = findViewById(R.id.input_token);
        inputWidevine = findViewById(R.id.input_widevine);
        btPlay = findViewById(R.id.play_button);
        protocolSelector = findViewById(R.id.protocol);
        logLevelSelector = findViewById(R.id.logLevel);
        eventView = findViewById(R.id.eventView);
        playerVersion = findViewById(R.id.player_version);
        contentFormat = findViewById(R.id.content_format);
        contentProtection = findViewById(R.id.content_protection);
        contentToken = findViewById(R.id.content_token);

        String HLS = getString(R.string.HLS);
        String DASH = getString(R.string.DASH);
        String[] protocols = new String[]{HLS, DASH};
        adapterProtocols = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, protocols);
        protocolSelector.setAdapter(adapterProtocols);

        String INFO = getString(R.string.INFO);
        String ERROR = getString(R.string.ERROR);
        String[] logLevels = new String[]{INFO, ERROR};
        adapterLogLevel = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, logLevels);
        logLevelSelector.setAdapter(adapterLogLevel);

        disableInput(inputCaption);
        disableInput(inputToken);
        disableInput(inputWidevine);

        checkBoxCaption.setOnClickListener(checkBoxListener);
        checkBoxToken.setOnClickListener(checkBoxListener);
        checkBoxWidevine.setOnClickListener(checkBoxListener);
        this.updateDataBox();

        handleIntent(getIntent());
    }

    @Override
    public void onStop(){
        super.onStop();
        if (player != null) {
            player.stop(true);
        }
    }

    protected void disableInput (EditText input) {
        input.setFocusable(false);
        input.setEnabled(false);
        input.setCursorVisible(false);
        input.setFocusableInTouchMode(false);
        input.setText("");
        input.setBackgroundColor(Color.parseColor("#EBEBE4"));
    }

    protected void enableInput (EditText input) {
        input.setFocusable(true);
        input.setEnabled(true);
        input.setCursorVisible(true);
        input.setFocusableInTouchMode(true);
        input.requestFocus();
        input.setBackgroundResource(R.drawable.edit_text_bg);
    }

    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleIntent(intent);
    }

    private void handleIntent(Intent intent) {
        String appLinkAction = intent.getAction();
        Uri appLinkData = intent.getData();
        if (Intent.ACTION_VIEW.equals(appLinkAction) && appLinkData != null){
            manifestURL.setText(appLinkData.getQueryParameter("manifest"));

            String token = appLinkData.getQueryParameter("token");
            if (token != null) {
                inputToken.setText(token);
                checkBoxToken.setChecked(true);
                enableInput(inputToken);
            }

            String caption = appLinkData.getQueryParameter("caption");
            if (caption != null) {
                inputCaption.setText(caption);
                checkBoxCaption.setChecked(true);
                enableInput(inputCaption);
            }

            String widevine = appLinkData.getQueryParameter("widevine");
            if (widevine != null) {
                inputWidevine.setText(widevine);
                checkBoxWidevine.setChecked(true);
                enableInput(inputWidevine);
            }

            String format = appLinkData.getQueryParameter("format");
            if (format != null) {
                int spinnerPosition = adapterProtocols.getPosition(format.toUpperCase(Locale.ROOT));
                protocolSelector.setSelection(spinnerPosition);
            }

            String logLevel = appLinkData.getQueryParameter("logLevel");
            if (logLevel != null) {
                String StringLogLevel = (logLevel.equals("1")) ? "ERROR" : "INFO";
                int spinnerPosition = adapterLogLevel.getPosition(StringLogLevel);
                logLevelSelector.setSelection(spinnerPosition);
            }

            try {
                this.startContent();
            } catch (Exception ex) {
                Log.e("UI-EVENTS", "Button click error", ex);
            }
        }
    }

    private View.OnClickListener checkBoxListener = new View.OnClickListener() {
        public void onClick(View v) {
            if (checkBoxCaption.isChecked()) {
                enableInput(inputCaption);
            }
            else
            {
                disableInput(inputCaption);
            }

            if (checkBoxToken.isChecked()) {
                enableInput(inputToken);
            }
            else {
                disableInput(inputToken);
            }

            if (checkBoxWidevine.isChecked()) {
                enableInput(inputWidevine);
            }
            else
            {
                disableInput(inputWidevine);
            }
        }
    };

    private MediaSource addSubtitleMediaSourceLayer (MediaSource targetMediaSource, DataSource.Factory dataSourceFactory) {
        if (checkBoxCaption.isChecked()) {
            SUBTITLES_URL = Uri.parse(inputCaption.getText().toString());
            Uri subtitleUri = Uri.parse(String.valueOf(SUBTITLES_URL));
            Format textFormat = Format.createTextSampleFormat(
                    null,
                    MimeTypes.TEXT_VTT,
                    Format.NO_VALUE,
                    "en");

            MediaSource subtitleSource =
                    new SingleSampleMediaSource.Factory(dataSourceFactory)
                            .createMediaSource(subtitleUri, textFormat, C.TIME_UNSET);

            return new MergingMediaSource(targetMediaSource, subtitleSource);
        }
        return targetMediaSource;
    }

    public void  startContentFromURL (View view) {
        try {
            this.startContent();
        }
        catch (Exception ex) { Log.e("UI-EVENTS", "Button click error", ex); }
    }

    private void startContent() throws Exception {
        this.updateDataBox();

        if(player != null) {
            player.stop(true);
        }

        Uri videoUrl = Uri.parse(manifestURL.getText().toString());
        String protocolType = protocolSelector.getSelectedItem().toString();

        TrackSelection.Factory trackSelectionFactory;
        trackSelectionFactory = new AdaptiveTrackSelection.Factory();

        trackSelector = new DefaultTrackSelector(/* context= */ this, trackSelectionFactory);
        if (!checkBoxCaption.isChecked()) {
            DefaultTrackSelector.Parameters currentParameters = trackSelector.getParameters();
            DefaultTrackSelector.Parameters newParameters = currentParameters
                    .buildUpon()
                    .setSelectUndeterminedTextLanguage(true)
                    .build();
            trackSelector.setParameters(newParameters);
        }
        player = new SimpleExoPlayer.Builder(this).setTrackSelector(trackSelector).build();
        player.addListener(eventListener);
        if (checkBoxAutoPlay.isChecked()) {
            player.setPlayWhenReady(true);
        }
        player.addAnalyticsListener(new EventLogger(trackSelector));

        playerView.setPlayer(player);
        playerView.setKeepScreenOn(true);
        player.prepare(buildMediaSource(videoUrl, protocolType), false, false);

        player.addTextOutput((List<Cue> cues) -> {
            if (subtitleView != null) {
                subtitleView.onCues(cues);
            }
        });
    }

    private MediaSource buildMediaSource(Uri uri, String protocolType) throws Exception {
        DataSource.Factory dataSourceFactory = new DefaultDataSourceFactory(this, "Player-Test");
        MediaSourceFactory mediaSrcFactory = instantiateMediaSourceFactoryByStreamingProtocol(protocolType);
        if (checkBoxWidevine.isChecked()) {
            applyDrmConfigurationToMediaSourceFactory(mediaSrcFactory);
        }
        MediaSource targetMediaSource = mediaSrcFactory.createMediaSource(uri);
        targetMediaSource = addSubtitleMediaSourceLayer(targetMediaSource, dataSourceFactory);
        return targetMediaSource;
    }

    private void applyDrmConfigurationToMediaSourceFactory(MediaSourceFactory mediaSrcFactory) {
        DrmSessionManager drmSessionManager = null;
        WIDEVINE_URL = inputWidevine.getText().toString();
        HttpMediaDrmCallback mediaDrmCallback = createMediaDrmCallback(WIDEVINE_URL);
        if (checkBoxToken.isChecked()) {
            mediaDrmCallback.setKeyRequestProperty("Authorization", "Bearer="+inputToken.getText().toString());
        }
        drmSessionManager = new DefaultDrmSessionManager.Builder().build(mediaDrmCallback);
        mediaSrcFactory.setDrmSessionManager(drmSessionManager);
    }

    private HttpMediaDrmCallback createMediaDrmCallback(String licenseUrl) {
        return new HttpMediaDrmCallback(licenseUrl, new DefaultHttpDataSourceFactory("Player-Test"));
    }

    private MediaSourceFactory instantiateMediaSourceFactoryByStreamingProtocol(String protocolType) throws Exception {
        MediaSourceFactory factory;
        switch (protocolType) {
            case "HLS":
                factory = new HlsMediaSource.Factory(this::newDefaultHttpDataSource);
                break;
            case "DASH":
                factory = new DashMediaSource.Factory(this::newDefaultHttpDataSource);
                break;
            default:
                throw new Exception(String.format("Invalid streaming protocol: '%s'", protocolType));
        }

        return factory;
    }

    final Player.EventListener eventListener = new Player.EventListener() {
        public void log(String type, String message){
            if (type.equals(logLevelSelector.getSelectedItem().toString()) || type.equals("ERROR")) {
                DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss.SSS", java.util.Locale.getDefault());
                String time = dateFormat.format(Calendar.getInstance().getTime());
                String text = time + "[" + type + "]" + message + '\n' + eventView.getText();
                eventView.setText(text);
            }
        }

        @Override
        public void onPlayerError(ExoPlaybackException error) {
            log("ERROR", error.getMessage());
        }

        @Override
        public void onTimelineChanged(Timeline timeline, int reason) {
            log("INFO", "Timeline: " + timeline + " Reason: " + reason);
        }

        @Override
        public void onIsPlayingChanged(boolean isPlaying) {
            log("INFO", "IsPlaying :" + isPlaying);
        }

        @Override
        public void onLoadingChanged(boolean isLoading) {
            log("INFO", "Loading: " + isLoading);
        }

        @Override
        public void onPlaybackParametersChanged(PlaybackParameters playbackParameters) {
            log("INFO", "PlaybackParameters: " + playbackParameters);
        }

        @Override
        public void onPlaybackSuppressionReasonChanged(int playbackSuppressionReason) {
            log("INFO", "PlaybackSuppressionReason: " + playbackSuppressionReason);
        }

        @Override
        public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
            log("INFO", "PlayerState: " + playbackState + " PlayWhenReady: " + playWhenReady);
        }

        @Override
        public void onPositionDiscontinuity(int reason) {
            log("INFO", "PositionDiscontinuity: " + reason);
        }

        @Override
        public void onRepeatModeChanged(int repeatMode) {
            log("INFO", "RepeatMode: " + repeatMode);
        }

        @Override
        public void onSeekProcessed() {
            log("INFO", "SeekProcessed");
        }

        @Override
        public void onShuffleModeEnabledChanged(boolean shuffleModeEnabled) {
            log("INFO", "ShuffleModeEnabled: " + shuffleModeEnabled);
        }

        @Override
        public void onTracksChanged(TrackGroupArray trackGroups, TrackSelectionArray trackSelections) {
            log("INFO", "TrackGroups: " + trackGroups + " TrackSelections: " + trackSelections);
        }
    };

    private HttpDataSource newDefaultHttpDataSource () {
        HttpDataSource dataSource = new DefaultHttpDataSource("Player-Test");
        if (checkBoxToken.isChecked()) {
            dataSource.setRequestProperty("Authorization", "Bearer="+inputToken.getText().toString());
        }
        return dataSource;
    }

    private void updateDataBox () {
        String URL = manifestURL.getText().toString();
        String manifestFormat = "";
        String formatVersion = "";
        String protectionString  = "";
        String tokenStatus = "";
        if (!URL.isEmpty()) {
            manifestFormat = URL.contains("m3u8") ? "HLS" : "DASH";
            formatVersion = URL.contains("cmaf") ? "CMAF" : "TS";

            protectionString  = "NONE";
            if (URL.contains("encryption=cbcs")) {
                protectionString = getString(R.string.DRMWithEncryption, "CBCS");
            } else if (URL.contains("encryption=cenc")) {
                protectionString = getString(R.string.DRMWithEncryption, "CENC");
            } else if (URL.contains("encryption=cbc")) {
                protectionString = "AES-128";
            }

            tokenStatus = checkBoxToken.isChecked() ? "ON" : "OFF";
        }
        String version = getString(R.string.Player, ExoPlayerLibraryInfo.VERSION);
        String format = getString(R.string.Format, manifestFormat, formatVersion);
        String protection = getString(R.string.Protection, protectionString);
        String token = getString(R.string.Token, tokenStatus);

        playerVersion.setText(Html.fromHtml(version, FROM_HTML_MODE_LEGACY));
        contentFormat.setText(Html.fromHtml(format, FROM_HTML_MODE_LEGACY));
        contentProtection.setText(Html.fromHtml(protection, FROM_HTML_MODE_LEGACY));
        contentToken.setText(Html.fromHtml(token, FROM_HTML_MODE_LEGACY));

    }

}