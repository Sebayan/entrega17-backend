const { getAllProductsDto, getProductByIdDto, delProductByIdDto, addNewProductDto } = require('../DTO/productDto')


const validateObject = ( objeto ) => {
  return Object.values(objeto).includes('')
}


const imageUrl = ( url ) => {
  const ext = /(\.jpg|\.jpeg|\.png|\.gif)$/i
  return ext.test( url )
}


const newProductController = async ( productToAdd ) => {
  if ( !validateObject( productToAdd ) & imageUrl ( productToAdd.thumbnail )) {
    await addNewProductDto ( productToAdd )
    return true
  }
  return false  
}

const getAllProductsController = async() => {
  const products = await getAllProductsDto()
  return products
}

const getProductByIdController = async( id ) => {
  const product = await getProductByIdDto( id )
  return product
}

const delProductByIdController = async( id ) => {
  await delProductByIdDto( id )
  return
}

module.exports = { newProductController, getAllProductsController, getProductByIdController, delProductByIdController }