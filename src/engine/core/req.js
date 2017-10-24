/*
 * @Date:   2017-08-13 18:15:57
 * @Last Modified time: 2017-10-20 11:34:33
 */
'use strict';


class Req {
    constructor(url = "", code = "utf-8", method = "get", level = "", extData = {}) {
        this.url = url;
        this.code = code;
        this.method = method;
        this.level = level;
        this.extData = extData;
        this.retryNum = 0;
    };

    isStart() {
        return this.isLevel("");
    };

    isLevel(level) {
        return this.level === level;
    };

    setLevel(level) {
        this.level = String(level);
    };

    putExt(key, value) {
        this.extData[String(key)] = value;
    };

    getExt(key) {
        return this.extData[String(key)];
    };

    getJsonStr() {
        return JSON.stringify({
            url: this.url,
            code: this.code,
            method: this.method,
            level: this.level,
            extData: this.extData
        })
    };
}


let createReq = (requestItem) => {
    return new Req(
        requestItem.url,
        requestItem.code,
        requestItem.method,
        requestItem.level,
        requestItem.extData
    );
};


export {
    Req,
    createReq
};