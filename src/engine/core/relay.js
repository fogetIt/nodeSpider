/*
 * @Date:   2017-08-13 18:16:17
 * @Last Modified time: 2017-08-15 21:38:14
 */

'use strict';
import fnv from "fnv-plus";
import correctUrl from "../utils/urlUtils";
import { relayError } from "../utils/debugUtils";


class Queue {
    constructor(size = null) {
        this.list = [];
        this.size = size;
    };

    push(data) {
        if (data === null) {
            return false;
        }
        if (this.size !== null && !isNaN(this.size)) {
            if (this.isFull()) {
                this.pop();
            }
        }
        // 向数组的开头添加一个或更多元素
        this.list.unshift(data);
        return true;
    };

    pop() {
        return this.list.pop();
    };

    listSize() {
        return this.list.length;
    };

    isEmpty() {
        return this.listSize() === 0;
    };

    isFull() {
        return this.listSize() === this.size;
    };

    queue() {
        return this.list;
    }
}


class Relay {
    constructor() {
        this.onlyObj = new Set();
        this.threadQueue = new Queue();
    };

    pushItem(req, isRetry) {
        let url = correctUrl(req.url),
            hashUrl = fnv.hash(url, 64).dec(), // .str(), .hex()
            isOnly = this.onlyObj.has(hashUrl);
        if (!isOnly) {
            this.onlyObj.add(hashUrl);
        }
        if (!isOnly || isRetry) {
            this.threadQueue.push(req);
        } else {
            relayError("duplicate url:" + req.url);
        }
    };
}


export default Relay;