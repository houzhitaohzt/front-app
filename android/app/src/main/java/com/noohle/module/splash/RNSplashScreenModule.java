package com.noohle.module.splash;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * RNSplashScreen
 * 启动屏
 * from：http://www.devio.org
 * Author:CrazyCodeBoy
 * GitHub:https://github.com/crazycodeboy
 * Email:crazycodeboy@gmail.com
 */
public class RNSplashScreenModule extends ReactContextBaseJavaModule{
    public RNSplashScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SplashScreen";
    }

    /**
     * 打开启动屏
     */
    @ReactMethod
    public void show() {
        RNSplashScreen.show(getCurrentActivity(), true);
    }

    /**
     * 关闭启动屏
     */
    @ReactMethod
    public void hide() {
        RNSplashScreen.hide(getCurrentActivity());
    }
}