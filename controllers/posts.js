const Post = require('../models/posts')
const User = require('../models/user')
const { controlTitle, controlBody, controlUrl } = require('../services/form')
const deleteImage = require('../services/file')
const { findById } = require('../models/user')

const getPosts = async (req, res) => {
    try {
        const list = await User.findById(req.user._id.toString()).lean()
        if(list.following) list.following = list.following.map(e => e.toString())
        const posts = await Post.find({}).sort({createdAt: 'desc'}).populate('user').lean()
        const postsModify = posts.map(element => {
            if(element.user.url.includes('https://images.pexels')) element.user.urlCat = true
            else element.user.urlCat = false
            if(element.user._id.toString() == req.user._id.toString()) element.user.me = true
            else element.user.me = false
            if(list.following && list.following.indexOf(element.user._id.toString()) != -1) element.follow = true
            else element.follow = false
            return element
        })
        const title = "Listado de Post"
        res.status(200).render('posts',
            {
                title,
                posts: postsModify
            }
        )
    } catch (error) {
        console.log(error)
    }
}

const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({user: req.user._id}).sort({createdAt: 'desc'}).populate('user').lean()
        const title = "Mis posts"
        res.status(200).render('my-posts',
            {
                title,
                posts: posts
            }
        )
    } catch (error) {
        console.log(error)
    }
}

const showPost = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate('user').lean()
        if(post.user.url.includes('https://images.pexels')) post.user.urlCat = true
        else post.user.urlCat = false
        post.createdAt = new Date(post.createdAt).toLocaleString('es-AR')
        post.updatedAt = new Date(post.updatedAt).toLocaleString('es-AR')
        if(post.createdAt == post.updatedAt) post.updatedAt = false
        if(post){
            res.render('show',{
                title: 'InfoBlog - ' + post.title,
                post
            })
        }
        else{
            res.redirect('/')
        }
        
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id).lean()
        if(post.image) deleteImage('posts',post.image)
        res.json({ message: 'Post eliminado '})
        
    } catch (error) {
        console.log(error)

    }
}

const newPost = async(req, res) =>{
    try {
        res.render('new')
        
    } catch (error) {
        console.log(error)
    }
}

const createPost = async(req, res) =>{
    try {
        let errors = []
        const {title, body, url} = req.body

        const errorTitle = controlTitle(title)
        if(errorTitle) errors.push(errorTitle)

        const errorBody = controlBody(body)
        if(errorBody) errors.push(errorBody)

        const errorUrl = await controlUrl(url, '1010101010')
        if(errorUrl) errors.push(errorUrl)

        if(!errors.length){
            let newPost
            if(req.file) newPost = new Post({title,body,slug:url,user:req.user._id,image: req.file.filename}) 
            else newPost = new Post({title,body,slug:url,user:req.user._id})  
            await newPost.save()
            res.json({
                data: { message: "Post creado con exito"}
            });
        }
        else{
            if(req.file) deleteImage('posts',req.file.filename)
            res.json({ data: errors })
        }
    } catch (error) {
        console.log(error)
    }
}

const showFormEditPost = async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id).lean()
        res.render('edit',post)        
    } catch (error) {
        console.log(error)
    }
}

const editPost = async(req, res) =>{
    try {
        let errors = []
        const {title, body, url, _id, user} = req.body

        const errorTitle = controlTitle(title)
        if(errorTitle) errors.push(errorTitle)

        const errorBody = controlBody(body)
        if(errorBody) errors.push(errorBody)

        const errorUrl = await controlUrl(url, _id)
        if(errorUrl) errors.push(errorUrl)

        if(!errors.length){
            if(req.user._id.toString() == user){
                const post = await Post.findById(_id)
                if(req.file){
                    if(post.image){
                        deleteImage('posts',post.image)
                    }
                    await Post.updateOne({_id},{image:req.file.filename})
                }   
                else{
                    if(post.image){ 
                        deleteImage('posts',post.image)
                        await Post.updateOne({_id},{image:null})
                    }
                }
                if(post.slug == url) await Post.updateOne({_id}, {title,body})
                else await Post.updateOne({_id}, {title,body,slug: url})
                res.json({
                    data: { message: "Modificado con exito"}
                })
            }
            else{
                res.json({
                    data: { message: "No authorizado"}
                })
            }
        }
        else{
            if(req.file) deleteImage('posts',req.file.filename)
            res.json({ data: errors })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPosts,
    showPost,
    deletePost,
    newPost,
    createPost,
    showFormEditPost,
    editPost,
    getMyPosts
}
