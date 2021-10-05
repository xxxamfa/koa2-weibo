/**
 * @description sequelite
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')
const { host, user, password, database } = MYSQL_CONF

const conf = {
    host,
    // 資料庫廠牌
    dialect: 'mysql'
}

// 在test環境不要顯示sql語句 . 會干擾debug
if (isTest) {
    conf.logging = () => {}
}


// 線上環境專用 . 使用連接池
if (isProd) {
    conf.pool = {
        max: 5, //連接池最大連線數量
        min: 0, //最小連線數
        idle: 10000 //如果連線10s內沒被使用會被釋放

    }
}
// (db名,帳號,密碼,config)
const seq = new Sequelize(database, user, password, conf)


// 測試連結 . 回傳為promise
// seq.authenticate().then(()=>{
//     console.log('ok');
// }).catch(()=>{
//     console.log('err');
// })

// 測試連結時要mark掉
module.exports = seq