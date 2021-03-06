/**
 * @description 連線配置
 * @author lin
 */

const { isProd } = require('../utils/env')

// REDIS dev環境
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

// mysql dev環境
let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'longyao7639',
    port: '3306',
    database: 'koa2_weibo_db'
}

// 線上環境配置
// !環境由package.json設置 cross-env NODE_ENV=XXX來決定
if (isProd) {
    // redis
    REDIS_CONF = {
        // 线上的 redis 配置
        port: 6379,
        host: '127.0.0.1'
    }

    // mysql
    MYSQL_CONF = {
        // 线上的 mysql 配置
        host: 'localhost',
        user: 'root',
        password: 'longyao7639',
        port: '3306',
        database: 'koa2_weibo_db'
    }

}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}
