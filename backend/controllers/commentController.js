const asyncHandler = require('express-async-handler')

const Ad = require('../model/advertismentModel')
const User = require('../model/userModel')
const Comment = require('../model/commentModel')



// get comment by id

const getComment = asyncHandler(async(req, res) => {

    const cm = await Comment.findById(req.params.id)


    res.status(200).json(cm)

});


const getComments = asyncHandler(async(req, res) => {

    const cm = await Comment.find()


    res.status(200).json(cm)

});




const deleteComment =  asyncHandler(async(req, res) => {


    const cm = await Comment.findById(req.params.id)

    
    const user = await User.findById(req.user.id)
    

   
    


    const deletedCm = await Comment.findByIdAndRemove(req.params.id)
    res.status(200).json(deletedCm)
})




const setComment =  asyncHandler(async(req, res) => {

    if(!req.body.content){
        res.status(400)
        throw new Error('Please add a text')
    }
    
    

    const comment = await Comment.create({
        content: req.body.content,
        user: req.user.id
        
    })

    const d = await Ad.findByIdAndUpdate(
        {_id: req.params.id},
        {$push: {comments: comment}},
        
    );


    
    res.status(200).json(comment)



  
});



module.exports = {
    setComment, getComment, deleteComment, getComments
}