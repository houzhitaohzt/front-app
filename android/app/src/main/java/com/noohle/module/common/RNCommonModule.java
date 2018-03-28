package com.noohle.module.common;

import android.app.Activity;
import android.app.Application;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.JSBundleLoader;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.noohle.R;
import com.noohle.utils.AppUtils;
import com.noohle.utils.Storage;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;


/**
 * @author tangzehua
 * @since 2016-11-02
 */
public class RNCommonModule extends ReactContextBaseJavaModule {

    public RNCommonModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CommonTools";
    }

    @ReactMethod
    public void exitApp() {
        AppUtils.exitApp();
    }

    @ReactMethod
    public void moveToBack (){
        AppUtils.moveTaskToBack(getCurrentActivity(), true);
    }

    @ReactMethod
    public void installApp(String apkPath){
        AppUtils.installApk(getReactApplicationContext(), Uri.fromFile(new File(apkPath)));
    }

    @ReactMethod
    public void reloadUpdate(final String jsBundle) {
        Storage.getInstance(getCurrentActivity()).setJSBundleFile(jsBundle);
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Application application = getCurrentActivity().getApplication();
                    ReactInstanceManager instanceManager = ((ReactApplication) application).getReactNativeHost().getReactInstanceManager();

                    if (instanceManager.getClass().getSimpleName().equals("XReactInstanceManagerImpl")) {
                        JSBundleLoader loader = JSBundleLoader.createFileLoader(jsBundle);
                        Field jsBundleField = instanceManager.getClass().getDeclaredField("mBundleLoader");
                        jsBundleField.setAccessible(true);
                        jsBundleField.set(instanceManager, loader);
                    } else {
                        Field jsBundleField = instanceManager.getClass().getDeclaredField("mJSBundleFile");
                        jsBundleField.setAccessible(true);
                        jsBundleField.set(instanceManager, jsBundle);
                    }

                    final Method recreateMethod = instanceManager.getClass().getMethod("recreateReactContextInBackground");

                    final ReactInstanceManager finalizedInstanceManager = instanceManager;

                    recreateMethod.invoke(finalizedInstanceManager);

                    getCurrentActivity().recreate();
                } catch (Throwable err) {
                    Log.v("ReactNativeJS", "Failed to restart application", err);
                }
            }
        });
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Activity activity = getCurrentActivity();
        Map<String, Object> constants = new HashMap<>();
        constants.put("Channel", activity.getString(R.string.channel_name));
        constants.put("AppName", activity.getString(R.string.app_name));

        return constants;
    }

}
