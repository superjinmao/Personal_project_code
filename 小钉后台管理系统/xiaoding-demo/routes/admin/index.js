var express = require('express');
var router = express.Router();

// 引入各个功能的模块
var user = require('./user');
var nav = require('./nav');
var course = require('./course');
var link = require('./link');
var category = require('./category');
var system = require('./system');

// 渲染后台首页
router.get('/',function (req,res) {
    res.render('admin/index')
});

// 使用挂载这几个模块
router.use('/user',user);
router.use('/nav',nav);
router.use('/course',course);
router.use('/link',link);
router.use('/category',category);
router.use('/system',system);
// 导出对象


module.exports = router;
