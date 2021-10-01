const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler:監聽錯誤.頁面顯示錯誤訊息.若路由沒傳ejs所需變數就會報錯
onerror(app)

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

// error-handling:打印錯誤訊息
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
