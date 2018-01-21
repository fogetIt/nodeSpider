/*
 * @Date:   2017-08-13 18:16:59
 * @Last Modified time: 2017-10-25 12:33:58
 */
'use strict';
import fs from "fs";
import Page from "./page";
import request from "request";
import Promise from "bluebird";
import Iconv from "iconv-lite";
import { createReq } from "./req";
import optionsUtils from "../utils/optionsUtils";
import { spiderError } from "../utils/debugUtils";
import { generateFilePath } from "../utils/fileUtils";


let createOptions = optionsUtils.createOptions,
    requestPromise = Promise.promisify(request);


class Spider {
    constructor(currentRelay, currentPipeline, scriptModule, proxies) {
        this.relay = currentRelay;
        this.pipeline = currentPipeline;
        this.procedure = scriptModule.procedure;
        this.proxies = proxies;
        this.threadQueue = this.relay.threadQueue;
    };

    run() {
        if (!this.threadQueue.isEmpty()) {
            let req = createReq(this.threadQueue.pop()),
                options = createOptions(req);
            if (req.method === "get") {
                // 给回调函数传递对象（引用）
                this.get.apply(this, [req, options]);
            } else if (req.method === "download") {
                this.download.apply(this, [req, options]);
            } else if (req.method === "post") {
                this.post.apply(this, [req, options]);
            } else {
                spiderError("method Spider.run() error");
                throw new Error("Temporary only support get/post request!");
            }
        }
    };

    get(req, options) {
        let self = this;
        // request(req.url, function(error, resp, body) {...});
        requestPromise(options).then(resp => {
            let codeSupport = Iconv.encodingExists(req.code);
            if (!codeSupport) {
                spiderError("method Spider.get()");
                throw new Error("Encoding is not supported!");
            } else if (resp.statusCode !== 200) {
                spiderError("Request error!");
            } else {
                let text = Iconv.decode(resp.body, req.code);
                if (text) {
                    resp.text = text;
                    let page = new Page(req, resp, self.relay);
                    self.procedure(page);
                    for (let result of page.results) {
                        self.pipeline.save(result);
                    }
                }
            }
            self.run();
        }).catch(error => {
            spiderError(error);
            try {
                spiderError(req.getJsonStr());
            } catch (e) {
                spiderError(e);
            }
            try {
                if (req.retryNum < 3) {
                    req.retryNum += 1;
                    self.relay.pushItem(req, true)
                }
            } catch (e) {
                spiderError(e);
            }
            self.run();
        });
    };

    download(req, options) {
        let self = this;
        let keyId = req.extData.keyId,
            fileDir = req.extData.fileDir,
            fileName = req.extData.fileName,
            fileFieldName = req.extData.fileFieldName;
        if (!keyId || !fileDir || !fileName || !fileFieldName) {
            spiderError("method Spider.download() error");
            throw new Error("Download error!");
        } else {
            let filePath = generateFilePath(fileDir, fileName);
            let stream = fs.createWriteStream(filePath);
            try {
                request(options).pipe(stream)
                    .on('error', function(e) { spiderError(e); })
                    .on('close', function() {
                        let result = { keyId: keyId };
                        result[fileFieldName] = fileDir + "/" + fileName;
                        self.pipeline.save(result);
                    });
            } catch (e) {
                spiderError(req.url);
                spiderError(e);
                try {
                    spiderError(req.getJsonStr());
                } catch (e) {
                    spiderError(e);
                }
                try {
                    if (req.retryNum < 3) {
                        req.retryNum += 1;
                        self.relay.pushItem(req, true)
                    }
                } catch (e) {
                    spiderError(e);
                }
            }
        }
        self.run();
    };

    post(req, options) {
        let self = this;
        // ...
    };
}


export default Spider;