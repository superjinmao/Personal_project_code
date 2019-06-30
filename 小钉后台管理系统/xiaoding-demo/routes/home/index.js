var express = require('express');
var router = express.Router();
// 引入body-parser 接收post数据
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend: false}));

// 引入M 层处理用户信息的块
var userModel = require('../../models/userModel');

// 引入返回信息规定格式
var result = require('../../libs/result');
// 首页
/*
*  之前返回静态页面是这样的， res.sendFile(path.resolve('./views/home/index.html'))
*  有了ejs模板引擎后，是这样的res.render('home/index') ，用render ，因为模板引擎管理者静态文件
*  用了模板引擎，只是ejs帮我们处理html模板，那些html模板中引入的静态文件css,js这些还要靠public来处理，路径还是要修改的
*
*/
router.get('/',function (req,res) {
    res.render('home/index')
});
// 注册页
router.get('/signup',function (req,res) {
    res.render('home/register')   // send返回的是字符串
});

// 注册相关逻辑
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

router.post('/register',function (req,res) {
    userModel.register(req.body,function (data) {
        if (data) {
            res.json(result.createResult("success","注册成功"))
        } else{
            res.json(result.createResult("error","注册失败"))
        }
    })
});

// 登录相关逻辑
router.post('/login',function (req,res) {
    userModel.login(req.body,function (data) {
        if (data && data.length!==0 && data[0].role === '管理员') {
            res.json(result.createResult("success","登录成功！！"))
        } else if (data && data.length!==0 && data[0].role === '普通用户') {
            res.json(result.createResult("error","抱歉，您还不是管理员"))
        } else {
            res.json(result.createResult("error","用户名或密码错误！"))
        }
    })
});

// 登录页
router.get('/signin',function (req,res) {
    res.render('home/login')
    // 这也是服务端渲染的特点，返回这个页面，还可以带数据，比如我可以在登录页里面用模板语法，带数据整个页面返回到前端，有利于SEO
});
// 零基础入门
router.get('/foundation',function (req,res) {
    res.render('home/foundation')
});
// 进阶实战
router.get('/progress',function (req,res) {
    res.render('home/progress')
});
// 高级修炼
router.get('/senior',function (req,res) {
    res.render('home/senior')
});
// 战力强化
router.get('/strengthen',function (req,res) {
    res.render('home/strengthen')
});
// 移动开发
router.get('/mobile',function (req,res) {
    res.render('home/mobile')
});
// Python全栈
router.get('/fullStack',function (req,res) {
    res.render('home/fullStack')
});



module.exports = router;
