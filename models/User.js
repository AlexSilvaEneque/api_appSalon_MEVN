import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { uniqueId } from '../utils/index.js'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    token: {
        type: String,
        default: () => uniqueId()
    },
    verified: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { // evitar que se hashee otra vez cuando se confirme la cuenta
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) // this --> hace referencia al schema
})

userSchema.methods.checkPassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User