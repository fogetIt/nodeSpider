/*
 * @Date:   2017-08-21 11:42:26
 * @Last Modified time: 2017-10-25 12:34:03
 */
'use strict';
import cheerio from "cheerio";


let loader = (node, text) => {
    let html = cheerio.load(text);
    return html(node);
};

export default loader;