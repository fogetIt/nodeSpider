/*
 * @Date:   2017-08-16 23:45:32
 * @Last Modified time: 2017-10-25 12:31:20
 */
'use strict';
import urlMod from "url";
import { correctUrlError } from "./debugUtils";


let correctUrl = (urlStr, referUrl = null) => {
    let _host = null,
        _port = null,
        _protocol = null;
    if (referUrl) {
        try {
            let _result = urlMod.parse(referUrl, false);
            _protocol = ["http", "https"].indexOf(_result.protocol.toLocaleLowerCase()) ? _result.protocol : null;
            _host = _result.host;
            _port = _result.port;
        } catch (e) {
            correctUrlError(e);
        }
    }
    try {
        let result = urlMod.parse(urlStr, false);
        let protocol = result.protocol,
            pathname = result.pathname,
            host = result.host;

        if ((!_host || !pathname) && !host) {
            return null;
        }
        /**
         * 没有 protocol ，无法正确解析出 host
         */
        if (!protocol) {
            result = urlMod.parse(_protocol + urlStr, false);
            host = result.host;
        }
        if (!host) {
            result.host = _host;
            result.port = _port;
        }
        return urlMod.format(result);
    } catch (e) {
        correctUrlError(e);
    }
};


export default correctUrl;