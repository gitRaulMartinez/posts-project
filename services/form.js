const User = require("../models/user")
const Post = require("../models/posts")

const controlName = (name) => {
    name = name.trim()
    if(!name) return {field: 'name', message: 'Campo obligatorio'}
    if(name.length < 4) return {field: 'name', message: 'Minimo 4 caracteres'}
    if(name.length > 20) return {field: 'name',message: 'Maximo 20 caracteres'}
    const regex = /[a-zA-Z ]/
    if(!regex.test(name)) return {field: 'name',message: 'Formato no valido, solo se permiten letras y espacios'}
    return null
}

const controlLast = (last) => {
    last = last.trim()
    if(!last) return {field: 'last', message: 'Campo obligatorio'}
    if(last.length < 4) return {field: 'last', message: 'Minimo 4 caracteres'}
    if(last.length > 20) return {field: 'last',message: 'Maximo 20 caracteres'}
    const regex = /[a-zA-Z ]/
    if(!regex.test(last)) return {field: 'last',message: 'Formato no valido, solo se permiten letras y espacios'}
    return null
}

const controlEmail = async (email) => {
    email = email.trim()
    if(!email) return {field: 'email', message: 'Campo obligatorio'}
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(!regex.test(email)) return {field: 'email', message: 'Formato de correo no valido'}
    const exist = await User.findOne({ email })
    if(exist) return {field: 'email',message: 'Correo ya existente'}
    return null
}

const controlPassword = (password) => {
    if(!password) return {field: 'password', message: 'Campo obligatorio'}
    if(password.length < 6) return {field: 'password', message: 'Minimo 6 caracteres'}
    if(password.length > 40) return {field: 'password', message: 'Maximo 40 caracteres'}
    return null
}

const controlConfirmPassword = (password,confirmPassword) => {
    if(!confirmPassword) return {field: 'confirmPassword', message: 'Campo obligatorio'}
    if(password !== confirmPassword) return {field: 'confirmPassword', message: 'La contraseña es distinta'}
    return null
}

const controlTitle = (title) => {
    title = title.trim()
    if(!title) return {field: 'title', message: 'Campo obligatorio'}
    if(title.length < 6) return {field: 'title', message: 'Minimo 6 caracteres'}
    if(title.length > 20) return {field: 'title', message: 'Maximo 20 caracteres'}
    const regex = /[a-zA-Z0-9 ]/
    if(!regex.test(title)) return {field: 'title',message: 'Formato no valido, solo se permiten letras, numeros y espacios'}
    return null
}

const controlBody = (body) => {
    body = body.trim()
    if(!body) return {field: 'body', message: 'Campo obligatorio'}
    if(body.length < 6) return {field: 'body', message: 'Minimo 6 caracteres'}
    if(body.length > 500) return {field: 'body', message: 'Maximo 500 caracteres'}
    return null
}

const controlUrl = async (url, id) => {
    url = url.trim()
    if(!url) return {field: 'url', message: 'Campo obligatorio'}
    if(url.length < 6) return {field: 'url', message: 'Minimo 6 caracteres'}
    if(url.length > 100) return {field: 'url', message: 'Maximo 100 caracteres'}
    const regex = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/
    if(!regex.test(url)) return {field: 'url',message: 'Formato no valido'}
    const exist = await Post.findOne({ slug: url })
    if(exist && id != exist._id.toString()) return {field: 'url',message: 'Post url ya existente'}
    return null
}

const controlProfile = async (profile, id) => {
    profile = profile.trim()
    if(!profile) return {field: 'profile', message: 'Campo obligatorio'}
    if(profile.length < 6) return {field: 'profile', message: 'Minimo 6 caracteres'}
    if(profile.length > 100) return {field: 'profile', message: 'Maximo 100 caracteres'}
    const regex = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/
    if(!regex.test(profile)) return {field: 'profile',message: 'Formato no valido'}
    const exist = await User.findOne({ profile })
    if(exist && id != exist._id.toString()) return {field: 'profile',message: 'Perfil url ya existente'}
    return null
}


module.exports = {
    controlName,
    controlLast,
    controlEmail,
    controlPassword,
    controlConfirmPassword,
    controlTitle,
    controlBody,
    controlUrl,
    controlProfile
}
