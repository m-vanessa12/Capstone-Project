const Interest = require('../models/Interests');
const mongoose = require('mongoose');

const getMenteeInterests = async (req, res) => {
    try {
        const { menteeId } = req.params;

        const interests = await Interest.aggregate([
            { $match: { menteeId: new mongoose.Types.ObjectId(menteeId) } },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: 'mentors',
                    localField: 'mentorId',
                    foreignField: '_id',
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
                    message: 1,
                    read: 1,
                    createdAt: 1,
                    mentorName: { 
                        $cond: {
                            if: { $and: [
                                { $ne: ["$mentorUserDetails.firstName", null] },
                                { $ne: ["$mentorUserDetails.firstName", ""] },
                                { $ne: ["$mentorUserDetails.lastName", null] },
                                { $ne: ["$mentorUserDetails.lastName", ""] }
                            ]},
                            then: { $concat: ["$mentorUserDetails.firstName", " ", "$mentorUserDetails.lastName"] },
                            else: ""
                        }
                    },
                    mentorPhoto: { $ifNull: ['$mentorDetails.photo', 'DefaultPhotoPath'] },
                    mentorId: '$mentorDetails._id',
                }
            }                
        ]);        

        res.status(200).json({ success: true, interests });
    } catch (error) {
        console.error('Error fetching mentee interests:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the interests' });
    }
};

module.exports = {
    getMenteeInterests
};
