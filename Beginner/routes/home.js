const express = require('express');
const router = express.Router();

// 首页
router.get('/', (req, res) => {
   // 渲染页面，使用Pug
   res.render('home', {title: 'My Express App', message: 'Hello'});
});

module.exports = router;
