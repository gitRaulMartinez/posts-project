const passport = require("passport")
const passportJWT = require("passport-jwt")
const user = require("../models/user")

const ExtractJWT = passportJWT.ExtractJwt

const localStrategy = require("passport-local").Strategy
const JWTStrategy = passportJWT.Strategy

const User = require("../models/user")

require('dotenv').config()

passport.use(
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                console.log(user)
                if (!user) {
                    return done(null, false, { message: "El usuario no existe"})
                }

                const validate = await user.isValidPassword(password)
                if (!validate) {
                    return done(null, false, { message: "La contraseña no es la correcta" })
                }

                return done(null, user, { message: "Logged in Successfully" })
            } catch (error) {
                return done(error)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    user.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        async function (jwtPayload, done) {
            try {
                console.log(jwtPayload)
                return await User.findById(jwtPayload.id)
            } catch (error) {
                return done(error)
            }
        }
    )
)
