//引入express框架
const express = require('express');
//处理路径的模块
const path = require('path');
//引入body-parser模块，用于处理post请求参数
const bodyParser = require('body-parser');
//导入express-session模块
const session = require('express-session');
//导入dataformat第三方模块
const dateFormat = require('dataformat');
const template = require('art-template');
//导入morgan第三方模块
const morgan = require('morgan');
//导入config模块
const config = require('config');
//创建网站服务器
const app = express();

//引入数据库连接的信息模块mongoose
require('./model/connect');
//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
//配置session
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    name: 'login',
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 设置 session 的有效时间，单位毫秒
    },
}));
//告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
//告诉express框架模板的默认后缀
app.set('view engine', 'art');
//当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
//登录拦截
app.use('/admin', require('./middleware/loginGuard'));

console.log(config.get('title'));
//获取系统环境变量，返回值是对象
if (process.env.NODE_ENV == 'development') {
    //当前是开发环境
    console.log('当前是开发环境');
    app.use(morgan('dev'));
} else {
    //当前是生产环境
    console.log('当前是生产环境');
    app.use(morgan('dev'));
}

//导入home以及admin路由模块
const home = require('./route/home');
const admin = require('./route/admin')

//设置拦截请求,为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

//错误处理中间件
app.use((err, req, res, next) => {
    //将字符串对象转换成对象类型
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});
//监听端口
app.listen(80, () => {
    console.log('网站服务器访问成功');
})