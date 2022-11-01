const express = require('express')
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const generatePost = () => {

    const post = {
        title: faker.lorem.words(6),
        body: faker.lorem.sentence(12),
    }

    // testear
    // console.log(post)
    
    return post
}

const generateUser = () => {
    const user = {
        name: faker.name.firstName(),
        last: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }

    const newUser = new User(user)
    return newUser
}

module.exports = {
    generatePost,
    generateUser
}
