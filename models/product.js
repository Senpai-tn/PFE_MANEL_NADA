const { Schema, model } = require('mongoose')
const productSchema = new Schema({
  name: { type: String, required: true },
  categorie: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
})

const Product = model('product', productSchema)
module.exports = Product
