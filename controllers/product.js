const express = require('express')
const { Product } = require('../models')
const router = express.Router()

//lister
router.get('/', async (req, res) => {
  try {
    const { filter } = req.query
    const products = await Product.find(filter)
    res.status(200).send(products)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//modifier + supprimer
router.put('/', async (req, res) => {
  try {
    const { id, name, categorie, deletedAt } = req.body
    const produit = await Product.findById(id)
    produit.categorie = categorie || produit.categorie
    produit.name = name || produit.name
    produit.deletedAt = deletedAt || produit.deletedAt
    produit.save().then((savedProduit) => {
      res.status(200).send(savedProduit)
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
