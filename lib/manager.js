const Koa = require('koa');
const ip = require('ip');
const app = new Koa();
const axon = require('axon');

const SOCKET_PORT = process.env.SOCKET_PORT || 12333;  // socket端口
const PORT = process.env.MANAGER_PORT || 2333;

class Manager {

    startServer (pm2ips) {
        const sock = axon.socket('push');
        sock.bind(PORT);

        setInterval(function() {
            sock.send('hello');
        }, 150);
    };
};

module.exports = new Manager();