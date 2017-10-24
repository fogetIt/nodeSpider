/*
* @Date:   2017-10-23 16:28:46
* @Last Modified time: 2017-10-23 16:36:33
*/
'use strict';
import fs from "fs";
import path from "path";


const rootDir = path.resolve(__dirname, "..", "..", "..");
const publicDir = path.join(rootDir, 'public');
const imagesDir = path.join(publicDir, "images");


let generateFilePath = (fileDir, fileName) => {
    let dirPath = path.join(imagesDir, fileDir),
        hasDir = fs.existsSync(dirPath);
    if(!hasDir) {
        fs.mkdirSync(dirPath);
    }
    return path.join(dirPath, fileName);
};


export {
    generateFilePath
}