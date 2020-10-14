const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    // res.send('ok');
    req.app.locals.current = 'article';
    const { id } = req.query;
    if (id) {
        let articles = await Article.findOne({ _id: id });
        // console.log(articles);
        res.render('admin/article-edit', {
            articles: articles,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
    } else {
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        });
    }
    // res.render('admin/article-edit');
};