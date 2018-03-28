package com.noohle;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.noohle.module.cookie.RNCookiePackage;
import com.reactlibrary.RNReactNativeDocViewerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.noohle.module.common.RNCommonPackage;
import com.noohle.module.deviceinfo.RNDeviceInfoPackage;
import com.noohle.module.splash.RNSplashScreenPackage;
import com.horcrux.svg.SvgPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnfs.RNFSPackage;
import com.rnziparchive.RNZipArchivePackage;
import com.zmxv.RNSound.RNSoundPackage;

import java.util.Arrays;
import java.util.List;

import io.realm.react.RealmReactPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNReactNativeDocViewerPackage(),
                    new PickerPackage(),
                    new WebViewBridgePackage(),
                    new SvgPackage(),
                    new RNSoundPackage(),
                    new RealmReactPackage(),
                    new RNFSPackage(),
                    new RCTCameraPackage(),
                    new RNZipArchivePackage(),
                    new RNSplashScreenPackage(),
                    new VectorIconsPackage(),
                    new RNCommonPackage(),
                    new RNCookiePackage(),
                    new RNDeviceInfoPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
