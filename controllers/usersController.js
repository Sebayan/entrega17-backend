const { checkUserDto, addUserDto } = require('../DTO/userDto')

const validateEmail = ( email ) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return email.match(mailformat) !== null
}

const checkUserController = async( email, password ) => {
  const checkUser = await checkUserDto( email, password )
  return checkUser
}


const newUserController = async ( username, password ) => {
  if ( validateEmail( username ) & password ) {
    await addUserDto ( username, password )
    return true
  }
  return false  
}

module.exports = { checkUserController, newUserController }