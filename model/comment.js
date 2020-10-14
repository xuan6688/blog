//引入mongoose模块
const mongoose = require('mongoose');
//创建评论集合规则
const commentSche = new mongoose.Schema({
    //文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    //用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
});

const Comment = mongoose.model('Comment', commentSche);

module.exports = {
    Comment
}