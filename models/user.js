const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    nombre: String,
    correo: {
        type: String,
        unique: true
    },
    clave: String
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel