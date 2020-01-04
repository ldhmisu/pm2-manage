const Koa = require('koa');
const axon = require('axon');

class Manager {

    constructor () {
        this.pm2Messages = [];  // 记录通过socket推送的服务器运行监控
    }

    /**
     * 获取pm2的socket推送的信息
     * @param pm2ips    pm2应用的ip数组
     * @param socketPort    pm2应用的socket端口号
     * @param callback  消息回调
     */
    getSocketMessage (pm2ips, socketPort, callback) {
        const sock = axon.socket('pull');
        pm2ips.forEach(ip => {
            sock.connect(socketPort, ip);
        });
        sock.on('message', function(msg) {
            callback(msg);
        });
    };

    /**
     * 开启koa服务器，提供http接口
     *
     * pm2ips:  pm2应用的ip地址列表
     * port:    开启koa服务器的端口，默认 process.env.MANAGER_PORT || 2333
     * socketPort:  pm2应用的socket端口，默认 process.env.PM2_SOCKET_PORT || 12333
     */
    startServer ({
                     pm2ips = [],
                     port = process.env.MANAGER_PORT || 2333,
                     socketPort = process.env.PM2_SOCKET_PORT || 12333
                 }) {
        this.getSocketMessage(pm2ips, socketPort, msg => {
            console.log(msg);
        });
        const app = new Koa();
        const host = process.env.HOST || '0.0.0.0';
        app.listen(port, host);
        console.log(`服务器已开启： http://${require('ip').address()}:${port}`);
    }
};

module.exports = new Manager();

