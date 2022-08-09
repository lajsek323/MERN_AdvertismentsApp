const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const commentSchema = mongoose.Schema({

    content: {
        type: String,
        minLength: [1,'too few cahrs'],
        maxLength: [155,'too many chars'],
        required: [true, 'Please add a text'],
        
      },

    user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },


},
{
    timestamps: true
})


module.exports = mongoose.model('Comments', commentSchema)