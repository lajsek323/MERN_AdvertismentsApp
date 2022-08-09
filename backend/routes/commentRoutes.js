const express = require('express')
const { setComment, getComment, deleteComment, getComments } = require('../controllers/commentController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()






router.post('/addComment/:id',protect,setComment)
router.get('/:id',getComment)
router.get('/',getComments)
router.delete('/:id',protect,deleteComment)

module.exports = router