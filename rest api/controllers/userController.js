const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')

// @desc        Display user data
// @route       GET api/users/me
// @acccess     private

const getMe = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user === null) { res.status(404).json({ message: 'User not found!' })}
    if (user.password !== req.body.password) {
        res.status(404).json({ message: 'Password incorrect!' })
    }
    else {
        res.status(200).json({ userInfo: user })
    }
})

// @desc        register user
// @route       POST api/users/register
// @acccess     public

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password } = req.body
        const user = await User.create({ name, email, password })
        res.status(200).json({
            user
        })
    } catch (error) {
        throw new Error(error)
    }

})

// @desc        Display user data
// @route       POST api/users/login
// @acccess     public

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.find({ email, password })
        res.status(200).json({
            user
        })
    } catch (error) {
        throw new Error(error)
    }

})

const updateUserInfo = asyncHandler(async (req, res) => {
    const { email, new_name, new_password } = req.body
    try {
        const existing_user = await User.find({ email: email })
        const new_obj = {
            name: new_name ? new_name : existing_user.name,
            email:email,
            password: new_password ? new_password : existing_user.password
        }
        const user = await User.findOneAndUpdate({ email }, { name: new_name, email, password: new_password })
        res.status(200).json({ msg: `user data updated successfully for ${user.email}` })
    } catch (error) {
        throw new Error(error)
    }
})

const removeUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.body.email, password: req.body.password })
        if(user === null) throw new Error('user not found')
        res.status(200).json({ msg: `user deleted succssfully ${user.email}` })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    getMe, registerUser, loginUser, updateUserInfo, removeUser
}