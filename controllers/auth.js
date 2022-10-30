const passport = require('passport')
const User = require('../models/user')
const jwt = require('jsonwebtoken');

require("dotenv").config();
const jwtsecret = process.env.JWT_SECRET

const { controlName, controlLast, controlEmail, controlPassword, controlConfirmPassword } = require("../services/form");

const pageSignin = (req, res) => {
    try {
        res.render("auth/signin");
    } catch (error) {
        console.log(error);
    }
}

const pageSignup = (req, res) => {
    try {
        res.render("auth/signup");
    } catch (error) {
        console.log(error);
    }
}

const signup = async (req, res) => {
    try {
        let errors = []
        const { name, last, email, password, confirmPassword } = req.body
        
        const errorName = controlName(name)
        if(errorName) errors.push(errorName)

        const errorLast = controlLast(last)
        if(errorLast) errors.push(errorLast)

        const errorEmail = await controlEmail(email)
        if(errorEmail) errors.push(errorEmail)

        const errorPassword = controlPassword(password)
        if(errorPassword) errors.push(errorPassword)

        const errorConfirmPassword = controlConfirmPassword(password,confirmPassword)
        if(errorConfirmPassword) errors.push(errorConfirmPassword)

        if(!errors.length){
            const newUser = new User({ name, last, email, password})     
            await newUser.save()
            res.json({
                data: { message: "Cuenta creada con exito"}
            });
        }
        else{
            res.json({ data: errors })
        }
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(202).json({
                    message: info ? info.message : 'Fallo logueo',
                    user   : user
                });
            }
            req.login(user, { session: true }, async (error) => {
                if (error) res.send(error)

                const body = { _id: user._id, email: user.email }
                const token = jwt.sign({ user: body }, jwtsecret)

                return res.json({login: true})
            })
        } catch (error) {
            return res.send(error)
        }
    })(req, res)
}

const logout = async (req, res, next) => {
    await req.logout((err) => {
        if( err ) return next()
        res.redirect('/auth/signin')
    })
}

module.exports = {
    pageSignin,
    pageSignup,
    signup,
    login,
    logout
};
