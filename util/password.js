const crypto = require('crypto')

const cipher = crypto.createCipher('aes256', process.env.SECRETKEY)

exports.MakePassword = (password) => {
    cipher.update(password, 'ascii', 'hex')
    return cipher.final('hex')
}
