const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    //instanciation
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tel: { type: String, required: true },
    cin: { type: String, required: true },
    role: {
      type: String,
      enum: [
        'SUPER_ADMIN',
        'PLANIFICATEUR',
        'CHAUFFEUR',
        'FOURNISSEUR',
        'AGENT_SECURITE',
      ],
      required: true,
    },

    listeCamions: {
      type: [{ type: Schema.Types.ObjectId, ref: 'truck' }],
      default: undefined,
    },
    listeChauffeurs: {
      type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      default: undefined,
    },
    listeCommandes: {
      type: [{ type: Schema.Types.ObjectId, ref: 'commande' }],
      default: undefined,
    },
    categorie: { type: String, default: undefined },
    adresse: { type: String, default: undefined },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    blocked: { type: Date, default: null },
  },
  { versionKey: false, strict: false }
)

const User = model('user', userSchema)

module.exports = User
