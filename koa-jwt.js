const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const views = require('koa-views');
const static = require('koa-static');
const { sign } = require('jsonwebtoken');
const secret = 'demo';
const jwt = require('koa-jwt')({ secret });

const app = new koa();
const router = new Router();
const detail=new Router();
const user=new Router();

app.use(bodyParser());
detail.get('/info',async ctx=>{
    ctx.body={username:ctx.state.user.username};
});
user.get('/api/login',async (ctx,next)=>{
    ctx.body={username:ctx.state.user.username};
})
.use('/api/user',jwt,detail.routes(),detail.allowedMethods());


router.post('/api/login', async (ctx, next) => {
    const user = ctx.request.body;
    if (user && user.username) {
        let { username } = user;
        const token = sign({ username }, secret, { expiresIn: '1h' });
        ctx.body = {
            message: 'Get Token Success',
            code: 1,
            token
        };
    } else {
        ctx.body={
            message:'Error',
            code:-1
        }
    }
})
.get('/api/userInfo',jwt,async ctx=>{
    ctx.body={username:ctx.state.user.username};
})
.get('/api/adminInfo',jwt,async(ctx,next)=>{
    if(ctx.state.user.username==='admin'){
        next()
    }else{
        ctx.body={
            code:-1,
            message:'Authentication Error!'
        }
    }
},async ctx=>{
    ctx.body={username:ctx.state.user.username}
})


app.use(router.routes());
app.use(router.allowedMethods());


app.listen(4000, () => {
    console.log(`server is running at http://localhost:4000`)
})