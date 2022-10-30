const express = require('express')
const routerIndex = express.Router()

const { getRootController, getImageProfile } = require('../controllers')

// Rutas de INDEX
routerIndex.get('/', getRootController)

module.exports = routerIndex
