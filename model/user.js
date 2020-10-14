//引入mongoose模块
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//引入joi模块
const Joi = require('joi');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    //admin 超级管理员
    //normal 普通用户
    role: {
        type: String,
        required: true
    },
    //0：启用状态 
    //1：禁用状态
    state: {
        type: Number,
        default: 0
    }
});

//创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    //生产随机字符串
    //genSalt()方法接受一个数值作为参数
    //数值越大 生成的随机字符串复杂度越高
    //数值越小 生成的随机字符串复杂度越低
    //默认值为10
    //返回生成的随机字符串
    const salt = await bcrypt.genSalt(10);
    //对密码进行加密
    //1.要进行加密的明文
    //2.随机字符串
    //返回值是加密后的密码
    const pass = await bcrypt.hash('123456', salt);
    console.log(salt);
    console.log(pass);
    // 集合的添加，主要用于测试
    // const user = await User.create({
    //     username: 'xuan',
    //     email: '3028360892@qq.com',
    //     password: pass,
    //     role: 'admin',
    //     state: 0
    // });
}
//验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = Joi.object({
        username: Joi.string().required().min(2).max(20).error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合验证规则')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,12}$/).required().error(new Error('密码不符合验证规则')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色格式不合法')),
        state: Joi.number().integer().valid(0, 1).required().error(new Error('状态不符合验证规则'))
    });
    return schema.validateAsync(user);
};
// createUser();
module.exports = {
    User,
    validateUser
}