const { config, staticFiles } = require('../config/environment')
const { logger, loggererr } = require('../log/logger')


  const Koa = require('koa')
  const session = require('koa-session')
  const passport = require('../middlewares/auth');
  const http = require('http')
  const IO = require('socket.io')
  
  const app = new Koa()
  const server = http.createServer(app.callback())
  const io = IO(server)
  

  const productRouter = require('../routes/productRouter')
  const sessionRouter = require('../routes/sessionRouter')
  const infoRouter = require('../routes/infoRouter')

  const { newProductController, getAllProductsController } = require('../controllers/productsController')
  const { getAllChatsController, addChatMsgController } = require('../controllers/chatsController')
 

  app.use(require('koa-bodyparser')())
  app.use(require('koa-static')(staticFiles))
  app.keys = ['secret-pin']
  app.use(session({}, app))
  app.use(passport.initialize())
  app.use(passport.session())


  
  io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!')

    socket.emit('productos', await getAllProductsController())
 
    socket.on('update', async producto => {
      await newProductController( producto )
      io.sockets.emit('productos', await getAllProductsController())
    })
  
    socket.emit('mensajes', await getAllChatsController())

    socket.on('newMsj', async mensaje => {
      mensaje.date = new Date().toLocaleString()
      await addChatMsgController( mensaje ) 
      io.sockets.emit('mensajes', await getAllChatsController())
    })

  })


  const Router = require('koa-router')
  const router = new Router()
  
  router.use('/session', sessionRouter.routes(), sessionRouter.allowedMethods())
  
  router.use('/api', productRouter.routes(), productRouter.allowedMethods())
  
  router.use('/info', infoRouter.routes(), infoRouter.allowedMethods())
  
  app.use(async (ctx, next) => {
    logger.warn(`Ruta: ${ctx.url}, metodo: ${ctx.method} no implemantada`)
    ctx.body = `Ruta: ${ctx.url}, metodo: ${ctx.method} no implemantada`
    await next();
  })
  
  app.use(router.routes())
  app.use(router.allowedMethods())
  
  let PORT = (config.port) ? config.port : 8080
  
  if (config.mode === 'CLUSTER') {
    PORT = config.same === 1 ? PORT + cluster.worker.id - 1 : PORT
  }
  
  server.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
  })
  server.on('error', error => loggererr.error(`Error en servidor ${error}`))
