/*
 * @Date:   2017-08-14 11:19:04
 * @Last Modified time: 2017-10-25 12:35:01
 */
'use strict';


const baseSettings = {
    mongodb: true, // 是否存入mongodb
    mongodbHost: "localhost",
    mongodbPort: 27017,
    proxies: null,
    options: {
        server: {
            auto_reconnect: true,
            poolSize: 10
        }
    },
    asyncLimit: 2
};


baseSettings.mongodb = false;


export {
    baseSettings
}