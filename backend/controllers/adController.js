const asyncHandler = require('express-async-handler')

const Ad = require('../model/advertismentModel')
const User = require('../model/userModel')
const comments = require('../model/commentModel')

const getAds = asyncHandler(async(req,res) => {
    
    const ads = await Ad.find().populate('user').populate(
        {path: 'comments',
    populate: {path: 'user'}}
    )


    res.status(200).json(ads)
})


const getAd = asyncHandler(async(req,res) => {
    
    const ad = await Ad.findById(req.params.id)


    res.status(200).json(ad)
})





const myAds = asyncHandler(async(req,res) => {
    

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    
    const ads = await Ad.find({user: user._id})
    const adsC = await Ad.find({user: user._id}).count()
    console.log(adsC)
    console.log(user.id)
   
    res.status(200).json(ads)
})




const setAd =  asyncHandler(async(req, res) => {

    if(!req.body.title){
        res.status(400)
        throw new Error('Please add a title')
    }


    const ad = await Ad.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user
    })




    res.status(200).json(ad)
})

const updateAd =  asyncHandler(async(req, res) => {

    const ad = await Ad.findById(req.params.id)

    if(!ad){
        res.status(400)
        throw new Error('Ad not found')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // check user id match to ad's user owner
    if(ad.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body,{new: true})


    res.status(200).json(updateAd)
})


const deleteAd =  asyncHandler(async(req, res) => {


    const ad = await Ad.findById(req.params.id)

    if(!ad){
        res.status(400)
        throw new Error('Ad not found')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // check user id match to ad's user owner
    if(ad.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }


    const deletedAd = await Ad.findByIdAndRemove(req.params.id)
    res.status(200).json(deletedAd)
})



module.exports = {
    getAds, setAd, updateAd, deleteAd, myAds,getAd
}