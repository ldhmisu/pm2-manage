const Koa = require('koa');
const ip = require('ip');
const app = new Koa();

function start () {
    // const host = process.env.HOST || '0.0.0.0';
    // const port = process.env.PORT || 7200;
    // app.listen(port, host);
    //
    // console.log(`Server listening on http://${ip.address()}:${port}`);

    var axon = require('axon');
    var sock = axon.socket('push');

    sock.bind(3000);
    console.log('push server started');

    setInterval(function(){
        sock.send('hello');
    }, 150);
}

start();