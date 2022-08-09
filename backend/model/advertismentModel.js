const { ObjectId } = require('bson');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const adSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: [1,'too few cahrs'],
        maxLength: [75,'too many chars'],
        required: [true, 'Please add a title']
    },
    description: {
        minLength: [1,'too few cahrs'],
        maxLength: [175,'too many chars'],
        type: String,
        required: [true, 'Please add a description']
    },
    image: {
        type: String
      },
      
      comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },

},{
    timestamps: true,
}
)

module.exports = mongoose.model('Advertisments', adSchema)