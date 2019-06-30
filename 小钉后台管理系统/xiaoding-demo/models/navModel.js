// 引入数据库及数据库命令
var pool = require('../libs/mysql');
var navSqlMap = require('../libs/navSqlMap');

let navModel = {
    // 渲染导航列表
    navList: function (callback) {
        pool.query(navSqlMap.navList,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 编辑导航
    // 1.旧数据回显
    oldNav: function (oldNavInfo,callback) {
        pool.query(navSqlMap.oldNav,oldNavInfo.id,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 2.新数据写入数据库
    newNav: function (newNavInfo,callback) {
        pool.query(navSqlMap.newNav,[newNavInfo.nav_name,newNavInfo.nav_address,
        newNavInfo.status,newNavInfo.id],function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 添加导航
    addNav: function (addNavInfo,callback) {
        pool.query(navSqlMap.addNav,[addNavInfo.nav_name,addNavInfo.nav_address,addNavInfo.status],function (error,result) {
            if (error) throw error;
            callback && callback(result)
        })
    },
    // 删除导航
    deleteNav: function (deleteNavInfo,callback) {
        pool.query(navSqlMap.deleteNav,deleteNavInfo.id,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    }
};


module.exports = navModel;
