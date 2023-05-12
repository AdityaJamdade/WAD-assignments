const express = require('express')
const router = express.Router()

const { loginUser, registerUser, getMe, updateUserInfo, removeUser } = require('../controllers/userController')

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/me').get(getMe)
router.route('/me').put(updateUserInfo).delete(removeUser)

module.exports = router