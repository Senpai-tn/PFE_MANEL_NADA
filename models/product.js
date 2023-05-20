const { Schema, model } = require('mongoose')
const productSchema = new Schema({
  name: { type: String, required: true },
  categorie: { type: String, required: true },
})

const Product = model('product', productSchema)
module.exports = Product
