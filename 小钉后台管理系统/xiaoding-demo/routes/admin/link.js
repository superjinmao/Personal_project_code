var express = require('express');
var router = express.Router();

// 引入body-parser 接收post数据
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend: false}));

// 引入M 层处理导航信息的块
var linkModel = require('../../models/linkModel');

// 引入返回信息规定格式
var result = require('../../libs/result');

// 列表渲染
router.get('/list',function (req,res) {
    res.render('admin/link_list')
});
router.get('/linkList',function (req,res) {
    linkModel.linkList(function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', data))
        } else {
            res.json(result.createResult('error', '获取数据失败!!'))
        }
    })
});
// 添加链接
router.get('/add',function (req,res) {
    res.render('admin/link_add')
});
router.post('/addLink',function (req,res) {
    linkModel.addLink(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', '添加成功'))
        } else {
            res.json(result.createResult('error', '添加失败'))
        }
    })
});
// 编辑链接
router.get('/edit',function (req,res) {
    res.render('admin/link_edit')
});
// 1.数据回显
router.post('/oldLink',function (req,res) {
    linkModel.oldLink(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', data))
        } else {
            res.json(result.createResult('error', '数据回显失败!!'))
        }
    })
});
// 2.数据写回
router.post('/newLink',function (req,res) {
    linkModel.newLink(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', '修改成功'))
        } else {
            res.json(result.createResult('error', '修改失败'))
        }
    })
});

// 删除链接
router.post('/deleteLink',function (req,res) {
    linkModel.deleteLink(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', '删除成功'))
        } else {
            res.json(result.createResult('error', '删除失败'))
        }
    })
});

module.exports = router;
