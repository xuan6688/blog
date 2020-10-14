//博客首页路由
const express = require('express');
//创建博客首页路由
const home = express.Router();

//博客首页
home.get('/', require('./home/index'));

//博客详细页
home.get('/article', require('./home/article'));

//创建评论路由
home.post('/comment', require('./home/comment'));
//将路由对象作为模块成员进行导出
module.exports = home;