var express = require('express');
var router = express.Router();
// 引入body-parser 接收post数据
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend: false}));

// 引入M 层处理导航信息的块
var categoryModel = require('../../models/categoryModel');

// 引入返回信息规定格式
var result = require('../../libs/result');

// 分类模块

// 分类列表
router.get('/list',function (req,res) {
    res.render('admin/category_list')
});
// 分类列表渲染
router.get('/categoryList',function (req,res) {
    categoryModel.categoryList(function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', data))
        } else {
            res.json(result.createResult('error', '获取数据失败!!'))
        }
    })
});

// 添加分类
router.get('/add',function (req,res) {
    res.render('admin/category_add')
});
router.post('/addCategory',function (req,res) {
    categoryModel.addCategory(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success','添加成功'))
        } else {
            res.json(result.createResult('error', '添加失败'))
        }
    })
});

// 编辑分类
router.get('/edit',function (req,res) {
    res.render('admin/category_edit')
});

// 编辑列表部分(1)  获取旧数据回显
router.post('/oldCategory',function (req,res) {
    categoryModel.oldCategory(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success',data))
        } else {
            res.json(result.createResult('error', '数据回显失败'))
        }
    })
});
// 编辑列表部分(2)  拿到新数据写入数据库
router.post('/newCategory',function (req,res) {
    categoryModel.newCategory(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', '修改成功'))
        } else {
            res.json(result.createResult('error', '修改失败'))
        }
    })
});
// 删除分类
router.post('/deleteCategory',function (req,res) {
    categoryModel.deleteCategory(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', '删除成功'))
        } else {
            res.json(result.createResult('error', '删除失败'))
        }
    })
});


module.exports = router;
