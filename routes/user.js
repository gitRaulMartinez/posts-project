const express = require('express')
const { pageProfile, pageEditProfile, editUser, followUser, unFollowUser} = require('../controllers/user')

const { uploadProfile } = require('../config/multer')

const routerUsers = express.Router()

routerUsers.get('/:profile', pageProfile)
routerUsers.get('/edit/:id', pageEditProfile)

routerUsers.post('/follow', followUser)
routerUsers.post('/stop-following', unFollowUser)

routerUsers.put('/:id', uploadProfile.single('image'), editUser)

module.exports = {
    routerUsers
}
