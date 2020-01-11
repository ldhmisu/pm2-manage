const pmx = require('pmx');
const Pm2Socket = require('./socket/pm2socket');

/**
 * pm2 module 入口，会永远运行在pm2进程中
 * 用于与服务连接，发送本地pm2运行的状态
 */
pmx.initModule({}, function(err, config) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    new Pm2Socket(config).start();
});