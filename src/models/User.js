const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'Mentee',
        enum: [ 'Mentee','Admin','Mentor'],
    },
    calendly:{
        type: String,
        required: false,
    }

}, {timestamps: true})

// Define findById method on User schema
userSchema.statics.findById = function(userId) {
    return this.findOne({ _id: userId });
};

const User = mongoose.model('User', userSchema)
module.exports = {
    User
    // skillsEnum,
    // interestsEnum
}