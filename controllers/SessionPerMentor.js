// Import required models at the top of your file
const Session = require('../models/BookSession');
const mongoose = require('mongoose');

// Assuming your function is called fetchMentorSessions or similar
const GetMentorSessions = async (req, res) => {
    try {
        const { mentorId } = req.params;

        const sessions = await Session.aggregate([
            { $match: { mentor: new mongoose.Types.ObjectId(mentorId) } },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: 'mentees',
                    localField: 'mentee',
                    foreignField: 'user',
                    as: 'menteeDetails'
                }
            },
            { $unwind: { path: '$menteeDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'menteeDetails.user',
                    foreignField: '_id',
                    as: 'menteeUserDetails'
                }
            },
            { $unwind: { path: '$menteeUserDetails', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 1,
                    dateTime: 1,
                    sessionInfo: 1,
                    meetingLink: 1,
                    status: 1,
                    createdAt: 1,
                    'menteeName': { 
                        $concat: [
                            { $ifNull: ['$menteeUserDetails.firstName', ''] },
                            " ",
                            { $ifNull: ['$menteeUserDetails.lastName', ''] }
                        ]
                    },
                    'menteePhoto': { $ifNull: ['$menteeDetails.photo', 'DefaultPhotoPath'] },
                    'menteeId': '$menteeDetails._id', // Project the menteeId from menteeDetails
                }
            }                
        ]);

        res.status(200).json({ success: true, sessions });
    } catch (error) {
        console.error('Error fetching mentor sessions:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the sessions' });
    }
};

module.exports = {
    GetMentorSessions
};
