/* @flow */

import Api from '../api';

function isObject (obj) {
    return typeof obj === "object" && Object.prototype.toString.call(obj) === '[object Object]';
}

export default function ApiCell(request, uri: string, method: string, argsName: ?string) {
    return (target, name, descriptor) => {
        let fn = descriptor.value;

        if (typeof fn !== 'function') {
            throw new Error('@ApiCell Decorator not supper ()=> function');
        }
        let call = function (args: (string|Object) = {}) {
            args = isObject(args)? args: (argsName? {[argsName]: args}: args);
            request.call(Api, uri, method, args)
                .then(value => {
                    fn(null, value);
                }).catch(error => {
                fn(error, null);
            });
        };
        return {
            configurable: true,
            get: function get() {
                fn = fn.bind(this);
                return call;
            }
        };
    }
}

export function ApiForm(uri: string, method: string, argsName: ?string){
    return ApiCell(Api.form, uri, method, argsName);
}

export function ApiGet(uri: string, method: string, argsName: ?string){
    return ApiCell(Api.get, uri, method, argsName);
}

export function ApiPost(uri: string, method: string, argsName: ?string){
    return ApiCell(Api.post, uri, method, argsName);
}