const express = require('express')
const routerDev = express.Router()

const Post = require('../models/posts')

const { generatePost, generateUser } = require('../helpers/posts')
const User = require('../models/user')


routerDev.get('/db/fresh', async (req, res = express.response) => {
    
    try {
        const imageUrlCat = [
            'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/356147/pexels-photo-356147.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/14133517/pexels-photo-14133517.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/7652300/pexels-photo-7652300.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/3428290/pexels-photo-3428290.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/13365795/pexels-photo-13365795.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/8280050/pexels-photo-8280050.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]

        const imageMoreCat = [
            'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]

        const posts = await Post.deleteMany()
        const users = await User.deleteMany()

        for(let i=0; i< 10; i++){
            const newUser = generateUser()
            newUser.url = imageUrlCat[i]
            await newUser.save()

            for(let j=0; j< i+1;j++){
                const nuevoPost = generatePost()
                nuevoPost.user = newUser._id
                const post = new Post(nuevoPost)
                await post.save()
            }
        }   

        const lista = await Post.find().limit(10).populate('user')
        console.log(lista)
        res.send('Todo OK')

    } catch (error) {
        console.log(error)
        res.send('Todo ERROR')
    }   

})

module.exports = {
    routerDev
}
