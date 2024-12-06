const bcrypt = require('bcrypt');

const hashPassword = (clave) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err) {
                reject(err)
            }
            bcrypt.hash(clave, salt, (err, hash) => {
                if(err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

const comparePassword = (clave, hashed) => {
    return bcrypt.compare(clave, hashed)
}

module.exports = {
    hashPassword,
    comparePassword
}