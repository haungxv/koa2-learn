//用redis做session持久化
const koa = require('koa');
const app = new koa();
const session = require('koa-session');
const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
const { promisify } = require('util');

//用promisify改造client.hgetall
const hgetallAsync = promisify(client.hgetall).bind(client);
app.keys = ['some secret hurr'];

const store = {
    get: async (key, maxAge) => {
        return await hgetallAsync(key)
    },
    set: (key, sess, maxAge) => {
        client.hmset(key, sess)
    },
    destroy: (key) => {
        client.hdel(key)
    }
}

const CONFIG = {
    key: 'koa:sess',
    maxAge: 846400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    store  //添加store参数用于操作数据库
};
app.use(session(CONFIG, app));
app.use(ctx => {
    if (ctx.path === '/favicon.ico') return;
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
})

app.listen(4000);