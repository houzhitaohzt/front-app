/*******************************************************************************
 * Copyright (c) 2010-2015 tulip.city
 * Copyright (c) 2010-2015 Tulip Network Science and Technology Inc.
 * <p/>
 * http://www.tulip.city
 * Tulip cocos2d-js game, running on Native and WEB
 ******************************************************************************/

package com.noohle.utils;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Environment;
import android.telephony.TelephonyManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author tangzehua
 */
public class AppUtils {

    public static final String ASSETS_PREFIX = "assets://";
    public final static String ALBUM_PATH = Environment.getExternalStorageDirectory() + "/Pictures/";

    /**
     * 判断软件包是否已安装
     *
     * @param context
     * @param packageName
     * @return null
     */
    public static boolean isPackageInstalled(final Activity context, String packageName) {
        if (packageName == null || "".equals(packageName))
            return false;
        ApplicationInfo info = null;
        try {
            info = context.getPackageManager().getApplicationInfo(packageName,
                    PackageManager.GET_UNINSTALLED_PACKAGES);
        } catch (Exception e) {
            info = null;
        }
        return (null != info);
    }

    public static int getPackageVersionCode(final Context context) {
        return getPackageVersionCode(context, context.getPackageName());
    }

    /**
     * 获取软件包版本代号
     * @param context
     * @param packageName
     * @return
     */
    public static int getPackageVersionCode(final Context context, String packageName) {
        int versionCode = 0;
        if (packageName == null || "".equals(packageName))
            return versionCode;
        PackageInfo info = null;
        try {
            info = context.getPackageManager().getPackageInfo(packageName, 0);
            versionCode = info.versionCode;
        } catch (Exception e) {
            info = null;
        }
        return versionCode;
    }

    /**
     * 获取app 版本名字
     * @param ctx
     * @return
     */
    public static String getAppVersion(Context ctx) {
        try {
            return ctx.getPackageManager().getPackageInfo(ctx.getPackageName(), 0).versionName;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "1.0.0";
    }

    /**
     * 获取assets目录文件列表
     * @param context
     * @param basePath 相对文件夹，如果是根目录传null/""
     * @return
     * @throws IOException
     */
    public static List<String> getAssets(Context context, String basePath, boolean needAddPrefix) throws IOException {
        if (null == basePath)
            basePath = "";

        List<String> list = new ArrayList<String>();
        try {
            AssetManager assetManager = context.getAssets();
            String[] frameAssets = assetManager.list(basePath);
            String prefix = "";
            if (needAddPrefix)
                prefix = ASSETS_PREFIX;
            for (String file : frameAssets) {
                list.add(prefix + basePath + "/" + file);
            }
        } catch (IOException e) {
            throw e;
        }
        return list;
    }

    public static String getWifiMac(Context ctx) {
        WifiManager wifiManager = (WifiManager) ctx.getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = wifiManager.getConnectionInfo();
        return info.getMacAddress();
    }

    /**
     * 获取手机 驱动id
     * @param ctx
     * @return
     */
    public static String getDeviceID(Context ctx) {
        TelephonyManager tm = (TelephonyManager) ctx.getSystemService(Context.TELEPHONY_SERVICE);
        String deviceID = tm.getDeviceId();
        if (deviceID != null) {
            return deviceID;
        } else {
            return "";
        }
    }

    /**
     * 复制文件
     * @param sourcePath
     * @param targetPath
     * @return
     */
    public static boolean copyFile(String sourcePath, String targetPath) {
        FileInputStream in = null;
        FileOutputStream out = null;
        try {
            File dirFile = new File(ALBUM_PATH);
            if (!dirFile.exists()) {
                dirFile.mkdirs();
            }

            File targetFile = new File(targetPath);

            if (!targetFile.getParentFile().exists()) {
                targetFile.getParentFile().mkdirs();
            }

            in = new FileInputStream(sourcePath);
            out = new FileOutputStream(targetPath);
            byte[] buffer = new byte[1024];
            int length = -1;
            while ((length = in.read(buffer)) != -1) {
                out.write(buffer, 0, length);
            }
        } catch (IOException e1) {
            e1.printStackTrace();
            return false;
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
                if (out != null) {
                    out.close();
                }
            } catch (IOException e2) {
                e2.printStackTrace();
            }
        }
        return true;
    }

