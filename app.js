var session = require('koa-generic-session')
var redisStore = require('koa-redis')
var koa = require('koa')

var app = new koa()
app.keys = ['keys', 'keykeys']
app.use(session({
  store: redisStore({
    host: '127.0.0.1',
    port: 6379,
    password: '123456'
  })
}))

app.use(async (ctx, next) => {
  if (ctx.path === '/testWriteSession' && ctx.session.num === undefined) {
    ctx.session.num = 0
  }
  ctx.session.num++
  ctx.body = {
    data: ctx.session.num
  }
})

const port = 8080
app.listen(port, () => {
  console.log(`serve on port ${port}`)
})
