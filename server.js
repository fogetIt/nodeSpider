/*
 * @Date:   2017-08-13 18:04:58
 * @Last Modified time: 2017-08-15 21:37:56
 */
'use strict';
/*
$ DEBUG=core:*,utils:*,info node server.js -s test
 */
process.env['DEBUG'] = '*';
import program from "commander";
import { baseSettings as settings } from "./src/settings";
import engine, { Relay, DebugPipeline, MongodbPipeline } from "./src/engine/main";


let createChild = scriptName => {
    let proxies = settings.proxies,
        Pipeline = settings.mongo ? MongodbPipeline: DebugPipeline,
        currentRelay = new Relay(),
        currentPipeline = new Pipeline(scriptName);
    engine(
        scriptName,
        currentRelay,
        currentPipeline,
        proxies
    );
};


/*
接收命令行参数，运行
 */
program
    .version('0.0.1')
    .option('-s, --scriptName [value]', 'script file name')
    .parse(process.argv);

if (program.scriptName) {
    createChild(program.scriptName)
}else {
    console.log("Run server without parameter!");
}


/*
被导入执行
 */
export default createChild;