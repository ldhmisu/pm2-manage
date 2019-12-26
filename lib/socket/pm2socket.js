const pm2 = require('pm2');
const axon = require('axon');
const pm2monit = require('../utils/pm2monit');

const SOCKET_PORT = process.env.SOCKET_PORT || 12333;  // socket端口
/**
 * pm2应用开启socket连接，推送运行时检测数据和接收socket请求
 */
const sock = axon.socket('push');
sock.bind(SOCKET_PORT);

setInterval(function() {
    pm2.list((err, data) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        sock.send(JSON.stringify(data));
    });
}, 1500);
