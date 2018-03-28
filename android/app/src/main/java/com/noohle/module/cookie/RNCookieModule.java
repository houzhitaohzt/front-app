package com.noohle.module.cookie;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.network.ForwardingCookieHandler;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @author tangzehua
 * @since 2016-11-02
 */
public class RNCookieModule extends ReactContextBaseJavaModule {
    private ForwardingCookieHandler cookieHandler;

    public RNCookieModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.cookieHandler = new ForwardingCookieHandler(reactContext);
    }

    @Override
    public String getName() {
        return "CookieManager";
    }

    @ReactMethod
    public void set(ReadableMap cookie, final Promise promise) throws Exception {
        throw new Exception("Cannot call on android, try setFromResponse");
    }

    @ReactMethod
    public void getAll(Promise promise) throws Exception {
        throw new Exception("Cannot get all cookies on android, try getCookieHeader(url)");
    }

    @ReactMethod
    public void get(String url, Promise promise) throws URISyntaxException, IOException {
        URI uri = new URI(url);

        Map<String, List<String>> cookieMap = this.cookieHandler.get(uri, new HashMap<String, List<String>>());
        // If only the variables were public
        List<String> cookieList = cookieMap.get("Cookie");
        WritableMap map = Arguments.createMap();
        if (cookieList != null) {
            String[] cookies = cookieList.get(0).split(";");
            for (int i = 0; i < cookies.length; i++) {
                String[] cookie = cookies[i].split("=", 2);
                if(cookie.length > 1) {
                    map.putString(cookie[0].trim(), cookie[1]);
                }
            }
        }
        promise.resolve(map);
    }

    @ReactMethod
    public void getCookie(String url, Promise promise) throws URISyntaxException, IOException {
        URI uri = new URI(url);

        Map<String, List<String>> cookieMap = this.cookieHandler.get(uri, new HashMap<String, List<String>>());
        // If only the variables were public
        List<String> cookieList = cookieMap.get("Cookie");
        String cookie = null;
        if (cookieList != null) {
            cookie = cookieList.get(0);
        }
        promise.resolve(cookie);
    }

    @ReactMethod
    public void clearAll(final Promise promise) {
        this.cookieHandler.clearCookies(new Callback() {
            public void invoke(Object... args) {
                promise.resolve(null);
            }
        });
    }

}
