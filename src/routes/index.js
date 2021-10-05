const router = require('koa-router')()
//結合js
router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        isMe: false,
        blogList: [
            {
                id: 1,
                title: 'aaa'
            },
            {
                id: 2,
                title: 'bbb'
            },
            {
                id: 3,
                title: 'ccc'
            },
        ]
    })
})
// 顯示json
router.get('/json', async (ctx, next) => {
    // 這裡的session登入者的session非session集合
    const session = ctx.session
    if (session.viewNum == null) {
        session.viewNum = 0
    }
    session.viewNum++
    // 模擬報錯
    throw Error()
    ctx.body = {
        title: 'koa2 json',
        viewNum: session.viewNum
    }
})
// 解析一個參數
router.get('/profile/:userName', async (ctx, next) => {
    const { userName } = ctx.params
    ctx.body = {
        title: 'this is profile page', userName
    }
})
// 解析兩個參數
router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
    const { userName, pageIndex } = ctx.params
    ctx.body = {
        title: 'this is loadMore', userName, pageIndex
    }
})

module.exports = router
