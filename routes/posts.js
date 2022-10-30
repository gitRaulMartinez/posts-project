const express = require('express')

const routerPosts = express.Router()

const { getPosts, showPost, deletePost, createPost, newPost, editPost, showFormEditPost } = require('../controllers/posts')


// Rutas de INDEX
routerPosts.get('/new', newPost)
routerPosts.get('/edit/:id', showFormEditPost)
routerPosts.get('', getPosts)
routerPosts.get('/:slug', showPost)

routerPosts.post('', createPost)

routerPosts.put('/:id', editPost)

routerPosts.delete('/:id', deletePost)


module.exports = {
    routerPosts
}
