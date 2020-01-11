const Manager = require('../lib/manager');

function main () {
    let manager = new Manager({pm2clients: [ '10.10.3.64' ]});
    manager.startServer();
}

main();
