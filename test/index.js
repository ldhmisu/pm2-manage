const manager = require('../lib/manager');

function main () {
    manager.startServer({pm2clients: [ '10.10.3.64' ]});
}

main();
