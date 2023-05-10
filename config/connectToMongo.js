const mongoose = require('mongoose')

let isConected

const connectToDb = async () => {
  if(!isConected) {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGOCREDENTIALSECOMMERCE,
    { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          isConected = true
          console.log('MongoDB Connected...')})
        .catch(err => console.log(err))   
    return
  }

  return
}

module.exports = connectToDb