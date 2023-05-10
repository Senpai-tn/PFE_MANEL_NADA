const express = require('express')
const app = express()
app.use(express.json())

//1ere méthode
function success() {
  console.log('application running successfully enjoy!')
}

//2eme méthode fonction flèche // arrow function
;(x, y, z) => {
  console.log('application running successfully enjoy!')
}

//3eme méthode
const myFunction = () => {
  console.log('application running successfully enjoy!')
}

// / ===> http://localhost:3210
// 1st route
app.get('/', (request, response) => {
  response.send('Hello From My first express project')
})
//http://localhost:3210/a
// 2nd route
app.get('/a', (request, response) => {
  response.send('Hello From My Second Route from express')
})

//with params
app.get('/:nom', (request, response) => {
  response.send(
    'Hello ' +
      request.params.age +
      ' From My Second Route from express ' +
      request.params.nom +
      '  ' +
      request.query.prenom
  )
})

app.post('/:age', (request, response) => {
  response.send(
    'Response from post request ' + request.params.age + ' ' + request.body.nom
  )
})

app.put('/:age', (request, response) => {
  response.send(
    'Response from put request ' + request.params.age + ' ' + request.body.nom
  )
})

app.patch('/:age', (request, response) => {
  response.send(
    'Response from patch request ' + request.params.age + ' ' + request.body.nom
  )
})

app.delete('/:age', (request, response) => {
  response.send(
    'Response from delete request ' +
      request.params.age +
      ' ' +
      request.body.nom
  )
})

app.get('/calc/:x', (request, response) => {
  response.send(
    'x + y = ' + (parseInt(request.params.x) + parseInt(request.query.y))
  )
})

app.post('/calc/:x', (request, response) => {
  response.send('x - y = ' + (request.params.x - request.body.y))
})

app.put('/calc/:x', (request, response) => {
  response.send('x * y = ' + request.params.x * request.body.y)
})

app.delete('/calc/:x', (request, response) => {
  response.send('x / y = ' + Math.round(request.params.x / request.body.y))
})

app.listen(3211, myFunction()) //callback

// callback
// await
// promise
