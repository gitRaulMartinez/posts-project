const multer = require("multer")
const sum = require("hash-sum")
const storageProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/profile")
    },
    filename: async function (req, file, cb) {
        const uniqueSuffix = sum(Math.random() * 1e6)+sum(Math.random() * 1e6)+sum(Math.random() * 1e6)
        const list = file.originalname.split('.')
        cb(null, uniqueSuffix+'.'+list[list.length-1])
    },
})

const storagePosts = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/posts")
    },
    filename: async function (req, file, cb) {
        const uniqueSuffix = sum(Math.random() * 1e6)+sum(Math.random() * 1e6)+sum(Math.random() * 1e6)
        const list = file.originalname.split('.')
        cb(null, uniqueSuffix+'.'+list[list.length-1])
    },
})

const uploadProfile = multer({ storage: storageProfile })
const uploadPosts = multer({ storage: storagePosts })

module.exports = {
    uploadProfile,
    uploadPosts
}
