const express = require('express')

const routerPosts = express.Router()

const { getPosts, showPost, deletePost, createPost, newPost, editPost, showFormEditPost } = require('../controllers/posts')


// Rutas de INDEX
routerPosts.get('/posts/new', newPost)
routerPosts.get('/posts/edit/:id', showFormEditPost)
routerPosts.get('/posts', getPosts)
routerPosts.get('/posts/:slug', showPost)

routerPosts.post('/posts', createPost)

routerPosts.put('/posts/:id', editPost)

routerPosts.delete('/posts/:id', deletePost)


module.exports = {
    routerPosts
}