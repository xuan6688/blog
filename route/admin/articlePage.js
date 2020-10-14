const { Article } = require('../../model/article');
// const { User } = require('../../model/user');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // res.send('ok');
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.current = 'article';
    // res.render('admin/article');
    // 接收客户端传递过来的页码
    const page = req.query.page;
    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库中发送查询请求
    // 查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(3).display(5).exec();
    // console.log(articles);
    // console.log(articles.records.author);
    // let users = await User.findOne({ _id: articles.records.author });
    // res.send(articles);
    // res.send(users);
    // return;
    // 渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: articles,
    });
};