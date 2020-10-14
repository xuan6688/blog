// const user = require('../../model/user');
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    // console.log(req.query);
    req.app.locals.current = 'user';
    //接受客户端传递过来的当前页参数
    let page = req.query.page || 1;
    //每页显示的数据条数
    let pageSize = 5;
    //查询用户数据的总数
    let count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count / pageSize);
    let start = (page - 1) * pageSize;
    let users = await User.find({}).limit(pageSize).skip(start);
    // res.send(users);
    res.render('admin/user', {
        users: users,
        total: total,
        page: page,
        count: count
    });
};