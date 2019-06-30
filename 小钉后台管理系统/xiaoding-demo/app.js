var express = require('express');
var app = express();

// 引入config-lite   这个包的作用：帮助我们去读取不同的文件   默认会去读取   config/default.js
var config = require('config-lite')(__dirname);  // 调用函数，传文件路径 dirname
var package = require('./package.json');  // 引入配置文件，可以使用里面的版本name等
var path = require('path');
// 引入前后台路由
var admin = require('./routes/admin/index');
var home = require('./routes/home/index');
// 使用ejs模板引擎去加载这些html文件
var ejs = require('ejs');
/*
*    有了模板引擎之后，渲染Html模板更加方便灵活
*/
// 要让ejs去管理html文件（模板），需要经历三步
app.set('engine views',path.resolve('views'));   // 设置目录，给绝对路径，path.resolve()能返回一个绝对路径
app.engine('html',ejs.__express);                // 设置html后缀
app.set('view engine','html');                  // 设置模板引擎

// 加载内置静态文件中间件    ./public 是一个绝对路径    可通过console.log(path.resolve('./public')) 查看该绝对路径
app.use(express.static('./public'));

// 使用前后台路由
app.use('/admin',admin);
app.use('/',home);


// 端口号通过配置文件设置
app.listen(config.port,function (error) {
    if (!error) {
        // package.json内容是一个json对象，可以 .  拿到里面的东西
        console.log(`${package.name} listening on ${config.port}`)
    }
});
