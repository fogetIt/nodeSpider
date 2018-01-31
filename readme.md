##### install dependencies
```bash
npm run setup
```

##### debug
```bash
: "方法一：
编译 es6 -> es5
修改 server.js 引用路径
运行 server.js
"
babel src --out-dir lib && DEBUG=* node server.js -s test
: "方法二："
DEBUG=* babel-node server.js -s test
```

##### crontab
```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```