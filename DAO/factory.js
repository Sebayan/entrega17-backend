const { persistence } = require('../config/environment')
const MongoProductDao = require('./mongoProductDao')
const MongoUserDao = require('./mongoUserDao')
const MongoChatDao = require('./mongoChatDao')
const MemoryProductDao = require('./memoryProductDao')
const MemoryUserDao = require('./memoryUserDao')
const MemoryChatDao = require('./memoryChatDao')



let productsDao = undefined,
  usersDao = undefined,
  chatsDao = undefined

const getDao = async() => {
  if( !productsDao ) {
    if ( persistence === 'MEMORY' ) {
      productsDao = new MemoryProductDao([])
      usersDao = new MemoryUserDao([])
      chatsDao = new MemoryChatDao({ chat: [] })
    } else {
      productsDao = new MongoProductDao()
      usersDao = new MongoUserDao()
      chatsDao = new MongoChatDao()
    }
  }
  return {
    products: productsDao,
    users: usersDao,
    chats: chatsDao
  }
}

module.exports = getDao