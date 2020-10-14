// 引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');
//引入密码加密模块
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {

    //调用schma.validateAsync
    try {
        // console.log(req.body);
        // joi.validate返回的对象是Promise对象
        await validateUser(req.body);
        // console.log(value);
    } catch (error) {
        // console.log(error.message);
        // return res.redirect('/admin/user-edit?message=' + error.message);
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }));
    }
    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }));
    }
    // 对密码进行加密处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;
    await User.create(req.body);
    res.redirect('/admin/user');
};