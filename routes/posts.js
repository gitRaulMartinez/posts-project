const express = require('express')

const routerPosts = express.Router()

const { getPosts, showPost, deletePost, createPost, newPost, editPost, showFormEditPost, getMyPosts } = require('../controllers/posts')


// Rutas de INDEX
routerPosts.get('/new', newPost)
routerPosts.get('/my-posts', getMyPosts)
routerPosts.get('/edit/:id', showFormEditPost)
routerPosts.get('', getPosts)
routerPosts.get('/:slug', showPost)


routerPosts.post('/create', createPost)

routerPosts.put('/:id', editPost)

routerPosts.delete('/:id', deletePost)


module.exports = {
    routerPosts
}
