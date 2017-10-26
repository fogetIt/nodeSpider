/*
 * @Date:   2017-08-28 10:53:50
 * @Last Modified time: 2017-10-26 11:42:00
 */
'use strict';


let headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0"
};


export default {
    createOptions: req => {
        let _url = req.url,
            _options = {
                url: _url,
                headers: headers,
                resolveWithFullResponse: true,
                timeout: 60000,
                encoding: null
            };
        if (req.extData.options && !JSON.stringify(req.extData.options) === "{}") {
            /*
            deep copy
             */
            for (let key in req.extData.options) {
                _options[key] = req.extData.options[key];
            }
        }
        return _options;
    }
};