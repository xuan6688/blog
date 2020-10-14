//引入joi模块
const Joi = require('joi');

//定义对象的验证规则
const schema = Joi.object({
    username: Joi.string().min(2).max(8).error(new Error('username属性没有验证通过'))
});

async function run() {
    try {
        // joi.validate返回的对象是Promise对象
        const value = await schema.validateAsync({ username: '1' });
        console.log('验证通过');
        console.log(value);
    } catch (error) {
        console.log(error.message);
        return;
    }
}

run();