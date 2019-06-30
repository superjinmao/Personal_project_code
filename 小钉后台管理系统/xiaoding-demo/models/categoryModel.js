// 引入数据库及数据库命令
var pool = require('../libs/mysql');
var categorySqlMap = require('../libs/categorySqlMap');

let categoryModel = {
    categoryList: function (callback) {
        pool.query(categorySqlMap.categoryList,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 数据回显
    oldCategory: function (oldCategoryInfo,callback) {
        pool.query(categorySqlMap.oldCategory,oldCategoryInfo.id,function (error,result) {
            if (error) throw error;
            callback && callback (result)
        })
    },
    // 新数据写回
    newCategory: function (newCategoryInfo,callback) {
        pool.query(categorySqlMap.newCategory,[newCategoryInfo.category_name,newCategoryInfo.sort,
        newCategoryInfo.description,newCategoryInfo.icon,newCategoryInfo.status,newCategoryInfo.id],function (error,result) {
            if (error) throw error;
            callback && callback (result)
        })
    },
    // 增加分类
    addCategory: function (addCategoryInfo,callback) {
        pool.query(categorySqlMap.addCategory,[addCategoryInfo.category_name,addCategoryInfo.sort,
            addCategoryInfo.description,addCategoryInfo.icon,addCategoryInfo.status],function (error,result) {
            if (error) throw error;
            callback && callback (result)
        })
    },
    // 删除分类
    deleteCategory: function (deleteCategoryInfo,callback) {
        pool.query(categorySqlMap.deleteCategory,deleteCategoryInfo.id,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    }
};


module.exports = categoryModel;
