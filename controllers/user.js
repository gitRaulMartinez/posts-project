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
        const mylist = await User.findOne({_id: req.user._id.toString()}).lean()
        if(mylist.following) mylist.following = mylist.following.map(e => e.toString())
        const posts = await Post.find({user: user._id}).sort({createdAt: 'desc'}).lean()
        if(user.url.includes('https://images.pexels')) user.urlCat = true
        else user.urlCat = false
        if(user._id.toString() == req.user._id.toString()) user.notme = false
        else user.notme = true
        if(mylist.following && mylist.following.indexOf(user._id.toString()) != -1) user.follow = true
        else user.follow = false

        const listFollow = await User.find({following: user._id.toString()})
        if(listFollow) user.follows = listFollow.length
        else user.follows = 0
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

const followUser = async (req, res) => {
    try {
        const _id = req.body._id
        if(_id == req.user._id.toString()){
            return res.json({
                error: true,
                message: 'No te puedes seguir a ti mismo'
            })
        }
        const me = await User.findById(req.user._id.toString())
        let p = -1
        if(me.following){ 
            p = me.following.indexOf(_id)
        }
        if(p == -1){
            await User.updateOne({_id: req.user._id.toString()},{$push: {following: _id}})
            return res.json({
                error: false,
                message: 'ok'
            })
        }
        else{
            return res.json({
                error: true,
                message: 'modal'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const unFollowUser = async (req, res) => {
    try {
        const _id = req.body._id
        await User.updateOne({_id: req.user._id.toString()},{$pull: {following: _id}})
        res.json('Okey')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    editUser,
    pageProfile,
    pageEditProfile,
    followUser,
    unFollowUser
}
