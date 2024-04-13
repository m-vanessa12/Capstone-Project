const Discussions = require('../models/Discusion'); 
const Comment = require('../models/Comments'); 


const addCommentToDiscussion = async (req, res) => {
    const { discussionId, content } = req.body;
    const userId = req.user.id;

    try {
        const newComment = new Comment({
            user: userId,
            discussion: discussionId,
            content: content
        });

        await newComment.save();

        // Perform a separate query to fetch comments related to the discussion
        const commentsForDiscussion = await Comment.find({ discussion: discussionId })
        .populate('user')
        .sort({ createdAt: -1 });

        // Optionally, fetch the discussion details if needed
        const discussionDetails = await Discussions.findById(discussionId);

        res.status(201).json({ 
            message: 'Comment added successfully', 
            comments: commentsForDiscussion, 
            discussion: discussionDetails 
        });
    } catch (error) {
        console.error('Error adding comment to discussion:', error);
        res.status(500).json({ message: 'Error adding comment to discussion' });
    }
};


module.exports = {
    addCommentToDiscussion
};
