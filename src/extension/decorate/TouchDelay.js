/* @flow */

//默认延迟调用时间
const delayTime = 500;
/**
 * Touch时间延迟, 防止重复调用
 * @param target
 * @param name
 * @param descriptor
 * @returns {*}
 * @constructor
 */
export default function TouchDelay (target, name, descriptor){
    target.__touchdelay__ = 0;
    target.__touchDelayName__ = null;

    let fn, call = function (...args){
        let now = Date.now();
        if(now - target.__touchdelay__ > delayTime)
        {
            target.__touchdelay__ = now;
            target.__touchDelayName__ = name;
            fn(...args)
        }
        else if(target.__touchDelayName__ !== name)
        {
            fn(...args)
        }
    };

    if(descriptor.initializer){
        fn = descriptor.initializer;
        descriptor.initializer = function (e, d){
            fn = fn.call(this);
            return call;
        };
        return descriptor;
    } else {
        fn = descriptor.value;
        return {
            configurable: true,
            get: function get() {
                fn = fn.bind(this);
                return call;
            }
        };
    }
}
