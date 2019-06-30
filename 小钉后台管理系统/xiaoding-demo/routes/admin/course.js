var express = require('express');
var router = express.Router();
// 引入body-parser 接收post数据
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend: false}));

// 引入M 层处理导航信息的块
var courseModel = require('../../models/courseModel');

// 引入返回信息规定格式
var result = require('../../libs/result');

// 渲染课程列表
router.get('/list',function (req,res) {
    res.render('admin/course_list')
});
router.get('/courseList',function (req,res) {
    courseModel.courseList(function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', data))
        } else {
            res.json(result.createResult('error', '获取数据失败!!'))
        }
    })
});
// 添加课程
router.get('/add',function (req,res) {
    res.render('admin/course_add')
});
router.post('/addCourse',function (req,res) {
    courseModel.addCourse(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', '添加成功'))
        } else {
            res.json(result.createResult('error', '添加失败'))
        }
    })
});
// 编辑课程
router.get('/edit',function (req,res) {
    res.render('admin/course_edit')
});
// 1.旧数据回显
router.post('/oldCourse',function (req,res) {
    courseModel.oldCourse(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success',data))
        } else {
            res.json(result.createResult('error', '数据回显失败!!'))
        }
    })
});
// 2.新数据写入数据库
router.post('/newCourse',function (req,res) {
    courseModel.newCourse(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success','修改成功'))
        } else {
            res.json(result.createResult('error', '修改失败'))
        }
    })
});
// 删除课程
router.post('/deleteCourse',function (req,res) {
    courseModel.deleteCourse(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success','删除成功'))
        } else {
            res.json(result.createResult('error', '删除失败'))
        }
    })
});

module.exports = router;
