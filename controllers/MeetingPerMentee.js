const Session = require('../models/BookSession');
const mongoose = require('mongoose');

const GetMenteeMeetings = async (req, res) => {
    try {
        const { menteeId } = req.params;

        const sessions = await Session.aggregate([
            { $match: { mentee: new mongoose.Types.ObjectId(menteeId) } },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: 'mentors',
                    localField: 'mentor',
                    foreignField: 'user', // Assuming this matches the users collection _id
                    as: 'mentorDetails'
                }
            },
            { $unwind: { path: '$mentorDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'mentorDetails.user',
                    foreignField: '_id',
                    as: 'mentorUserDetails'
                }
            },
            { $unwind: { path: '$mentorUserDetails', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 1,
                    dateTime: 1,
                    sessionInfo: 1,
                    meetingLink: 1,
                    status: 1,
                    createdAt: 1,                  
                    rejectionReason: 1,
                    mentorName: {
                        $concat: [
                            { $ifNull: ['$mentorUserDetails.firstName', ''] },
                            " ",
                            { $ifNull: ['$mentorUserDetails.lastName', ''] }
                        ]
                    },
                    mentorPhoto: { $ifNull: ['$mentorDetails.photo', 'DefaultPhotoPath'] }, // Assuming photo is in mentors
                    mentorId: '$mentorDetails._id',
                }
            }
        ]);

        res.status(200).json({ success: true, sessions });
    } catch (error) {
        console.error('Error fetching mentee sessions:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the sessions' });
    }
};


module.exports = {
    GetMenteeMeetings  
};
