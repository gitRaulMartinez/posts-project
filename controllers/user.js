const User = require('../models/user')
const Post = require('../models/posts')
const deleteImage = require('../services/file')

const { controlName, controlLast, controlProfile } = require("../services/form")


const editUser = async (req, res) => {
    try {
        let errors = []
        const { name, last, profile, _id} = req.body

        const user = await User.findById(_id)

        const errorName = controlName(name)
        if(errorName) errors.push(errorName)

        const errorLast = controlLast(last)
        if(errorLast) errors.push(errorLast)

        const errorProfile = await controlProfile(profile, _id)
        if(errorProfile) errors.push(errorProfile)

        if(!errors.length){
            if(req.file){
                if(user.url != 'usuario.png'){
                    deleteImage('profile',user.url)
                }
                await User.updateOne({_id},{url: req.file.filename})
            }
            if(user.profile == profile) await User.updateOne({_id}, {name, last})
            else await User.updateOne({_id}, {name, last, profile})
            res.json({
                data: { message: "Perfil editado con exito"}
            })
        }
        else{
            res.json({ data: errors })
        }
    } catch (error) {
        console.log(error)
    }
}

const pageProfile = async (req, res) => {
    try {
        const user = await User.findOne({profile: req.params.profile}).lean()
        const posts = await Post.find({user: user._id}).sort({createdAt: 'desc'}).lean()
        if(user.url.includes('https://images.pexels')) user.urlCat = true
        else user.urlCat = false
        posts.forEach(element => {
            element.userName = user.name
            element.userLast = user.last
            element.userUrl = user.url
            element.urlCat = user.urlCat
        });
        res.render('profile/profile',{
            title: user.name,
            user,
            posts
        })
    } catch (error) {
        console.log(error)
    }
}

const pageEditProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const title = 'Editar perfil'
        user._id = user._id.toString()
        res.render('profile/edit',user)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    editUser,
    pageProfile,
    pageEditProfile
}
