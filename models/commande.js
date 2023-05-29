const { Schema, model } = require('mongoose')

const commandeSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  fournisseur: { type: Schema.Types.ObjectId, ref: 'user' },
  date: { type: Date, required: true },
  etat: {
    type: String,
    enum: ['Envoyée', 'Confirmée', 'Annulée', 'Refusée'],
    default: 'Envoyée',
  },
  listProducts: [
    {
      qte: { nbPallete: Number, nbCarton: Number },
      product: { type: Schema.Types.ObjectId, ref: 'product' },
    },
  ],
})

const Commande = model('commande', commandeSchema)
module.exports = Commande
