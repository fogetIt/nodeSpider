/*
 * @Date:   2017-08-13 22:24:33
 * @Last Modified time: 2017-08-15 21:38:10
 */
'use strict';
import mongodb from "mongodb";
import settings from "../../settings";
import { pipelineError, info } from "../utils/debugUtils";


class DebugPipeline {
    save(result) {
        let keyId = result.keyId;
        if (keyId) {
            info(JSON.stringify(result));
        } else {
            pipelineError("keyId is needed when p.put({'keyId':'xxx', ...})")
        }
    }
}


class MongodbPipeline {
    constructor(scriptName) {
        this.scriptName = scriptName;
        this.MongoClient = mongodb.MongoClient;
    };

    updateOne(keyId, result) {
        let self = this,
            mongodbUrl = 'mongodb://' + settings.mongodbHost +  ':' + settings.mongodbPort + '/spider';
        this.MongoClient.connect(mongodbUrl, (err, db) => {
                let collection = db.collection(self.scriptName);
                // 插入数据
                collection.updateOne(
                    { "keyId": keyId },
                    { "$set": result },
                    { "upsert": true },
                    (err, res) => {
                        if(err) {
                            pipelineError("error to save!");
                        } else {
                            info(JSON.stringify(result));
                        }
                    });
                db.close();
            }
        )
    };

    save(result) {
        let keyId = result.keyId;
        if (keyId) {
            result["__timer__"] = parseInt(new Date().getTime() / 1000);
            this.updateOne.call(this, keyId, result)
        }
    };
}


export {
    DebugPipeline,
    MongodbPipeline
};

