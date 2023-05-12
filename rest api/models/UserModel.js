const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add you email']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
        minlength: [8, 'Password must be at least 8 characters long']
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', UserSchema)