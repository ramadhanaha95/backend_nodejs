import bcrypt from 'bcrypt'

const UserPasswordAuthenticate = async (password, password_cek, callback) => {
    bcrypt.compare(password, password_cek, (err, res) => {
        callback(null, res)
    })
}

