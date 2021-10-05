const router = require('koa-router')()

// 前墜
router.prefix('/users')

// 因有前綴.實際為/users
router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => {
    // 注意!ctx.body已被用來當回傳.取得請求body需用ctx.request.body
    const { userName, password } = ctx.request.body
    ctx.body = { userName, password }
})

module.exports = router
