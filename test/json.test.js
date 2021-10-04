const { TestWatcher } = require('@jest/core')
const server = require('./servre')

test('json接口返回正確', async () => {
    const res = await server.get('/json')
    // toEqual:用於物件
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
    expect(res.body.title).toBe('koa2 json')
})