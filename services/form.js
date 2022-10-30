const user = require("../models/user")

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
    const exist = await user.findOne({ email })
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


module.exports = {
    controlName,
    controlLast,
    controlEmail,
    controlPassword,
    controlConfirmPassword
}
