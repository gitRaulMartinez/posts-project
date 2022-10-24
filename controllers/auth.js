const login = (req,res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
    }
}

const iniciarSesion = (req,res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login,
    iniciarSesion
}