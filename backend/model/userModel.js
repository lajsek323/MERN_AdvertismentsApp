const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Please add username'],
        minLength: [1,'too few cahrs'],
        maxLength: [15,'too many chars'],
    },
    email: {
        type: String,
        required: [true, 'Please add username'],
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please add username'],
        match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, 'Please fill a valid passwrod']
    },
   


},
{
    timestamps: true
})


module.exports = mongoose.model('Users', userSchema)