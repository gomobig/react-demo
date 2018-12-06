/**
 * Created by moda/candroid@126.com on 2017/12/26
 */
import framework from './framework';

export function wkrequest(path, params) {
    const options = params;
    // if (params) {
    //     for (const key in params) {
    //         if ({}.hasOwnProperty.call(params, key)) {
    //             options.push(params[key]);
    //         }
    //     }
    // }
    const urlPath = path.split('/', 2);
    return new Promise((resolve, reject) => {
        framework.service.request(...urlPath, ...options, (errCode, errMsg, data) => {
            const response = {
                err: errCode,
                msg: errMsg,
                res: data,
                url: urlPath[1],
            };
            if (errCode !== 0) {
                reject(response);
            } else {
                resolve(data);
            }
        });
    }).catch(r => {
        window.console.error(`${r.url}请求错误: ${r.err}`);
        return r;
    });
}
