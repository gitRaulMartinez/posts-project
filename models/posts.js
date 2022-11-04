const mongoose = require('mongoose')
const { default: slugify } = require('slugify')
const User = require('../models/user')

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            required: false
        }
    },
    {  
        timestamps: true,
        versionKey: false
    }
)

// Middleware .pre()
// TODO: Llevar este middleware a un archivo separado


postSchema.pre('validate', function(next) {
    if(!this.slug) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    next()
})

module.exports = mongoose.model('Post', postSchema)
