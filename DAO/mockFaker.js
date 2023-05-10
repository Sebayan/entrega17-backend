const { faker } = require('@faker-js/faker')
faker.locate = 'es'


class MockDao {

  constructor( itemsNumber ) {
      this.itemsNumber = itemsNumber
  }
  
  async newItem() {
    const title = await faker.commerce.product()
    const price = await faker.commerce.price(100, 3000, 0)
    const thumbnail = await faker.image.imageUrl() 
    return {
      title: title,
      price: price,
      thumbnail: thumbnail 
    }
  }


  async getAll() {
    try{
      const items = []
      for (let i = 0; i < this.itemsNumber; i++) {
        items.push( await this.newItem () )
      }
      return items
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

}


const mock5 = new MockDao( 5 )

module.exports = { mock5 }