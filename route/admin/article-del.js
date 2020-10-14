const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    const { id } = req.query;
    await Article.findOneAndDelete({ _id: id });
    res.redirect('article');
};