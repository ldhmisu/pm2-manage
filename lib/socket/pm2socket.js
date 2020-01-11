const pm2 = require('pm2');
const axon = require('axon');
const pm2monit = require('../utils/pm2monit');

class Pm2Socket {

    constructor (config) {
        this.config = config;
    }

    /**
     * 开启pull和push
     */
    start () {
        this.push();
    }

    /**
     * pm2应用开启socket连接，推送运行时检测数据和接收socket请求
     */
    push () {
        const sock = axon.socket('push');
        sock.bind(this.config.socket_port);

        setInterval(() => {
            pm2.list((err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(2);
                }
                sock.send(JSON.stringify(data));
            });
        }, this.config.push_interval);
    }

}

module.exports = Pm2Socket;
