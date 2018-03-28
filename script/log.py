#coding=utf-8

import os

if __name__ == "__main__":
    command = "adb logcat *:S ReactNative:V ReactNativeJS:V)"
    os.system(command)