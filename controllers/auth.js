require("dotenv").config();
const jwtsecret = process.env.JWT_SECRET
const passport = require('passport')

const pageLogin = (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
    }
}

const signup = (req, res) => {
    try {
        res.json({
            message: "Signup successful",
            user: req.user,
        });
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if(err){
                const error = new Error("An error occurred.")
                return next(error)
            }
            if (!user) {
                return res.json(info.message)
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)

                const body = { _id: user._id, email: user.email }
                const token = jwt.sign({ user: body }, jwtsecret)

                return res.json({ token })
            })
        } catch (error) {
            return next(error)
        }
    })(req, res, next)
}

module.exports = {
    pageLogin,
    signup,
    login,
};
