const getDao = require('../DAO/factory')


const checkUserDto = async( email, password ) => {
  const users = await ( await getDao()).users
  const userCheck = await users.checkUser( email, password )
  return userCheck
}

const addUserDto = async( email, password ) => {
  const users = await ( await getDao()).users
  const newUser = await users.addUser( email, password )
  return newUser
}



module.exports = { checkUserDto, addUserDto }