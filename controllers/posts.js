const Post = require('../models/posts')

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).lean()
        const title = "Listado de Post"
        res.status(200).render('index',
            {
                title,
                posts
            }
        )
    } catch (error) {
        console.log(error)
        res.status(404)
    }
}

const showPost = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).lean()
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
        res.redirect('/posts')
        
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
        let post = new Post()
        post.title = req.body.title
        post.body = req.body.post
        post = await post.save()
        res.redirect('/posts/'+post.slug)
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
        

        let post = new Post()
        post.title = req.body.title
        post.body = req.body.post
        post = await post.save()
        res.redirect('/posts/'+post.slug)
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
    editPost
}