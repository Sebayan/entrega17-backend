const Router = require('koa-router')
const sessionRouter = new Router()

const passport = require('../middlewares/auth')

const { logger, loggererr } = require('../log/logger')


sessionRouter.get(
  '/',
  (ctx) => {
    if (ctx.session.passport) {
      logger.info(`Usuario ${ctx.session.passport.user} logeado`)
      ctx.status = 200
      ctx.body = { user: ctx.session.passport.user }
    } else {
      logger.warn(`No hay usuario logeado`)
      ctx.status = 401
      ctx.body = { user: '' }
    }
  }
)

sessionRouter.post(
  '/login',
  passport.authenticate('login'),
  function (_, ctx) {
    logger.info(`Autenticacion exitosa`)
    ctx.status = 200
    ctx.body = { message: 'Autenticación exitosa.' }
  }
)

sessionRouter.post(
  '/logingoogle',
  passport.authenticate('googleauth'),
  function (_, ctx) {
    logger.info(`Autenticacion con Google exitosa`)
    ctx.status = 200;
    ctx.body = { message: 'Autenticación exitosa.' }
  }
)

sessionRouter.post(
  '/register',
  passport.authenticate('register'),
  function (_, ctx) {
    logger.info(`Usuario creado correctamente`)
    ctx.status = 200;
    ctx.body = { rlt: true, msg: 'Usuario creado correctamente' }
  }
)

sessionRouter.post('/logout', async (ctx) => {
  ctx.session = null
  logger.info(`Sesion cerrada.`)
  ctx.redirect('/')
})

module.exports = sessionRouter