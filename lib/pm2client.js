const pm2 = require('pm2');
const pmx = require('pmx');
const path = require('path');
const axon = require('axon');
const sock = axon.socket('pull');

const socketPort = process.env.SOCKET_PORT || 7200;  // socket端口

/**
 * pm2 module 入口，会永远运行在pm2进程中
 * 用于与服务连接，发送本地pm2运行的状态
 */
pmx.initModule({}, function(err, conf) {
    pm2.connect(function(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        sock.connect(socketPort);
        sock.on('message', function(msg) {
            console.log(msg.toString());
        });

        // pm2.list((err, data) => {
        //     if (err) {
        //         console.error(err);
        //         process.exit(2);
        //     }
        //     console.log(data.length);
        // });
    });
});