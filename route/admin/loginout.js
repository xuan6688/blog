module.exports = (req, res) => {
    //删除session
    req.session.destroy(function() {
        //删除cookie
        res.clearCookie('login');
        req.app.locals.userInfo = null;
        //重定向到用户页面
        res.redirect('/admin/login');
    });
}