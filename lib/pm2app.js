const pmx = require('pmx');

/**
 * pm2 module 入口，会永远运行在pm2进程中
 * 用于与服务连接，发送本地pm2运行的状态
 */
pmx.initModule({}, function(err, conf) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    require('./socket/pm2socket');
});