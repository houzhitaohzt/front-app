#coding=utf-8

import os
import zipfile
import json
import platform

try:
    import zlib

    compression = zipfile.ZIP_DEFLATED
except:
    compression = zipfile.ZIP_STORED

# 当前文件路径
main_path = os.path.dirname(os.path.realpath(__file__))
root_path = main_path + os.sep + ".." + os.sep
bundle_version = "100100"


def zip_hot(bundle_path, target_name):
    start = len(bundle_path)
    filename = str(bundle_path) + os.sep + ".." + os.sep + target_name
    os.path.exists(filename) and os.remove(filename)
    print filename

    zp = zipfile.ZipFile(filename, mode="w", compression=compression)
    try:
        for dir_path, dirs, files in os.walk(bundle_path):
            for file in files:
                zp_path = os.path.join(dir_path, file)
                zp.write(zp_path, zp_path[start:])
        zp.close()
    except:
        if zp:
            zp.close()


# 删除目录下面的所有文件跟目录不包括自己
def remove_dirs(path):
    for root, dirs, files in os.walk(path):
        for f in files:
            os.remove(os.path.join(root, f))
        for d in dirs:
            remove_dirs(os.path.join(root, d))
            os.rmdir(os.path.join(root, d))

def bundle(plat):
    isWin = str(platform.system()) == "Windows"
    target_name = "%s.%s.zip" % (bundle_version, plat)
    bundle_path = "%sbuild%s%s.%s" % (root_path, os.sep, bundle_version, plat)
    not os.path.exists(bundle_path) and os.mkdir(bundle_path)
    print bundle_path

    command = "cd ../ && react-native bundle --assets-dest " + bundle_path + " --bundle-output " \
              + bundle_path + os.sep + "index." + plat + ".bundle --dev false --entry-file index." + plat + ".js --platform " + plat
    os.system(command)
    if not isWin:
        zip_hot(bundle_path, target_name)
        remove_dirs(bundle_path)
        os.rmdir(bundle_path)


if __name__ == "__main__":
    with open(root_path + "/src/assets/project.json") as f:
        project_config = json.load(f)
    bundle_version = str(project_config['bundleVersion'])

    bundle("android")
    bundle("ios")
