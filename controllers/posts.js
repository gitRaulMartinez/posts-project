const Post = require('../models/posts')
const { controlTitle, controlBody, controlUrl } = require('../services/form')

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({createdAt: 'desc'}).limit(10).populate('user').lean()
        const postsModify = posts.map(element => {
            if(element.user.url.includes('https://loremflickr.com')) element.user.urlCat = true
            else element.user.urlCat = false
            if(element.user._id.toString() == req.user._id.toString()) element.user.me = true
            else element.user.me = false
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
        const posts = await Post.find({user: req.user._id}).sort({createdAt: 'desc'}).populate('user').limit(10).lean()
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
        if(post.user.url.includes('https://loremflickr.com')) post.user.urlCat = true
        else post.user.urlCat = false
        post.createdAt = new Date(post.createdAt).toLocaleString('es-AR')
        post.updatedAt = new Date(post.updatedAt).toLocaleString('es-AR')
        if(post.createdAt == post.updatedAt) post.updatedAt = false
        console.log(post)
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
        await Post.findByIdAndDelete(req.params.id).lean()
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

        const errorUrl = controlUrl(url)
        if(errorUrl) errors.push(errorUrl)

        if(!errors.length){
            const newPost = new Post({title,body,slug:url,user:req.user._id}) 
            console.log(newPost)    
            await newPost.save()
            res.json({
                data: { message: "Post creado con exito"}
            });
        }
        else{
            res.json({ data: errors })
        }
    } catch (error) {
        console.log(error)
    }
}

const showFormEditPost = async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        res.render('edit',post)        
    } catch (error) {
        console.log(error)
    }
}

const editPost = async(req, res) =>{
    try {
        console.log(req.body)
        let errors = []
        const {title, body, url, _id, user} = req.body

        const errorTitle = controlTitle(title)
        if(errorTitle) errors.push(errorTitle)

        const errorBody = controlBody(body)
        if(errorBody) errors.push(errorBody)

        const errorUrl = controlUrl(url)
        if(errorUrl) errors.push(errorUrl)

        if(!errors.length){
            if(req.user._id.toString() == user){
                await Post.updateOne({ user: user}, {title,body,url})
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
