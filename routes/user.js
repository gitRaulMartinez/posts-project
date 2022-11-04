const express = require('express')
const { pageProfile, pageEditProfile, editUser } = require('../controllers/user')

const { uploadProfile } = require('../config/multer')

const routerUsers = express.Router()

routerUsers.get('/:profile', pageProfile)
routerUsers.get('/edit/:id', pageEditProfile)

routerUsers.put('/:id', uploadProfile.single('image'), editUser)

module.exports = {
    routerUsers
}
