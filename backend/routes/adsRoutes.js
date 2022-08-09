const express = require('express')
const router = express.Router()
const {getAds, myAds, getAd} = require('../controllers/adController')
const {setAd} = require('../controllers/adController')
const {updateAd} = require('../controllers/adController')
const {deleteAd} = require('../controllers/adController')
const { protect } = require('../middleware/authMiddleware')


module.exports = router

router.get('/', getAds)

router.get('/:id', getAd)

router.post('/', protect,setAd)

router.get('/myAds', protect,myAds)


router.put('/:id',  protect,updateAd)

router.delete('/:id', protect,deleteAd)

