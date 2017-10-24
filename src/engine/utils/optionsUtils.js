/*
* @Date:   2017-08-28 10:53:50
* @Last Modified time: 2017-08-28 10:53:54
*/
'use strict';


export default {
    createOptions: req => {
        let _url = req.url;
        if(!req.extData.options || JSON.stringify(req.extData.options) === "{}") {
            return {
                url: _url,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0"
                },
                resolveWithFullResponse: true,
                timeout: 60000,
                encoding: null
            };
        } else {
            let _options = {};
            /*
            deep copy
             */
            for(let key in req.extData.options) {
                _options[key] = req.extData.options[key];
            }
            _options.url = _url;
            return _options;
        }
    }
};
