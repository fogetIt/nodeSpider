/*
 * @Date:   2017-08-13 18:16:38
 * @Last Modified time: 2017-08-15 21:38:07
 */
'use strict';
import { Req } from "./req";
import xpath from "../parsers/xpath";
import loader from "../parsers/loader";
import correctUrl from "../utils/urlUtils";
import { pageError } from "../utils/debugUtils";


class Page {
    /*
    构造函数
     */
    constructor(request, response, currentRelay) {
        this.results = [];
        this.request = request;
        this.response = response;
        this.relay = currentRelay;
        this.text = this.response.text;
        this.url = this.request ? this.request.url: "";
    }

    isDefaultLevel() {
        return this.request.isStart()
    };

    isLevel(level) {
        return this.request.isLevel(level)
    };

    getExt(key) {
        return this.request.getExt(key)
    };

    put(arg) {
        if (typeof arg === "object") {
            this.results.push(arg);
        } else {
            pageError("arg must is json, example: page.put({....})");
        }
    };

    /**
     * @param url        url地址
     * @param code       页面编码
     * @param method     请求方式
     * @param level      level
     * @param extData    传递的数据
     *     extData.options(post)
     *     extData.filename(download)
     * @param force
     *     False    默认， 如果url已经爬取过， 就不向队列添加
     *     True     强制向队列添加url
     */
    addReq(url="", code="utf-8", method = "get", level = "", extData = {}, force = false) {
        let validUrl = correctUrl(url, this.request.url);
        if (validUrl) {
            let req = new Req(validUrl, code, method, level, extData);
            this.relay.pushItem(req, force);
        } else {
            pageError("invalid url:" + url);
        }
    };

    xpath(rules, text) {
        let _text = text || this.text;
        return xpath(rules, _text);
    };

    load(node, text) {
        let _text = text || this.text;
        return loader(node, _text);
    }
}

export default Page;