const express = require('express')
const router = express.Router()
const {registerUser, getUserProfile, getAllUsers,getUser } = require('../controllers/userController')
const {loginUser} = require('../controllers/userController')
const {getMe} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')


router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
router.get('/getAll',getAllUsers)
router.get('/getUser/:id',getUser)
router.get('/:id',getUserProfile)

module.exports = router

