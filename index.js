const express = require('express')
const bodyParser = require('body-parser')
const {listUsers, createUser, updateUser, deleteUser, deleteAllUsers} = require('./controllers/User.js')

const app = express()

app.use(bodyParser.json())

app.get('/users', listUsers)

app.post('/users', createUser)

app.put('/users/:username', updateUser)

app.delete('/users/:username', deleteUser)

app.delete('/users', deleteAllUsers)

app.listen(8081)
