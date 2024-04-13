// const {Comment} = require('../models/Comments'); // Import the Discussion model
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Discussion = require('../models/Discusion'); // Import the Discussion model


// const addCommentToDiscussion = async (discussionId, newComment) => {
//     try {
//         // Find the discussion by its ID
//         const discussion = await Discussion.findById(discussionId);

//         if (!discussion) {
//             throw new Error('Discussion not found');
//         }

//         // Add the new comment to the discussion
//         discussion.comments.push(newComment);

//         // Save the updated discussion
//         await discussion.save();

//         // Return the updated discussion
//         return discussion;
//     } catch (error) {
//         console.error('Error adding comment to discussion:', error);
//         throw error; // Throw the error to be handled by the caller
//     }
// };

// module.exports = {
//     addCommentToDiscussion
// };
