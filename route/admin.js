const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart();
//博客管理界面路由
const express = require('express');
//创建博客管理界面路由
const admin = express.Router();


//渲染登录页面
admin.get('/login', require('./admin/loginPage'));

//实现登录功能
admin.post('/login', require('./admin/login'));

// 用户开始
//渲染用户列表路由
admin.get('/user', require('./admin/userPage'));

//渲染用户编辑列表路由
admin.get('/user-edit', require('./admin/user-edit'));

//添加用户编辑列表路由
admin.post('/user-add', require('./admin/user-add'));

//修改用户路由
admin.post('/user-modify', require('./admin/user-modify'));

//删除用户功能路由
admin.get('/userdel', require('./admin/userdel'));
//用户结束

//文章开始
//渲染文章列表路由
admin.get('/article', require('./admin/articlePage'));

//文章编辑列表路由
admin.get('/article-edit', require('./admin/article-edit'));

//添加文章发布列表路由
admin.post('/article-add', require('./admin/article-add'));

//修改文章列表路由
admin.post('/article-modify', require('./admin/article-modify'));

//文章删除列表路由
admin.get('/article-del', require('./admin/article-del'));

//文章结束
//实现退出功能
admin.get('/loginout', require('./admin/loginout'));
//将路由对象作为模块成员进行导出
module.exports = admin;