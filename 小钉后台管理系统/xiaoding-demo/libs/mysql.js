//  在这里处理相关的数据库连接，公用的代码
// mysql这里使用连接池的方法，与之前不同,相关配置去 npmjs.com 找到mysql下面的 Pool options

var mysql = require('mysql');
// 引入config的配置内容
var config = require('config-lite')(__dirname);  // 读取配置文件，自动会去找到下面的default.js文件
// 会返回一个对象，就是default.js里面的module.exports = {} , 最终通过 . 的方式就可以拿到相关的配置

var pool = mysql.createPool(config.mysql);  // 拿到整块配置，传给它


module.exports = pool;
