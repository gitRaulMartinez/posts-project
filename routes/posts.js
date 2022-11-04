const express = require('express')
const { uploadPosts } = require('../config/multer')

const routerPosts = express.Router()

const { getPosts, showPost, deletePost, createPost, newPost, editPost, showFormEditPost, getMyPosts, pageFollowPost } = require('../controllers/posts')


// Rutas de INDEX
routerPosts.get('/new', newPost)
routerPosts.get('/my-posts', getMyPosts)
routerPosts.get('/post-follow', pageFollowPost)
routerPosts.get('/edit/:id', showFormEditPost)
routerPosts.get('', getPosts)
routerPosts.get('/:slug', showPost)


routerPosts.post('/create',uploadPosts.single('image'), createPost)

routerPosts.put('/:id', uploadPosts.single('image'), editPost)

routerPosts.delete('/:id', deletePost)


module.exports = {
    routerPosts
}
