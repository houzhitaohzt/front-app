package com.noohle;

import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.noohle.module.splash.RNSplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        RNSplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    //设置字体大小不随手机设置而改变
    @Override
    public Resources getResources() {
        Resources res = super.getResources();
        Configuration config = new Configuration();
        config.setToDefaults();
        res.updateConfiguration(config, res.getDisplayMetrics());
        return res;
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactApp";
    }
}
