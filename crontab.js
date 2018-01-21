/*
 * @Date:   2017-10-24 10:58:39
 * @Last Modified time: 2017-10-25 12:35:05
 */
'use strict';
import colors from "colors";
import server from "./server";
import schedule from "node-schedule";


let j = schedule.scheduleJob('1 20 19 * * *', () => {
    console.log('start run test!'.rainbow);
    server("test");
});
/* 关闭任务 */
// j.cancel();