    /**
     * 保存图片到相册
     * @param imagePath 图片路径
     */
    public static void saveToAlbumWithFile(final Activity context, final String imagePath) {
        final String filePath = AppUtils.ALBUM_PATH + System.currentTimeMillis() + imagePath.substring(imagePath.lastIndexOf("."));
        AppUtils.copyFile(imagePath, filePath);
        context.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(context, "图片已经保存! 路径: " + filePath, Toast.LENGTH_SHORT).show();
            }
        });
    }

    /**
     * 分享图片,弹出系统分享
     * @param imagePath 图片路径
     */
    public static void shareImage(final Activity context, String imagePath) {
        final String filePath = AppUtils.ALBUM_PATH + System.currentTimeMillis() + imagePath.substring(imagePath.lastIndexOf("."));
        AppUtils.copyFile(imagePath, filePath);

        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("image/jpg");
        intent.putExtra(Intent.EXTRA_STREAM, Uri.fromFile(new File(filePath)));
        intent.putExtra(Intent.EXTRA_SUBJECT, "");
        intent.putExtra(Intent.EXTRA_TEXT, "");
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(Intent.createChooser(intent, "选择分享图片的方式"));
    }

    /**
     * 显示退出对话框, 提示用户是否退出
     * @param context
     * @param listener 退出确认按钮回调
     */
    public static void showExitConfirmDialog(final Activity context, final DialogInterface.OnClickListener listener){
        context.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                new AlertDialog.Builder(context).setTitle("是否退出游戏?")
                        .setIcon(android.R.drawable.ic_dialog_info)
                        .setPositiveButton(android.R.string.yes, listener)
                        .setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {

                            @Override
                            public void onClick(DialogInterface dialog, int which) {

                            }
                        }).show();
            }
        });
    }

    /**
     * 创建app启动页面
     * @param context
     * @return LinearLayout
     */
    public static LinearLayout createSplash(final Activity context){
        LinearLayout splashLayout = new LinearLayout(context);
        splashLayout.setLayoutParams(new LinearLayout.LayoutParams(-1, -1));

        ImageView iv = new ImageView(context);
        iv.setLayoutParams(new LinearLayout.LayoutParams(-1, -1));
        iv.setScaleType(ImageView.ScaleType.CENTER_CROP);//剧中显示

        int resId = context.getResources().getIdentifier("splash", "drawable", context.getPackageName());
        Bitmap bm = BitmapFactory.decodeResource(context.getResources(), resId);
        iv.setImageBitmap(bm);

        splashLayout.addView(iv);
        return splashLayout;
    }

    /**
     * 安装apk
     * @param context
     * @param apk
     */
    public static void installApk(final Context context, Uri apk){
        // 通过Intent安装APK文件
        Intent intents = new Intent();
        intents.setAction("android.intent.action.VIEW");
        intents.addCategory("android.intent.category.DEFAULT");
        intents.setType("application/vnd.android.package-archive");
        intents.setData(apk);
        intents.setDataAndType(apk, "application/vnd.android.package-archive");
        intents.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        if(isSelf){
//            // 如果不加上这句的话在apk安装完成之后点击单开会崩溃
//            android.os.Process.killProcess(android.os.Process.myPid());
//        }

        context.startActivity(intents);
    }

    /**
     * 获取游戏名称
     * @param context
     * @return
     */
    public static String getApplicationName(final Activity context) {
        PackageManager packageManager = null;
        ApplicationInfo applicationInfo = null;
        try {
            packageManager = context.getApplicationContext().getPackageManager();
            applicationInfo = packageManager.getApplicationInfo(context.getPackageName(), 0);
        } catch (PackageManager.NameNotFoundException e) {
            applicationInfo = null;
        }
        return (String) packageManager.getApplicationLabel(applicationInfo);
    }

    /**
     * 判断平台是否是模拟器
     * @return
     */
    public static boolean isAndroidEmulator() {
        String model = Build.MODEL;
        String product = Build.PRODUCT;
        boolean isEmulator = false;
        if (product != null) {
            isEmulator = product.equals("sdk") || product.contains("_sdk")
                    || product.contains("sdk_") || product.contains("vbox");
        }
        return isEmulator;
    }

    public static void exitApp() {
        try {
            android.os.Process.killProcess(android.os.Process.myPid());
        } catch (Exception e){
            System.exit(0);
        }
    }

    public static boolean moveTaskToBack(final Activity activity, boolean nonRoot) {
        return activity.moveTaskToBack(nonRoot);
    }
}
