// const Discussion = require('../models/Discusion');
// const Comment = require('../models/Comments');
// const User = require('../models/User');

// // Controller function for fetching all comments of a discussion
// const getCommentsByDiscussionId = async (req, res) => {

//     try {
//         const { discussionId } = req.params;

//         // Find all comments associated with the discussion and populate the user field
//         const comments = await Comment.find({ discussion: discussionId }).populate('user');
//         // Format the comments data
//         const formattedComments = comments.map(comment => {
//             let creatorName = "Unknown"; // Default creator name
//             if (comment.user) {
//                 creatorName = `${comment.user.firstName} ${comment.user.lastName}`;
//             }
//             return {
//                 commentId: comment._id,
//                 content: comment.content,
//                 creator: creatorName,
//                 createdAt: comment.createdAt
//             };
//         });

//         res.status(200).json({ message: 'Comments retrieved successfully', comments: formattedComments });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     getCommentsByDiscussionId
// };
