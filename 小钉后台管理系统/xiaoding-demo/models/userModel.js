// 专门用来处理和用户相关的 数据库操作
// 这里要做数据库的相关操作，首先就要连接数据库，而这个操作可以通过引入libs中的文件
var pool = require('../libs/mysql');
// 引入sql语句
var userSqlMap = require('../libs/userSqlMap');

let userModule = {
    // 验证邮箱是否存在
    findOne: function (email,callback) {
        // 操作数据库    email字符串在sql命令中是要有引号包裹的， select * from user where email="850317079@qq.com"
        // 也可以使用占位符的映射关系，自动补全该字段需要的引号
        pool.query(userSqlMap.getByEmail,email,function (error,result) {
            // 如果有错，就抛出一个错误
            if (error) throw error;
            // 此处回调函数机制与ajax封装相似，细细品味
            // 如果存在这个回调函数，那么就去调用它，并传参
            callback && callback(result[0])  // 这个函数是findOne，只查找一个，所以 [0]
        })
    },
    // 用户注册-------> 时刻提醒现在是在 M 层
    register: function (registerInfo,callback) {
        // 多个字段的情况下，同样可以使用这种映射关系，注意使用数组的形式 []
        pool.query(userSqlMap.getRegister,[registerInfo.email, registerInfo.password,registerInfo.create_time],function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 用户登录
    login: function (loginInfo,callback) {
        pool.query(userSqlMap.getLogin,[loginInfo.username, loginInfo.password],function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 渲染用户列表
    userList: function (callback) {
        pool.query(userSqlMap.userList,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 添加用户
    addUser: function (addUserInfo,callback) {
        pool.query(userSqlMap.addUser,[addUserInfo.username,addUserInfo.email,addUserInfo.password,
        addUserInfo.role,addUserInfo.status,addUserInfo.create_time],function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },

    // 编辑用户部分(1)  获取旧数据回显
    oldUser: function (oldUserInfo,callback) {
        pool.query(userSqlMap.oldUser,oldUserInfo.id,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 编辑用户部分(2)  拿到新数据写入数据库
    newUser: function (newUserInfo,callback) {
        pool.query(userSqlMap.newUser,[newUserInfo.username,newUserInfo.email,
        newUserInfo.role,newUserInfo.status,newUserInfo.id],function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 删除用户
    deleteUser: function (deleteUserInfo,callback) {
        pool.query(userSqlMap.deleteUser,deleteUserInfo.id,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 修改密码
    passwordUser: function (passwordUserInfo,callback) {
        pool.query(userSqlMap.passwordUser,[passwordUserInfo.password,passwordUserInfo.username],function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    }
};

module.exports = userModule;
