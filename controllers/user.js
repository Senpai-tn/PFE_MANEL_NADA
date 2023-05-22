const express = require('express')
const { User } = require('../models')
const dayjs = require('dayjs')
const mongoose = require('mongoose')
const router = express.Router()

//ajouter user
router.post('/', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    tel,
    cin,
    role,
    matricule,
    listeCamions,
    listeChauffeurs,
    categorie,
    adresse,
    listeCommandes,
  } = req.body

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    tel,
    cin,
    role,
  })
  if (role === 'FOURNISSEUR') {
    user.listeCamions && (user.listeCamions = listeCamions)
    user.listeChauffeurs && (user.listeChauffeurs = listeChauffeurs)
    user.categorie = categorie
    user.adresse = adresse
    user.listeCommandes = undefined
    user.matricule = undefined
  } else if (role === 'PLANIFICATEUR') {
    user.listeCommandes = listeCommandes
    user.matricule = matricule
    user.listeChauffeurs = undefined
    user.listeCamions = undefined
    user.categorie = undefined
    user.adresse = undefined
  } else {
    user.listeCommandes = undefined
    user.listeChauffeurs = undefined
    user.listeCamions = undefined
    user.categorie = undefined
    user.adresse = undefined
    user.matricule = undefined
  }

  await user
    .save()

    .then(async (savedUser) => {
      const clone = await User.findById(savedUser._id)
        .populate('listeCamions')
        .populate('listeChauffeurs')
        .populate('listeCommandes')
      res.status(200).send(clone)
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

//login
router.get('/', async (req, res) => {
  const { email, password } = req.query
  const user = await User.findOne({ email: email })
    .populate('listeCamions')
    .populate('listeChauffeurs')
    .populate('listeCommandes')
  if (user !== null) {
    if (user.password === password) {
      if (user.deletedAt === null) {
        if (dayjs(user.blocked) < dayjs() || user.blocked === null) {
          res.status(200).send(user)
        } else res.status(401).send('user blocked')
      } else res.status(402).send('user deleted')
    } else res.status(403).send('password error')
  } else res.status(404).send('not found')
})

//modifier + supprimer + bloquer
router.put('/', async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      email,
      password,
      tel,
      cin,
      deletedAt,
      blocked,
      listeCamions,
      listeChauffeurs,
      categorie,
      adresse,
      listeCommandes,
    } = req.body
    const user = await User.findById(id)
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.email = email || user.email
    user.password = password || user.password
    user.tel = tel || user.tel
    user.cin = cin || user.cin
    user.deletedAt = deletedAt || user.deletedAt
    user.blocked = blocked || user.blocked
    if (user.role === 'FOURNISSEUR') {
      user.listeCamions &&
        (user.listeCamions = listeCamions || user.listeCamions)
      user.listeChauffeurs &&
        (user.listeChauffeurs = listeChauffeurs || user.listeChauffeurs)
      user.categorie = categorie || user.categorie
      user.adresse = adresse || user.adresse
      user.listeCommandes = undefined
    } else if (user.role === 'PLANIFICATEUR') {
      user.listeCommandes = listeCommandes || user.listeCommandes
      user.listeChauffeurs = undefined
      user.listeCamions = undefined
      user.categorie = undefined
      user.adresse = undefined
    } else {
      user.listeCommandes = undefined
      user.listeChauffeurs = undefined
      user.listeCamions = undefined
      user.categorie = undefined
      user.adresse = undefined
    }
    await user
      .save()
      .then(async (savedUser) => {
        const clone = await User.findById(savedUser._id)
          .populate('listeChauffeurs')
          .populate('listeCamions')
        res.status(200).send(clone)
      })
      .catch((error) => {
        res.status(500).send(error.message)
      })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/search', async (req, res) => {
  const users = await User.find({ ...req.query, deletedAt: null })
    .populate('listeCamions')
    .populate('listeChauffeurs')
    .populate('listeCommandes')
  res.send(users)
})

module.exports = router
