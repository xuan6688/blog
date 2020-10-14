const { Article } = require("../../model/article");
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    let { page } = req.query;
    let articles = await pagination(Article).page(page).size(4).display(5).find().exec();
    // res.send(articles);
    // return;
    res.render('home/default', {
        articles: articles
    });
    // res.send('index');
};