const { Schema, model } = require('mongoose')
const livraisonSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  date: { type: Date },
  camion: { type: Schema.Types.ObjectId, ref: 'truck' },
  chauffeur: { type: Schema.Types.ObjectId, ref: 'user' },
  fournisseur: { type: Schema.Types.ObjectId, ref: 'user' },
  listProducts: [
    {
      qte: { nbPallete: Number, nbCarton: Number },
      product: { type: Schema.Types.ObjectId, ref: 'product' },
    },
  ],
  entree: { type: Date },
  sortie: { type: Date },
})

const Livraison = model('livraison', livraisonSchema)
module.exports = Livraison
