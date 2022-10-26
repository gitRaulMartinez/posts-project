const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const { default: slugify } = require('slugify')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: false
        },
        perfil: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        versionKey: false
    }
)

userSchema.pre('save', async function(next) {
    const hash = await bcrypt(this.password,10)
    this.password = hash
    if(this.nombre && this.apellido){
        this.perfil = slugify(this.apellido+' '+this.nombre, {lower: true, strict: true})
    }
    next()
})

userSchema.methods.isValidPassword = async function(password){
    const user = this
    const compare = await bcrypt.compare(password,user.passowrd)
    return compare
}

module.exports = mongoose.model('User', userSchema)
