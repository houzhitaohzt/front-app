//
//  RNDeviceInfo.m
//  Learnium
//
//  Created by Rebecca Hughes on 03/08/2015.
//  Copyright © 2015 Learnium Limited. All rights reserved.
//

#import "CommonTools.h"
#import <React/RCTBridge.h>
#import "Storage.h"

@interface CommonTools()

@end

@implementation CommonTools

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()



RCT_EXPORT_METHOD(exitApp) {
  abort();
}

RCT_EXPORT_METHOD(reloadUpdate:(NSString *)jsBundle){
  // reload
  dispatch_async(dispatch_get_main_queue(), ^{
    [Storage setJSBundleFile:jsBundle];
    [self.bridge setValue:[NSURL URLWithString:jsBundle] forKey:@"bundleURL"];
    [self.bridge reload];
  });
}

- (NSDictionary *)constantsToExport
{
  NSString *bundlePath = [[NSBundle mainBundle] pathForResource:@"Info" ofType:@"plist"];
  NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithContentsOfFile:bundlePath];
  NSMutableDictionary *config = [dict objectForKey:@"_RN_CONFIG_"];
  return config;
}

@end
