#import "CookieManager.h"
#import <React/RCTConvert.h>

@implementation CookieManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(set:(NSDictionary *)props callback:(RCTResponseSenderBlock)callback) {
    NSString *name = [RCTConvert NSString:props[@"name"]];
    NSString *value = [RCTConvert NSString:props[@"value"]];
    NSString *domain = [RCTConvert NSString:props[@"domain"]];
    NSString *origin = [RCTConvert NSString:props[@"origin"]];
    NSString *path = [RCTConvert NSString:props[@"path"]];
//    NSDate *expiration = [RCTConvert NSDate:props[@"expiration"]];

    NSMutableDictionary *cookieProperties = [NSMutableDictionary dictionary];
    [cookieProperties setObject:name forKey:NSHTTPCookieName];
    [cookieProperties setObject:value forKey:NSHTTPCookieValue];
    [cookieProperties setObject:domain forKey:NSHTTPCookieDomain];
    [cookieProperties setObject:origin forKey:NSHTTPCookieOriginURL];
    [cookieProperties setObject:path forKey:NSHTTPCookiePath];
//    [cookieProperties setObject:expiration forKey:NSHTTPCookieExpires];

    NSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:cookieProperties];
    [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];

    callback(@[@1]);
}


RCT_EXPORT_METHOD(clearAll:(RCTResponseSenderBlock)callback) {
    NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    for (NSHTTPCookie *c in cookieStorage.cookies) {
        [cookieStorage deleteCookie:c];
    }
  callback(@[@1]);
}

// TODO: return a better formatted list of cookies per domain
RCT_EXPORT_METHOD(getAll:(RCTResponseSenderBlock)callback) {
    NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    NSMutableDictionary *cookies = [NSMutableDictionary dictionary];
    for (NSHTTPCookie *c in cookieStorage.cookies) {
        NSMutableDictionary *d = [NSMutableDictionary dictionary];
        [d setObject:c.value forKey:@"value"];
        [d setObject:c.name forKey:@"name"];
        [d setObject:c.domain forKey:@"domain"];
        [d setObject:c.path forKey:@"path"];
        [cookies setObject:d forKey:c.name];
    }
    callback(@[cookies, @"success"]);
}

RCT_EXPORT_METHOD(get:(NSURL *) url
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject) {
    NSMutableDictionary *cookies = [NSMutableDictionary dictionary];
    for (NSHTTPCookie *c in [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookiesForURL:url]) {
        [cookies setObject:c.value forKey:c.name];
    }
    resolve(cookies);
}

RCT_EXPORT_METHOD(getCookie:(NSURL *) url
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *cookie = @"";
  for (NSHTTPCookie *c in [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookiesForURL:url]) {
    cookie = [cookie stringByAppendingFormat:@"%@,%@", c.name, c.value];
  }
  resolve(cookie);
}
@end
