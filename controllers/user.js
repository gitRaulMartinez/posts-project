const User = require('../models/user')

const { controlName, controlLast, controlProfile } = require("../services/form");


const editUser = async (req, res) => {
    try {
        let errors = []
        const { name, last, profile, _id} = req.body
        
        const errorName = controlName(name)
        if(errorName) errors.push(errorName)

        const errorLast = controlLast(last)
        if(errorLast) errors.push(errorLast)

        const errorProfile = await controlProfile(profile, _id)
        if(errorProfile) errors.push(errorProfile)

        if(!errors.length){
            res.json({
                data: { message: "Perfil editado con exito"}
            });
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
        res.render('')
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
