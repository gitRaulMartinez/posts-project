// const app = require('express')()
const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()
require('./middlewares/auth')

const { dbConnection } = require('./database/config')
const routerIndex = require('./routes')
const routerAuth = require('./routes/auth')
const { routerDev } = require('./routes/db')
const { routerPosts } = require('./routes/posts')
const passport = require('passport')
const isAuthenticated = require('./middlewares/is-authenticate')
const path = require('path');

// Inicializo la aplicación de express
const app = express()

// Conectar a la DB
dbConnection()

// Template Engine
app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_LOCAL_URI })
}))

app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    res.locals.user = (req.user) ? true : false
    res.locals.name = (req.user) ? req.user.name : ''
    res.locals.last = (req.user) ? req.user.last : ''
    res.locals.email = (req.user) ? req.user.email : ''
    next()
})


// Routes
app.use('/', routerIndex)
app.use('/auth', routerAuth)
app.use('/posts', isAuthenticated, routerPosts)
app.use('/', routerDev) // Solo para desarrollo




const PORT = process.env.PORT
app.listen(PORT, err => {
    if ( err ) throw new Error('Ocurrió un problema con el servidor: ', err)
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

