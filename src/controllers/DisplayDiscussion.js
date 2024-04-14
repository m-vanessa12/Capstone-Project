const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Mentee } = require('../models/Mentee');
const { Mentor } = require('../models/Mentor');
const Discusion = require('../models/Discusion');
const Comment = require('../models/Comments');

const displayDiscussion = async (req, res) => {
    try {
        const discussions = await Discusion.find().populate('createdBy').sort({ createdAt: -1 });

        const formattedDiscussions = [];
        for (const discussion of discussions) {
            const comments = await Comment.find({ discussion: discussion._id }).populate('user').sort({ createdAt: -1 });
            const commentCount = await Comment.countDocuments({ discussion: discussion._id });
            const likesCount = discussion.likesCount || 0;

            let createdBy = {
                name: discussion.createdBy.firstName + ' ' + discussion.createdBy.lastName,
                role: discussion.createdBy.role,
                photo: null
            };

            // Find photo based on user role
            if (discussion.createdBy.role === 'Mentee') {
                const mentee = await Mentee.findOne({ user: discussion.createdBy._id });
                createdBy.photo = mentee ? mentee.photo : null; // Check if mentee exists
            } else if (discussion.createdBy.role === 'Mentor') {
                const mentor = await Mentor.findOne({ user: discussion.createdBy._id });
                createdBy.photo = mentor ? mentor.photo : null; // Check if mentor exists
            }

            const formattedComments = [];
            for (const comment of comments) {
                let commentCreatedBy = {
                    name: comment.user.firstName + ' ' + comment.user.lastName,
                    role: comment.user.role,
                    photo: null
                };

                // Find photo based on user role
                if (comment.user.role === 'Mentee') {
                    const mentee = await Mentee.findOne({ user: comment.user._id });
                    commentCreatedBy.photo = mentee ? mentee.photo : null; // Check if mentee exists
                } else if (comment.user.role === 'Mentor') {
                    const mentor = await Mentor.findOne({ user: comment.user._id });
                    commentCreatedBy.photo = mentor ? mentor.photo : null; // Check if mentor exists
                }

                formattedComments.push({
                    _id: comment._id,
                    content: comment.content,
                    createdAt: comment.createdAt,
                    createdBy: commentCreatedBy
                });
            }

            const formattedDiscussion = {
                _id: discussion._id,
                title: discussion.title,
                category: discussion.category,
                content: discussion.content,
                createdAt: discussion.createdAt,
                createdBy: createdBy,
                commentCount: commentCount,
                likesCount: likesCount,
                comments: formattedComments
            };

            formattedDiscussions.push(formattedDiscussion);
        }

        res.status(200).json({ discussions: formattedDiscussions });
    } catch (error) {
        console.error('Error fetching discussions:', error);
        res.status(500).json({ message: 'Internal Error' });
    }
};


module.exports = {
    displayDiscussion
};
