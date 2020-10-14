const bcrypt = require('bcrypt');
//导入用户集合的构造函数
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0)
        return res.status(400).render('admin/error', { msg: '邮件地址或者密码输入错误' });
    //根据邮箱地址查询用户信息
    let user = await User.findOne({ email });
    // console.log(user);
    // console.log(user);
    if (user) {
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            //登录成功
            //将用户名存储在请求对象中
            req.session.username = user.username;
            req.session.role = user.role;
            // res.send('登入成功');
            req.app.locals.userInfo = user;
            //对用户角色进行判断
            if (user.role == 'admin') {
                res.redirect('user');
            } else {
                res.redirect('/home/')
            }
            //重定向到用户列表页面
            res.redirect('user');
        } else {
            res.status(400).render('admin/error', { msg: '邮件地址或者密码输入错误' });
        }
    } else {
        //没有查询到用户
        res.status(400).render('admin/error', { msg: '邮件地址或者密码输入错误' });
    }
}