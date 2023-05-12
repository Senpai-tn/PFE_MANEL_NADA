const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  //instanciation
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tel: { type: String, required: true },
  deletedAt: { type: Date, default: null },
})

const User = model('user', userSchema)

module.exports = User
