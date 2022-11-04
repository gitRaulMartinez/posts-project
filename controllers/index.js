const { response } = require('express')
const { statusModel } = require("../models")

const getRootController = (req, res = response) => {
    return res.render('index')
}

module.exports = {
    getRootController
}
