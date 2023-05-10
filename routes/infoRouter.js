const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const infoRouter = new Router()

const { infoTemplate } = require('../api/info')
const { logger } = require('../log/logger')

infoRouter.get(
  '/',
  async (ctx) => {
    const tabla = infoTemplate()
    logger.info(`Ruta: /info, metodo: ${ctx.method}`)
    ctx.body = tabla
  })

app.use(infoRouter.routes())
module.exports = infoRouter