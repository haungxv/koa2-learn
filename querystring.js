const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const views = require('koa-views');
const static = require('koa-static');


const app = new koa();
const router = new Router();
app.use(bodyParser());


router.get('/home',(ctx,next)=>{
    console.log(ctx.request.query);
    // {id:"12",name:"huang"}
    console.log(ctx.request.querystring);
    // id=12&name=huang
});
router.get('/home/:id/:name',(ctx,next)=>{
    console.log(ctx.params);
    ctx.response.body='<h1>HOME page /:id/:name</h1>'
});


app.use(router.routes());
app.use(router.allowedMethods());


app.listen(4000, () => {
    console.log(`server is running at http://localhost:4000`)
})