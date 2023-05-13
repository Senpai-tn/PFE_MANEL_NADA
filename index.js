// const express = require('express')
// const { connect } = require('mongoose')
// const User = require('./models/user')

// connect('mongodb://127.0.0.1:27017/PFE_MANEL_NADA')
//   .then(success())
//   .catch((error) => {
//     console.log(error.message)
//   })

// const app = express()
// app.use(express.json())

// //1ere méthode
// function success() {
//   console.log('connected to DataBase')
// }

// //2eme méthode fonction flèche // arrow function
// ;(x, y, z) => {
//   console.log('application running successfully enjoy!')
// }

// //3eme méthode
// const myFunction = () => {
//   console.log('application running successfully enjoy!')
// }

// // / ===> http://localhost:3210
// // 1st route
// app.get('/', (request, response) => {
//   response.send('Hello From My first express project')
// })
// //http://localhost:3210/a
// // 2nd route
// app.get('/a', (request, response) => {
//   response.send('Hello From My Second Route from express')
// })

// //insertion dans la BD ===> Create
// app.post('/mongo', async (request, response) => {
//   const { name, email, password, tel } = request.body
//   const user = new User({
//     name,
//     email,
//     password,
//     tel,
//   })

//   await user
//     .save()
//     .then((userSaved) => {
//       response.send(userSaved)
//     })
//     .catch((error) => {
//       response.send(error.message)
//     })
// })

// //getById les documents de la collection ===> Read
// app.get('/mongo', async (request, response) => {
//   try {
//     const user = await User.findById(request.query.id)
//     response.send(user)
//   } catch (error) {
//     response.send(error.message)
//   }
// })

// //lister ===> Read
// app.get('/all', async (request, response) => {
//   try {
//     const users = await User.find()
//     response.send(users)
//   } catch (error) {
//     response.send(error.message)
//   }
// })

// //get One ===> Read
// app.get('/one', async (request, response) => {
//   try {
//     const users = await User.findOne()
//     response.send(users)
//   } catch (error) {
//     response.send(error.message)
//   }
// })

// //update ===> Update
// app.put('/mongo', async (request, response) => {
//   const { email, id, password, name } = request.body
//   const user = await User.findById(id)
//   user.email = email
//   user.password = password
//   user.name = name
//   await user
//     .save()
//     .then((userSaved) => {
//       response.send(userSaved)
//     })
//     .catch((error) => {
//       response.send(error.message)
//     })
// })

// //delete ===> Delete
// app.delete('/mongo', async (request, response) => {
//   const { id } = request.body
//   const user = await User.findById(id)
//   user.deletedAt = new Date()
//   await user
//     .save()
//     .then((userSaved) => {
//       response.send(userSaved)
//     })
//     .catch((error) => {
//       response.send(error.message)
//     })
// })

// //with params
// app.get('/:nom', (request, response) => {
//   response.send(
//     'Hello ' +
//       request.params.age +
//       ' From My Second Route from express ' +
//       request.params.nom +
//       '  ' +
//       request.query.prenom
//   )
// })

// app.post('/:age', (request, response) => {
//   response.send(
//     'Response from post request ' + request.params.age + ' ' + request.body.nom
//   )
// })

// app.put('/:age', (request, response) => {
//   response.send(
//     'Response from put request ' + request.params.age + ' ' + request.body.nom
//   )
// })

// app.patch('/:age', (request, response) => {
//   response.send(
//     'Response from patch request ' + request.params.age + ' ' + request.body.nom
//   )
// })

// app.delete('/:age', (request, response) => {
//   response.send(
//     'Response from delete request ' +
//       request.params.age +
//       ' ' +
//       request.body.nom
//   )
// })

// app.get('/calc/:x', (request, response) => {
//   response.send(
//     'x + y = ' + (parseInt(request.params.x) + parseInt(request.query.y))
//   )
// })

// app.post('/calc/:x', (request, response) => {
//   response.send('x - y = ' + (request.params.x - request.body.y))
// })

// app.put('/calc/:x', (request, response) => {
//   response.send('x * y = ' + request.params.x * request.body.y)
// })

// app.delete('/calc/:x', (request, response) => {
//   response.send('x / y = ' + Math.round(request.params.x / request.body.y))
// })

// app.listen(3210, myFunction()) //callback

const express = require('express')
const { connect } = require('mongoose')
const userRouter = require('./controllers/user')
const truckRouter = require('./controllers/truck')
const app = express()
const port = 3120
app.use(express.json())
app.use('/user', userRouter)
app.use('/truck', truckRouter)

connect('mongodb://127.0.0.1:27017/PFE_MANEL_NADA', {})
  .then(() => {
    console.log('Connected to DB')
  })
  .catch((error) => {
    console.log(error.message)
  })

app.listen(port, () => {
  console.log(`Application running on ${port}`)
})
