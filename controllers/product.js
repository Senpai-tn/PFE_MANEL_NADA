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

module.exports = router
