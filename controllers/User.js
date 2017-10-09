const User = require('../models/User.js')

function listUsers (req, res) {
  'use strict'
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
}

function createUser (req, res) {
  'use strict'
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
          res.set('Content-Type', 'application/json').status(httpCode).send(error)
        })
}

function updateUser (req, res) {
  'use strict'
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
}

function deleteUser (req, res) {
  'use strict'
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
}

function deleteAllUsers (req, res) {
  'use strict'
  User
        .destroy({where: {}})
        .then(() => {
          res.sendStatus(204)
        })
        .catch(error => {
          let httpCode = error.name === 'SequelizeValidationError' ? 422 : 500
          res.status(httpCode).send(error)
        })
}

module.exports = {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers
}
