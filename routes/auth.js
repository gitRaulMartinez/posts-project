const express = require('express')
const passport = require('passport');
const { pageSignup, signup, pageSignin, login, logout } = require('../controllers/auth')

const routerAuth = express.Router()

routerAuth.get('/signin', pageSignin)
routerAuth.get('/signup', pageSignup)

routerAuth.post('/signup', signup)
routerAuth.post('/login', login)
routerAuth.post('/logout', logout)

module.exports = routerAuth
