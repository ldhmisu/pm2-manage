const pm2 = require('pm2');
const pmx = require('pmx');
const path = require('path');

/**
 * pm2 module 入口，会永远运行在pm2进程中
 * 用于与服务连接，发送本地pm2运行的状态
 */
pmx.initModule({}, function(err, conf) {
    setInterval(() => {
        console.log(new Date().getTime());
    }, 1500);
});