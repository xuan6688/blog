const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    let { id } = req.query;
    const { username, email, role, state, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ _id: id });
    //密码比对
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        //密码比对成功
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        res.redirect('user');
    } else {
        //密码比对失败
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息的修改', id: id };
        return next(JSON.stringify(obj));
    }
    // res.send(user);
};