const express = require('express')
const Truck = require('../models/truck')
const dayjs = require('dayjs')
const { User } = require('../models')
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
  try {
    const { model, serieNumber, idFournisseur } = req.body
    const truck = new Truck({ model: model, serieNumber: serieNumber })
    truck.save().then(async (savedTruck) => {
      const fournisseur = await User.findById(idFournisseur)
      if (fournisseur.listeCamions) {
        fournisseur.listeCamions.push(savedTruck._id)
      } else fournisseur.listeCamions = [savedTruck._id]
      fournisseur.save().then(async (savedFournisseur) => {
        const clone = await User.findById(fournisseur._id)
          .populate('listeCamions')
          .populate('listeChauffeurs')
          .populate('listeCommandes')
        res.status(200).send(clone)
      })
    })
  } catch (error) {
    res.status(501).send(error)
  }
})

//modifier + supprimer
router.put('/', async (req, res) => {
  try {
    const { id, model, serieNumber, deletedAt } = req.body
    const truck = await Truck.findById(id)
    truck.serieNumber = serieNumber || truck.serieNumber
    truck.model = model || truck.model
    truck.deletedAt = deletedAt || truck.deletedAt
    truck.save().then((savedTruck) => {
      res.status(200).send(savedTruck)
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
