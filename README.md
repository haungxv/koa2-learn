一、中间件
1、koa-bodyparser中间件
把POST请求的参数解析到ctx.request.body中
2、koa-router
(1)router.all()：需要执行await next()才可以在all()和其它方法中同时命中
(2)命名路由：redirect、router.url()
(3)多中间件
(4)嵌套路由
(5)路由前缀
(6)url参数：参数会被添加到ctx.params中
3、koa-static
加载CSS、Javascript等静态资源
4、koa-views
加载HTML模板文件
二、Http2
1、Http1与Http2的不同
(1)Http2采用二进制传输数据，Http1采用文本格式传输数据
(2)Http2采用多路复用，允许在同一个连接上使用请求和响应双向数据流
(3)Http2可以为数据流设置优先级
(4)Http2引入了HPACK首部压缩
(5)Http2可以进行服务端推送
2、querystring模块，对请求的数据进行处理
三、模板引擎Nunjucks
1、文件扩展名.njk
2、变量
3、注释
4、标签：if for macro(定义可复用的内容) Extends/Block(模板继承) include/import
四、MVC
五、数据库
1、MySQL  Sequelize
2、MongoDB mongoose
3、Redis 数据缓存
