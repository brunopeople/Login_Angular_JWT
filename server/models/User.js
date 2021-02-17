const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    name: {
        type: String
    },

    email: {
        type: String,
    },

    password: {
        type: String
    }
}, {
    collection : 'users'
})

userSchema.plugin(uniqueValidator, {message: 'Email já está sendo em uso.'});
module.exports = mongoose.model('User', userSchema)