const Koa = require('koa');
const axon = require('axon');
const Router = require('koa-router');

class Manager {

    /**
     *
     * pm2clients:                  pm2应用的ip和端口地址列表
     * port:                        开启koa服务器的端口，默认 process.env.MANAGER_PORT || 2333
     * socketPort:                  pm2应用的默认端口，会被pm2clients中的端口覆盖，默认 process.env.PM2_SOCKET_PORT || 12333
     * messageCacheLength:          每个ip的消息保留的长度，默认100条
     */
    constructor ({pm2clients = [], port, socketPort = process.env.PM2_SOCKET_PORT || 12333, messageCacheLength = 100}) {
        this.pm2Messages = [];  // 记录通过socket推送的服务器运行监控
        this.port = port || process.env.MANAGER_PORT || 2333;
        this.messageCacheLength = messageCacheLength;
        this.pm2clients = pm2clients.map(v => {
            let split = v.split(':');
            return {
                ip: split[ 0 ],
                port: split[ 1 ] || socketPort
            };
        });
    }

    /**
     * 获取pm2的socket推送的信息
     */
    getSocketMessage () {
        const sock = axon.socket('pull');
        this.pm2clients.forEach(v => {
            console.log(`socket pull -> ${v.ip}:${v.port}`);
            sock.connect(Number(v.port), v.ip);
        });
        sock.on('message', (msg) => {
            this.pm2Messages.push(msg);
        });
    };

    /**
     * 开启koa服务器，提供http接口
     */
    startServer () {
        this.getSocketMessage();
        const app = new Koa();
        const host = process.env.HOST || '0.0.0.0';

        const router = new Router();
        app.use(router.routes()).use(router.allowedMethods());

        app.listen(this.port, host);
        console.log(`Server listening on: http://${require('ip').address()}:${this.port}`);
    }
};

module.exports = Manager;

