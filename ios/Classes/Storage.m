//
//  Storage.m
//  SpdApp
//
//  Created by 唐泽华 on 16/11/18.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "Storage.h"
#import <React/RCTBundleURLProvider.h>


@implementation Storage

+ (NSURL *)getJSBundleFile {
  
  NSURL *jsCodeLocation;
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSString *firstName = [defaults objectForKey:@"JSBundleFile"];
  
  NSString * version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"];
  NSString * bundlePath = [self getMainVersion];
  
  if ([bundlePath isEqualToString:version] && [[NSFileManager defaultManager] fileExistsAtPath:bundlePath isDirectory:NULL]) {
    jsCodeLocation = [NSURL URLWithString:firstName];
    
  } else {
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  }
  return jsCodeLocation;
}

+ (NSString *)getMainVersion {
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  return [defaults objectForKey:@"JSBundleFile_MainVersion"];
}

+ (void) setJSBundleFile:(NSString* )jsBundleFile {
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  [defaults setValue:jsBundleFile forKey:@"JSBundleFile"];
  [defaults setValue:[[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"] forKey:@"JSBundleFile_MainVersion"];
  [defaults synchronize];
}

@end
