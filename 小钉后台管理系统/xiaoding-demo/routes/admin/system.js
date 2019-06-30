var express = require('express');
var router = express.Router();

// 系统设置模块，实现系统信息修改，系统信息包括：logo、网站标题、网站副标题、网站描述、小程序二维码图片、版权
router.get('/',function (req,res) {
    res.render('admin/system_config')
});

module.exports = router;
