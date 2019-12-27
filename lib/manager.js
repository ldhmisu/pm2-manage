const Koa = require('koa');
const ip = require('ip');
const app = new Koa();
const axon = require('axon');

const SOCKET_PORT = process.env.SOCKET_PORT || 12333;  // socket端口
const PORT = process.env.MANAGER_PORT || 2333;

class Manager {

    startServer (pm2ips) {
        const sock = axon.socket('pull');
        pm2ips.forEach(ip => {
            sock.connect(SOCKET_PORT, ip);
        });

        sock.on('message', function(msg) {
            console.log(msg.toString());
        });
    };
};

module.exports = new Manager();