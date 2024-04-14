const express = require('express');
const router = express.Router();
const Like = require('../models/Likes.js');

// Define route handler for liking or unliking a discussion
const likes = async (req, res) => {
    const { discussionId } = req.body;
    const userId = req.user.id; // Ensure req.user is populated correctly

    try {
        // Check for existing like
        const existingLike = await Like.findOne({ discussion: discussionId, user: userId });

        if (existingLike) {
            // If like exists, remove it
            await Like.findByIdAndDelete(existingLike._id);
            console.log(`Like removed for discussion: ${discussionId}`);
        } else {
            // If like does not exist, add it
            await new Like({ discussion: discussionId, user: userId }).save();
            console.log(`New like added for discussion: ${discussionId}`);
        }

        // Count total likes for the discussion after updating
        const totalLikes = await Like.countDocuments({ discussion: discussionId });
        console.log(`Total likes for discussion ${discussionId}: ${totalLikes}`);

        // Respond with the new like count
        res.json({ success: true, liked: !!existingLike, totalLikes: totalLikes });
    } catch (error) {
        console.error('Error handling likes/unlikes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    likes
};
