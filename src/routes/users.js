const router = require('koa-router')()
const jwt = require('jsonwebtoken')
// node.js自帶工具庫
const util = require('util')
// util.promisify : 把異步函數變成promise形式
const verify = util.promisify(jwt.verify)

const { SECRET } = require('../conf/constants.js')

// 前墜
router.prefix('/users')

// 因有前綴.實際為/users
router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

// 模擬jwt登入
router.post('/login', async (ctx, next) => {
    // 注意!ctx.body已被用來當回傳.取得請求body需用ctx.request.body
    const { userName, password } = ctx.request.body
    let userInfo
    if (userName === 'zhangsan' && password === 'abc') {
        // 登入成功
        userInfo = {
            userId: 1,
            userName: 'zhangsan',
            nickName: '張三',
            gender: 1,
        }
    } else {
        ctx.body = {
            errno: -1,
            msg: '登入失敗'
        }
        return
    }
    // 加密userInfo
    let token
    if (userInfo) {
        // expiresIn : 有效期
        token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
    }
    ctx.body = {
        errno: 0,
        data: token
    }
})


// 獲取用戶訊息
router.get('/getUserInfo', async (ctx, next)=> {
    const token = ctx.header.authorization
    try{
        // 用空格分成兩塊取第二個就是token
        const payload = await verify(token.split(' ')[1],SECRET)
        ctx.body = {
            error: 0,
            userInfo: payload
        }
    }catch(ex){
        ctx.body = {
            error: -1,
            userInfo: 'verify token failed'
        }
    }    
})

// router.post('/login', async (ctx, next) => {
//     // 注意!ctx.body已被用來當回傳.取得請求body需用ctx.request.body
//     const { userName, password } = ctx.request.body
//     ctx.body = { userName, password }
// })

module.exports = router
