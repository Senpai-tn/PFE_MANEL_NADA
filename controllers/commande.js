const express = require('express')
const { Commande, Truck } = require('../models')
const router = express.Router()

//lister
router.get('/', async (req, res) => {
  try {
    const { filter } = req.query
    const commande = await Commande.find(filter)
      .populate('fournisseur')
      .populate('listProducts')
    res.status(200).send(commande)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//ajouter
router.post('/', async (req, res) => {
  const { fournisseur, listProducts } = req.body
  const commande = new Commande({ fournisseur, listProducts })
  await commande
    .save()
    .then(async (savedCommande) => {
      const clone = await Commande.findById(savedCommande._id)
        .populate('fournisseur')
        .populate('listProducts.product')
      res.status(200).send(clone)
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

//modifier + supprimer
router.put('/', async (req, res) => {
  try {
    const { id, fournisseur, listProducts } = req.body
    const commande = await Commande.findById(id)
    commande.fournisseur = fournisseur || commande.fournisseur
    commande.listProducts = listProducts || commande.listProducts
    commande.save().then(async (savedCommande) => {
      const clone = await Commande.findById(savedCommande._id)
        .populate('fournisseur')
        .populate('listProducts.product')
      res.status(200).send(clone)
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
