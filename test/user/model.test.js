/**
 * @description user model test . 若table有異動可及時查出
 * @author 双越老师
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性，符合预期', () => {
    // build 会构建一个内存的 User 实例，但不会提交到数据库中 . 適合用來做單元測試
    const user = User.build({
        userName: 'zhangsan',
        password: 'p123123',
        nickName: '张三',
        // gender: 1,   //默認值為3 . 測試默認值是否生效
        picture: '/xxx.png',
        city: '北京'
    })
    // 验证各个属性
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('p123123')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(3) // 测试 gender 默认值
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('北京')
})
