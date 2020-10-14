const { Article } = require('../../model/article');
// const { Comment } = require('../../model/comment');
// const { User } = require('../../model/user');
module.exports = async(req, res) => {
    // return res.send('111');
    const { id } = req.query;
    //根据id查询文章的详细信息
    let article = await Article.findOne({ _id: id });
    // let comments = await Comment.findOne({ aid: id }).populate('uid');
    // let uid = comments.uid;
    // let user = await User.find({ _id: uid });
    console.log(article);
    // console.log(comments);
    // res.send(comments);
    // res.send(user);
    // return;
    res.render('home/article.art', { article });
};