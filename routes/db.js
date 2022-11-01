const express = require('express')
const routerDev = express.Router()

const Post = require('../models/posts')

const { generatePost, generateUser } = require('../helpers/posts')
const User = require('../models/user')


routerDev.get('/db/fresh', async (req, res = express.response) => {
    
    try {
        const imageUrlCat = [
            'https://loremflickr.com/cache/resized/3928_15241998629_b03c643cc2_c_640_480_nofilter.jpg',
            'https://loremflickr.com/cache/resized/65535_52215291688_0ed4f046ab_h_640_480_nofilter.jpg',
            'https://loremflickr.com/cache/resized/65535_52020037310_c116240933_c_640_480_nofilter.jpg',
            'https://loremflickr.com/cache/resized/65535_52142604763_e3cea1a373_c_640_480_nofilter.jpg',
            'https://loremflickr.com/cache/resized/65535_52050113899_d1ecd906bb_h_640_480_nofilter.jpg',
            'https://loremflickr.com/cache/resized/65535_52077525101_8dec3dbbda_b_640_480_nofilter.jpg',
            'https://loremflickr.com/cache/resized/2038_2234513436_1661329bb8_b_640_480_nofilter.jpg',
            'https://loremflickr.com/cache/resized/65535_51959446630_379b84d27e_z_640_480_nofilter.jpg',
            'https://loremflickr.com/cache/resized/65535_49901273127_55041137d0_c_640_480_nofilter.jpg',
            'https://loremflickr.com/cache/resized/65535_52006574844_d31384e02b_c_640_480_nofilter.jpg',
            'https://loremflickr.com/cache/resized/3717_9446155333_777beac97e_c_640_480_nofilter.jpg'
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
