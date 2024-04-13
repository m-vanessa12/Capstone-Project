const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the Comment schema
const Comments = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Make sure this matches the name of your User model
        required: true
    },
    
    discussion: {
        type: Schema.Types.ObjectId,
        ref: 'Discussion',
        required: false
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Comment model
const Comment = mongoose.model('Comment', Comments);
module.exports = Comment;