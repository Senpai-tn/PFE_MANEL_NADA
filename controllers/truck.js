const express = require('express')
const Truck = require('../models/truck')
const router = express.Router()

//ajouter
router.post('/', async (req, res) => {
  const { model, serieNumber } = req.body
  const truck = new Truck({ model, serieNumber })
  await truck
    .save()
    .then((savedTruck) => {
      res.status(200).send(savedTruck)
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

module.exports = router
