const express = require('express')
const Truck = require('../models/truck')
const dayjs = require('dayjs')
const router = express.Router()

//lister
router.get('/', async (req, res) => {
  try {
    const { filter } = req.query
    const trucks = await Truck.find(filter)
    res.status(200).send(trucks)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

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

//modifier + supprimer
router.put('/', async (req, res) => {
  try {
    const { id, model, serieNumber } = req.body
    const truck = await Truck.findById(id)
    truck.serieNumber = serieNumber || truck.serieNumber
    truck.model = model || truck.model
    truck.save().then((savedTruck) => {
      res.status(200).send(savedTruck)
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
