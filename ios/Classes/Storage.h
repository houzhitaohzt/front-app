//
//  Storage.h
//  SpdApp
//
//  Created by 唐泽华 on 16/11/18.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#ifndef Storage_h
#define Storage_h

#import <Foundation/Foundation.h>

@interface Storage : NSObject

+ (NSURL *)getJSBundleFile ;
+ (NSString *)getMainVersion ;
+ (void) setJSBundleFile:(NSString* )jsBundleFile ;
@end


#endif /* Storage_h */
