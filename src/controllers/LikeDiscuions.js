const express = require('express');
const router = express.Router();
const Like = require('../models/Likes.js');

// Define route handler for liking or unliking a discussion
const likes = async (req, res, next) => {
    const { discussionId } = req.body;
    const userId = req.user.id; // Extracted by verifyToken middleware

    try {
        // Check for existing like
        let existingLike = await Like.findOne({ discussion: discussionId, user: userId });

        let liked;
        if (existingLike) {
            // User already liked, so unlike it
            await Like.findByIdAndDelete(existingLike._id);
            liked = false;
        } else {
            // No like found, so add a new like
            await new Like({ discussion: discussionId, user: userId }).save();
            liked = true;
        }

        // Count total likes for the discussion
        const totalLikes = await Like.countDocuments({ discussion: discussionId });

        res.json({ success: true, liked: liked, totalLikes: totalLikes });
    } catch (error) {
        console.error('Error handling likes/unlikes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    likes
};
