const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/User.js')

const app = express()

app.use(bodyParser.json())

app.get('/users', function (req, res) {
  let conditions = {}
  if (req.query.country) {
    conditions = {
      where: {
        country: req.query.country
      }
    }
  }

  User.findAll(conditions).then(users => {
    res.set('Content-Type', 'application/json')
    res.send(users)
  })
})

app.post('/users', function (req, res) {
  res.set('Content-Type', 'application/json')

  User.build({
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName,
    birthDate: req.body.birthDate,
    country: req.body.country
  })
    .validate()
    .then(user => user.save())
    .then(() => res.sendStatus(201))
    .catch(error => {
      let httpCode = error.name === 'SequelizeValidationError' ? 422 : 500
      res.status(httpCode).send(error)
    })
})

app.put('/users/:username', function (req, res) {
  let username = req.params.username

  User
    .findById(username)
    .then((user) => user.update({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      birthDate: req.body.birthDate,
      country: req.body.country
    }, {})
    )
    .then(() => res.sendStatus(200))
    .catch(error => {
      let httpCode = error.name === 'SequelizeValidationError' ? 422 : 500
      res.status(httpCode).send(error)
    })
})

app.delete('/users/:username', function (req, res) {
  let username = req.params.username

  User
    .findById(username)
    .then(user => user.destroy())
    .then(() => {
      res.sendStatus(204)
    })
    .catch(error => {
      let httpCode = error.name === 'SequelizeValidationError' ? 422 : 500
      res.status(httpCode).send(error)
    })
})

app.delete('/users', function (req, res) {
  User
    .destroy({where: {}})
    .then(() => {
      res.sendStatus(204)
    })
    .catch(error => {
      let httpCode = error.name === 'SequelizeValidationError' ? 422 : 500
      res.status(httpCode).send(error)
    })
})

app.listen(8081)
