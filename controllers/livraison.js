const express = require('express')
const { Livraison } = require('../models')
const dayjs = require('dayjs')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { date, camion, chauffeur, fournisseur, listProducts } = req.body
    const livraison = new Livraison({
      date,
      camion,
      chauffeur,
      fournisseur,
      listProducts,
    })
    livraison.save().then((savedLivraison) => {
      res.send(livraison)
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const { filter } = req.query
    const livraisons = await Livraison.find({
      date: {
        $gte: dayjs(filter.min_date + 'T00:00:00.000Z').format(
          'YYYY-MM-DD HH:mm:ss'
        ),
        $lte: dayjs(filter.max_date + 'T23:59:59.999Z').format(
          'YYYY-MM-DD HH:mm:ss'
        ),
      },
    })
      .populate('chauffeur')
      .populate('camion')
      .populate('fournisseur')
      .populate('listProducts.product')

    res.send(livraisons)
  } catch (error) {
    console.log(error)
  }
})

router.put('/', async (req, res) => {
  try {
    const { id, entree, sortie } = req.body
    const livraison = await Livraison.findById(id)
    livraison.entree = entree ? entree : livraison.entree
    livraison.sortie = sortie ? sortie : livraison.sortie
    livraison
      .save()
      .then((savedLivraison) => {
        res.send(savedLivraison)
      })
      .catch((error) => {
        res.status(500).send(error)
      })
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
