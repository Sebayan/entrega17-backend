const { v4: uuidv4 } = require('uuid')

class MemoryProductDao { 

  constructor( productList ) {
      this.productList = productList
  }
  

  getAll() {
    return this.productList
  }
 

  getById( id ) {
    const product = this.productList.find( ele => ele.id === id )
    return product ? product : null
  }


  deleteById( id ) {  
    this.productList = this.productList.filter( ele => ele.id !== id )
    return 
  }


  deleteAll() {
    this.productList = []
    return
  }


  add( item ) {
    item.id = uuidv4()
    this.productList.push( item )
    return
  }

}

module.exports = MemoryProductDao 