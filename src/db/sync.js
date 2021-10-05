/**
 * @description sequelize同步格式化
 */
const seq = require('./seq')

// require('./model')

// 測試連結 . 回傳為promise
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch((err) => {
    console.log('auth err', err)
})

// 執行同步
// force:true.執行時會把已經存在的table刪掉再同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    // 退出sequelize進程不要一直佔著
    process.exit()
})
