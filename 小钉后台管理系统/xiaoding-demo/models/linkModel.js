// 专门用来处理和link模块相关的 数据库操作
var pool = require('../libs/mysql');
var linkSqlMap = require('../libs/linkSqlMap');

let linkModel = {
    linkList: function (callback) {
        pool.query(linkSqlMap.linkList,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 数据回显
    oldLink: function (oldLinkInfo,callback) {
        pool.query(linkSqlMap.oldLink,oldLinkInfo.id,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 数据写回
    newLink: function (newLinkInfo,callback) {
        pool.query(linkSqlMap.newLink,[newLinkInfo.linkName,newLinkInfo.linkAddress,newLinkInfo.linkSort,
        newLinkInfo.linkDescription,newLinkInfo.id],function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 增加链接
    addLink: function (addLinkInfo,callback) {
        pool.query(linkSqlMap.addLink,[addLinkInfo.linkName,addLinkInfo.linkAddress,addLinkInfo.linkSort,
            addLinkInfo.linkDescription],function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 删除链接
    deleteLink: function (deleteLinkInfo,callback) {
        pool.query(linkSqlMap.deleteLink,deleteLinkInfo.id,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    }
};

module.exports = linkModel;
