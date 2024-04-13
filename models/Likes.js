const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    discussion: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Unique index for one like per user per discussion
likeSchema.index({ discussion: 1, user: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
