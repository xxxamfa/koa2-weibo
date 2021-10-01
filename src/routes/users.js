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

module.exports = router
