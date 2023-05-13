const { Schema, model } = require('mongoose')

const truckSchema = new Schema(
  {
    model: { type: String, required: true },
    serieNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  { versionKey: false }
)

const Truck = model('truck', truckSchema)

module.exports = Truck
