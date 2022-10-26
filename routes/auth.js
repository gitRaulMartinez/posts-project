const express = require('express')
const passport = require('passport');
const { pageLogin, signup, login } = require('../controllers/auth')

const routerAuth = express.Router()

routerAuth.get('/login', pageLogin)

routerAuth.post('/signup', passport.authenticate('signup',{session:false}),signup)
routerAuth.post('/login', login)

module.exports = routerAuth
