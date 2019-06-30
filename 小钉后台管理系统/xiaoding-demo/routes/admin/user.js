var express = require('express');
var router = express.Router();
// 引入body-parser 接收post数据
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend: false}));

// 引入M 层处理用户信息的块
var userModel = require('../../models/userModel');

// 引入返回信息规定格式
var result = require('../../libs/result');
// 用户模块

// 用户列表页
router.get('/list',function (req,res) {
   res.render('admin/user_list')
});
//渲染用户列表逻辑
router.get('/userList',function (req,res) {
    userModel.userList(function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult("success",data))
        } else{
            console.log(error)
        }
    })
});

// 添加用户页
router.get('/add',function (req,res) {
    res.render('admin/user_add')
});
// 添加用户逻辑
//     1.首先验证邮箱是否存在
router.get('/check_email',function (req,res) {
    // 通过调用userModel上的findOne方法，并传入email信息过去，findOne方法在那边自定义

    // 注意这里传过去的是实参，那边就会接收到一个email和callback
    userModel.findOne(req.query.email,function (data) {
        // 拿到数据库查询等处理后的数据

        if (data) {  // 如果有值，为true，说明邮箱已存在，不允注册

            // 调用这个函数会返回一个里面定义好的格式数据，因此这里只需要根据对应参数位置写相关信息即可
            res.json(result.createResult("error","邮箱已经存在"))
        } else {    // 如果没有，说明该邮箱可以使用
            res.json(result.createResult("success","可以注册"))
        }
    })
});

//     2. 添加用户信息提交后台
router.post('/addUser',function (req,res) {
    userModel.addUser(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success', '添加成功'))
        } else {
            res.json(result.createResult('error', '添加失败'))
        }
    })
});


// 编辑用户页
router.get('/edit',function (req,res) {
    res.render('admin/user_edit')
});
// 编辑用户部分(1)  获取旧数据回显
router.post('/oldUser',function (req,res) {
    userModel.oldUser(req.body,function (data) {
        // 获取到回显数据发送到前端
        if (data && data.length!==0) {
            res.json(result.createResult('success',data))
        } else {
            console.log(error)
        }
    })
});
// 编辑用户部分(2)  拿到新数据写入数据库
router.post('/newUser',function (req,res) {
    // 调用M 层的方法，传参去 M 层处理数据逻辑
    userModel.newUser(req.body,function (data) {
        // 数据库查询结果
        if (data && data.length!==0) {
            res.json(result.createResult('success','修改成功'))
        } else {
            res.json(result.createResult('error','修改失败'))
        }
    })
});
// 删除用户
router.post('/deleteUser',function (req,res) {
    userModel.deleteUser(req.body,function (data) {
        if (data && data.length !==0) {
            res.json(result.createResult('success','删除成功'))
        } else {
            res.json(result.createResult('error','删除失败'))
        }
    })
});


// 修改密码页
router.get('/edit_pass',function (req,res) {
    res.render('admin/user_password_edit')
});
router.post('/passwordUser',function (req,res) {
    userModel.passwordUser(req.body,function (data) {
        if (data && data.length!==0) {
            res.json(result.createResult('success','密码修改成功'))
        } else {
            res.json(result.createResult('error','修改失败'))
        }
    })
});

// 删除操作无需渲染页面，发个ajax即可

module.exports = router;

