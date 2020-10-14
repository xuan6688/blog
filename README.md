##### 个人简易博客系统

1. 通过学习网上有关node+mongodb的相关视频所搭建的简易个人博客系统

2. 该系统存在些许bug以及功能还未完全开发

3. 由于使用的是bcrypt进行密码的加密，所以搭建在云服务器中出现了环境配置的问题，尚未处理好

   ##### 存在的bug

   - 数据在mongodb数据库中使用populate()方法进行关联查询时，所查到的结果不能在模板引擎中的res.render()进行渲染传参数的时候无法传递关联查询到的数组对象
   - 评论区没有实现成功，在参数传递过程中，有参数无缘丢失，直接console.log()可以打印出来，但是传参的过程中，突然丢失，检测不出来

##### 使用的技术

**前端**

- 使用原生的html+css+js进行页面的渲染

**后台**

- 使用bootStrap+Jquery进行页面的布局以及渲染

- 通过node(express)+mongoose第三方管理mongoDB数据库

- 后台通过art-template ,express-art-template 模板引擎进行对静态资源进行优化，

  用户通过express-session模块进行存储在网页的Cookie中
  密码通过bcrypt进行明文加密，但是这个插件只能加密不能进行解密
  时间格式通过dateFormat进行转换

  分页通过mongoose-sex-page第三方包进行分页管理

  文件获取通过formidable第三方插件进行获取

  等等插件，具体看package.json以及express内置的一个模块















