const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const views = require('koa-views');
const static = require('koa-static');


const app = new koa();
const router = new Router();
app.use(bodyParser());


router.get('/',async (ctx,next)=>{
    ctx.type = 'html';
    let html = `
    <h1>登陆</h1>
    <form method="post" action="/">
    <p>用户名</p>
    <input name="userName" /><br/>
    <p>密码</p>
    <input name="password" /><br/>
    <button type="submit">submit</button>
    </form>`
    ctx.body = html;
    await next();
});
router.post('/',(ctx,next)=>{
    let postdata = ctx.request.body;
    ctx.body = postdata;
});
router.all('/*',async (ctx,next)=>{
    ctx.set("Access-Control-Allow-Origin","*");
    console.log("match all method");
    await next();
})


app.use(router.routes());
app.use(router.allowedMethods());


app.listen(4000, () => {
    console.log(`server is running at http://localhost:4000`)
})