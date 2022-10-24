const express = require('express')
const { login, iniciarSesion } = require('../controllers/auth')

const routerAuth = express.Router()

routerAuth.get('/login', login)

routerAuth.post('/login', iniciarSesion)

module.exports = routerAuth