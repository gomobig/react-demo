let httpUrl = '';
let hostUrl = '';
/* eslint no-undef: 0 */
if (!globalDomain) {
    const host = window.location.href;
    const res = host.match(/(\w+):\/\/([^/:]+)(:\d*)?/);
    if (res[3]) {
        httpUrl = `${res[1]}://${res[2]}${res[3]}`;
        hostUrl = `${res[2]}`;
    } else {
        httpUrl = `${res[1]}://${res[2]}`;
        hostUrl = `${res[2]}`;
    }
} else {
    httpUrl = globalDomain;
    const hostRes = httpUrl.match(/(\w+):\/\/([^/:]+)(:\d*)?/);
    if (hostRes[2]) {
        hostUrl = `${hostRes[2]}`;
    }
}
const config = {
    domain: httpUrl,
    hostmain: hostUrl,
    project: 'guard',
    timeout: 20000,
    serviceCallProtocol: 'http', // 前端调用service选用的协议, "" 系统会自动选择(优先选择ws,如果不支持再选择http), "http" http调用, "ws" websocket调用
    errorHandlers: {
        notLogonHandler() {},
        networkErrorHandler() {
            console.error('网络连接异常!');
        },
        noServiceHandler() {
            console.error('请求无对应服务');
        },
        noInterfaceHandler() {
            console.error('请求接口错误');
        },
        jsonConvertErrorHandler() {
            console.error('返回对象无法做json对象转换');
        },
        parameterCountErrorHandler() {
            console.error('请求参数个数错误');
        },
        parameterTypeErrorHandler() {
            console.error('请求参数类型错误');
        },
        jsonToJavaErrorHandler() {
            console.error('请求参数无法转换java对象');
        },
        businessProcessErrorHandler() {
            console.error('后台业务处理遇到未知错误');
        },
        entityWithoutIdHandler() {
            console.error('entity定义错误,没有主键Id');
        },
        dbConnectErrorHandler() {
            console.error('数据库无法获得连接');
        },
        fieldValidateErrorHandler(msg) {
            console.error(`字段校验异常：${msg}`);
        },
        callServiceOverFrequencyErrorHandler() {
            console.error('服务访问过频');
        },
        timeoutHandler() {
            console.error('服务访问超时');
        },
        unhandledErrorHandler(msg) {
            console.error('未知错误', msg);
        },
    },
};

export default config;
