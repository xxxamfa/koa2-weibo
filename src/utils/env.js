/**
 * @description 环境变量
 * @author lin
 */

// !透過這段可獲取package.json 的 cross-env NODE_ENV是執行甚麼環境
const ENV = process.env.NODE_ENV

module.exports = {
    isDev: ENV === 'dev',
    notDev: ENV !== 'dev',
    isProd: ENV === 'production',
    notProd: ENV !== 'production',
    isTest: ENV === 'test',
    notTest: ENV !== 'test'
}
