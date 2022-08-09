const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const Ad = require('../model/advertismentModel')
const { rmSync } = require('fs')

const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body

    if(!username || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400).json({
            error:'User with that email already exists'
        })
        throw new Error('User with that email already exists') 
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)

        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }


})


const getAllUsers = asyncHandler(async(req,res) => {
    
 
  
    const users = await User.find()


    res.status(200).json(users)
  
})


const getUser = asyncHandler(async(req,res) => {
    
    const user = await User.findById(req.params.id)


    res.status(200).json(user)
})



const getUserProfile = asyncHandler(async(req,res) => {
    
   

    
    const user = await User.findById(req.params.id)
    const ads = await Ad.find({user: user._id})
    console.log(ads)
    res.status(200).json({
        id: user._id,
        username : user.username,
        ads

    })

  
})




const loginUser =  asyncHandler(async (req, res) => {

const {email, password} = req.body

const user = await User.findOne({email})


if(user && (await bcrypt.compare(password,user.password))){
    res.status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)

    })
} else{
    req.status(400)
        throw new Error('Invalid credentials')
}



})


const getMe =  asyncHandler(async (req, res) => {

    const {_id, username, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        username,
        email,
    })

   
    })


// JWT

const generateToken = (id) => {

    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '15d',
        
    })

}




module.exports = {
    registerUser, loginUser, getMe, getUserProfile, getAllUsers, getUser 
}