const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')

const { isProd } = require('./utils/env')
const index = require('./routes/index')
const users = require('./routes/users')

// 路由
const errorViewRouter = require('./routes/view/error')

// error handler:監聽錯誤.頁面顯示錯誤訊息.若路由沒傳ejs所需變數就會報錯
// 設置錯誤跳轉
let onerrorConf = {}
// 線上環境再跳錯誤頁 . dev環境直接報錯誤訊息才好debug
if (isProd) {
    onerrorConf = {
        // 設置錯誤跳轉路由位置
        redirect: '/error'
    }
}
onerror(app, onerrorConf)

// middlewares
// 解析post數據 start
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
// 解析post數據end

// 日誌功能
app.use(logger())
// 讓此路徑的資料可用url訪問
app.use(require('koa-static')(__dirname + '/public'))
// 註冊ejs
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// session 配置
// 這樣用戶每次訪問就會創建
app.keys = ['UIsdf_7878#$']  //密鑰
app.use(session({
    key: 'weibo.sid', // cookie name 默认是 `koa.sid`
    prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
        path: '/',   //在網頁所有地方都能用
        httpOnly: true,   // 不可修改cookie
        maxAge: 24 * 60 * 60 * 1000  // 過期時間 . 单位 ms
    },
    // redis過期時間 . 不用寫默認與cookie.maxAge一致
    // ttl: 24 * 60 * 60 * 1000,
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// logger 演示而已
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// 註冊routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404 路由注册到最后面

// error-handling:打印錯誤訊息
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
