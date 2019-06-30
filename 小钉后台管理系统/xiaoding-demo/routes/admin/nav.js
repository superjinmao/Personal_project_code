var express = require('express');
var router = express.Router();
// 引入body-parser 接收post数据
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend: false}));

// 引入M 层处理导航信息的块
var navModel = require('../../models/navModel');

// 引入返回信息规定格式
var result = require('../../libs/result');


// 导航列表
router.get('/list',function (req,res) {
    res.render('admin/nav_list')
});

// 渲染导航列表
router.get('/navList',function (req,res) {
    navModel.navList(function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success',data))
        } else {
            console.log(error)
        }
    })
});

// 添加导航页及其逻辑
router.get('/add',function (req,res) {
    res.render('admin/nav_add')
});
router.post('/addNav',function (req,res) {
    navModel.addNav(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success','添加成功'))
        } else {
            res.json(result.createResult('error', '添加失败'))
        }
    })
});

// 编辑导航页面逻辑
router.get('/edit',function (req,res) {
    res.render('admin/nav_edit')
});

// 编辑导航部分(1)  获取旧数据回显
router.post('/oldNav',function (req,res) {
    navModel.oldNav(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success',data))
        } else {
            res.json(result.createResult('error', '数据回显失败'))
        }
    })
});
// 编辑用户部分(2)  拿到新数据写入数据库
router.post('/newNav',function (req,res) {
    navModel.newNav(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', '修改成功'))
        } else {
            res.json(result.createResult('error', '修改失败'))
        }
    })
});
// 删除导航
router.post('/deleteNav',function (req,res) {
    navModel.deleteNav(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', '删除成功'))
        } else {
            res.json(result.createResult('error', '删除失败'))
        }
    })
});

module.exports = router;
