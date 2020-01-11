const Manager = require('../lib/manager');

function main () {
    let manager = new Manager({pm2clients: [ '127.0.0.1' ]});
    manager.startServer();
}

main();
