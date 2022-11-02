const express = require('express')
const { pageProfile, pageEditProfile, editUser } = require('../controllers/user')

const routerUsers = express.Router()

routerUsers.get('/:id', pageProfile)
routerUsers.get('/edit/:id', pageEditProfile)

routerUsers.put('/:id', editUser)



module.exports = {
    routerUsers
}
