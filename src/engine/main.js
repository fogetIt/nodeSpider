/*
 * @Date:   2017-08-13 18:02:51
 * @Last Modified time: 2017-10-25 12:34:47
 */
'use strict';
import async from "async";
import { Req } from "./core/req";
import Relay from "./core/relay";
import Spider from "./core/spider";
import { baseSettings } from "../settings";


let asyncLimit = baseSettings.asyncLimit;


let job = (currentRelay, currentPipeline, scriptModule, proxies) => {
    let sp = new Spider(currentRelay, currentPipeline, scriptModule, proxies);
    sp.run();
};


export default (scriptName, currentRelay, currentPipeline, proxies) => {
    let scriptModule = require("../scripts/" + scriptName),
        startUrls = scriptModule.startUrls;

    for (let seq of startUrls) {
        let url = seq.url,
            code = seq.code || "utf-8",
            req = new Req(url, code);
        currentRelay.pushItem(req);
    }

    let asyncFuncs = [];
    for (let i = 0; i < asyncLimit; i++) {
        asyncFuncs.push(async.apply(job, currentRelay, currentPipeline, scriptModule, proxies))
    }
    async.parallel(asyncFuncs);
};


export { Relay };
export { DebugPipeline, MongodbPipeline } from "./core/pipeline";