const { User } = require('../models/User'); 
const { Mentee } = require('../models/Mentee'); 

const menteeProfile = async (req, res) => {
    try {
        const userId = req.user.id; 

        // Fetch the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch the mentee profile linked to the user
        const menteeProfile = await Mentee.findOne({ user: userId });
        if (!menteeProfile) {
            return res.status(404).json({ message: 'Mentee profile not found' });
        }

        // Combine skills and otherSkills, and interests and otherInterests similar to your original function
        const combinedSkills = menteeProfile.skills.concat(menteeProfile.otherSkills ? [menteeProfile.otherSkills] : []);
        const combinedInterests = menteeProfile.interests.concat(menteeProfile.otherInterests ? [menteeProfile.otherInterests] : []);

        const response = {
            _id: menteeProfile._id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phoneNumber: menteeProfile.phoneNumber,
            country: menteeProfile.country,
            city: menteeProfile.city,
            universityName: menteeProfile.universityName,
            degreeType: menteeProfile.degreeType,
            fieldOfStudy: menteeProfile.fieldOfStudy,
            skills: combinedSkills,
            interests: combinedInterests,
            photo: menteeProfile.photo,
            bio: menteeProfile.bio
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = {
    menteeProfile
};