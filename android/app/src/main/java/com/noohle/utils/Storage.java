package com.noohle.utils;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;


public class Storage {

    private SharedPreferences shared = null;
    private Context context;
    private static Storage instance;

    private Storage(Context context){
        this.context = context;
        shared = context.getSharedPreferences("storage", Context.MODE_PRIVATE);
    }

    public static Storage getInstance(Context context){
        if(instance == null) {
            synchronized (Storage.class){
                if(instance == null){
                    instance = new Storage(context);
                }
            }
        }
        return instance;
    }

    public static SharedPreferences getStorage(Context context){
        return getInstance(context).shared;
    }

    public String getJSBundleFile(){
        String file = null;
        if(AppUtils.getPackageVersionCode(context) == shared.getInt("JSBundleFile_MainVersionCode", -1)){
            file = shared.getString("JSBundleFile", null);
        }
        Log.v("ReactNativeJS", "JSBundleFile: " + file);
        return file;
    }

    public void setJSBundleFile(String jsBundleFile){
        SharedPreferences.Editor edit = shared.edit();
        edit.putString("JSBundleFile", jsBundleFile);
        edit.putInt("JSBundleFile_MainVersionCode", AppUtils.getPackageVersionCode(context));
        edit.apply();
    }
}
