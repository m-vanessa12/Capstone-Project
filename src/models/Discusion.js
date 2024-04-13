const mongoose = require('mongoose');
const discussionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    category:{
        type: String,
        enum: ['General', 'Technology', 'Science', 'Politics', 'Women Empowerment', 'Mental Health', 'Gender Equality','Other'],
        required: true
    },

    content:{
        type: String,
        required: true
    },

    contentCoverPicture: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true}

);

const Discussions = mongoose.model('Discussion', discussionSchema);

module.exports = Discussions;