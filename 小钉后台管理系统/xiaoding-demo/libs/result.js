// 规定后台返回消息的格式
var result = {
    createResult: function (success, data) {
        // 返回一个具体的固定格式, json对象形式
        return {
            success: success,
            data: data
        }
    }
};

module.exports = result;
