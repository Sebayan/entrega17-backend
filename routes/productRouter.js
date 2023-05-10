const Router = require('koa-router')
const productRouter = new Router()

const { newProductController, getAllProductsController, getProductByIdController, delProductByIdController } = require('../controllers/productsController')
const { mock5 } = require('../DAO/mockFaker')
const { logger, loggererr } = require('../log/logger')


productRouter.get(
  '/productos',
  async (ctx) => {
    const products = await getAllProductsController()
    logger.info(`Ruta: /api${ctx.url}, metodo: ${ctx.method}`)
    ctx.body = products
  })

productRouter.get(
  '/productos/:id',
  async (ctx) => {
    const product = await getProductByIdController(ctx.params.id)
    if (product) {
      logger.info(`Ruta: /api${ctx.url}, metodo: ${ctx.method}`)
      ctx.body = product
    } else {
      loggererr.error(`Producto id: ${id} no encontrado`)
      ctx.status = 404
      ctx.body = { error: 'producto no encontrado' }
    }
  })


productRouter.post(
  '/productos/nuevo',
  async (ctx) => {
    const productToAdd = ctx.request.body
    const loaded = await newProductController(productToAdd)
    if (loaded) {
      logger.info(`Producto agregado correctamente`)
    } else {
      logger.info(`No se pudo agregar producto, datos incorrectos`)
    }
    ctx.redirect('/')
  })


productRouter.put(
  '/productos/:id',
  async (ctx) => {
    if (await modifyProductByIdController(ctx.params.id, ctx.request.body)) {
      logger.info(`Ruta: /api${ctx.url}, metodo: ${ctx.method}`)
      ctx.body = { message: 'producto modificado' }
    } else {
      loggererr.error(`Producto id: ${id} no encontrado`)
      ctx.status = 404
      ctx.body = { error: 'producto no encontrado' }
    } 
  })


productRouter.delete(
  '/productos/:id',
  async (ctx) => {
    const id = ctx.params.id
    if (await delProductByIdController(id)) {
      logger.info(`Ruta: /api${ctx.url}, metodo: ${ctx.method}`)
      ctx.body = { message: 'producto borrado' }
    } else {
      loggererr.error(`Producto id: ${id} no encontrado`)
      ctx.status = 404
      ctx.body = { error: 'producto no encontrado' }
    }
  })


productRouter.get(
  '/productos-test',
  async (ctx) => {
    const allProducts = await mock5.getAll()
    let tabla = '<table>'
    tabla += '<tr><th>Producto</th><th>Precio</th><th>Imagen</th></tr>'

    allProducts.forEach((fila) => {
      tabla += `
        <tr>
          <td>${fila.title}</td>
          <td>${fila.price}</td>
          <td><img src="${fila.thumbnail}" alt="${fila.title}" width="64" heigth="48"></td>
        </tr>`
    })
    tabla += '</table>'

    logger.info(`Ruta: /api${ctx.url}, metodo: ${ctx.method}`)
    ctx.body = tabla
  }
)

module.exports = productRouter