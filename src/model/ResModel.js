/**
 * @description res 的数据模型 . 檔名大寫代表輸出class
 * @author 双越老师
 */

/**
 * 基础模块 : 定義class
 */
class BaseModel {
    // constructor : 所有可能傳入的值
    constructor({errno, data, message}) {
        // 所有可能的輸出
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
    // constructor : 傳入的值
    constructor(data = {}) {
        // super : 定義的值
        super({
            errno: 0,
            data
        })
    }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
    constructor({ errno, message }) {
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
