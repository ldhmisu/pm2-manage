#! /usr/bin/env node

'use strict';

const program = require('commander');

/**
 * 开启与pm2应用的socket连接
 */
program.command('start').alias('s').option('-a --apps [apps]', 'pm2应用的ip地址，以逗号隔开').description('开启web服务器和socket连接').action((cmd) => {
    let apps = cmd.apps ? cmd.apps.split(',') : [];
    require('./server').start(apps);
});

/**
 * 小程序转码命令
 *
 * 支持小程序： 微信转百度
 *
 */

program.command('mp').option('-d --dir [dir]', '目录路径').description('微信转百度小程序').action((cmd) => {
    require('../lib/mini-program')(cmd);
});

program.parse(process.argv);
