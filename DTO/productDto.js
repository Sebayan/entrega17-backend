const getDao = require('../DAO/factory')


const getAllProductsDto = async() => {
  const products = await (await getDao()).products
  const allProducts = await products.getAll()
  return allProducts
}

const getProductByIdDto = async( id ) => {
  const products = await (await getDao()).products
  const productById = await products.getById( id )
  return productById
}

const delProductByIdDto = async( id ) => {
  const products = await (await getDao()).products
  await products.deleteById( id )
  return 
}

const delAllProductsDto = async() => {
  const products = await (await getDao()).products
  await products.deleteAll()
  return 
}

const addNewProductDto = async( item ) => {
  console.log( item )
  const products = await (await getDao()).products
  await products.add( item )
  return 
}


module.exports = { getAllProductsDto, getProductByIdDto, delProductByIdDto, delAllProductsDto, addNewProductDto }
