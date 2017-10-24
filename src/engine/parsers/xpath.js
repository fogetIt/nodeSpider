/*
 * @Date:   2017-08-15 11:49:35
 * @Last Modified time: 2017-10-20 12:40:13
 */
'use strict';
/**
 * libxmljs          解析非标准xml会报错
 * cheerio           实现了大部分jquery函数
 * parse5, xmldom    解析非标准xml不会报错
 * xmlserializer     对parse5进行封装
 */
import select from "xpath.js";
import { DOMParser as Dom } from "xmldom";


let manageXmlParseError = (msg, errorLevel, errorLog) => {
    if (errorLog.errorLevel === null || errorLog.errorLevel < errorLevel) {
        errorLog.errorLevel = errorLevel;
    }

    if (errorLog[errorLevel.toString()] == null) {
        errorLog[errorLevel.toString()] = [];
    }

    errorLog[errorLevel.toString()].push(msg);
};


let parser = (rules, text) => {
    let parseLog = { errorLevel: 0 };
    let doc = new Dom({
        locator: {},
        errorHandler: {
            warning: function(msg) { manageXmlParseError(msg, 1, parseLog) },
            error: function(msg) { manageXmlParseError(msg, 2, parseLog) },
            fatalError: function(msg) { manageXmlParseError(msg, 3, parseLog) }
        }
    }).parseFromString(text);
    return select(doc, rules);
};


export  default parser;