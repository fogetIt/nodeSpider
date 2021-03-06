/*
 * @Date:   2017-08-14 17:12:35
 * @Last Modified time: 2017-10-25 12:34:53
 */
'use strict';
import { info } from "../engine/utils/debugUtils";


let startUrls = [{
    url: "https://tieba.baidu.com/f?kw=%E5%AF%92%E6%AD%A6%E7%BA%AA%E5%B9%B4&ie=utf-8&tab=album",
    code: "utf-8"
}, ];


let procedure = p => {
    let imgUrl;
    if (p.isDefaultLevel()) {
        let imgSrc = p.xpath("//img/@src");
        imgSrc.forEach((value, i) => {
            imgUrl = value.nodeValue;
            let fileName = imgUrl.split("/")[imgUrl.split("/").length - 1],
                keyId = fileName.split('.')[0];
            let extData = {
                keyId: keyId,
                fileDir: "test",
                fileName: fileName,
                fileFieldName: keyId
            };
            info(extData);
            p.addReq(imgUrl, undefined, "download", undefined, extData)
        });
    } else if (p.isLevel("img")) {}
};


export {
    startUrls,
    procedure
}