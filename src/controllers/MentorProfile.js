const { User } = require('../models/User');
const { Mentor } = require('../models/Mentor');

const mentorProfile = async (req, res) => {
    try {
        // Assuming req.user.id contains the authenticated user's ID
        const userId = req.user.id;

        // Fetch the user by ID to verify the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch the mentor profile linked to the user
        const mentorProfile = await Mentor.findOne({ user: userId }).populate('user');
        if (!mentorProfile) {
            return res.status(404).json({ message: 'Mentor profile not found' });
        }

        // Here, you can combine qualifications, similar to how you combined skills for the mentee
        const combinedQualifications = mentorProfile.qualifications.concat(
            mentorProfile.otherQualification ? [mentorProfile.otherQualification] : []
        );

        // Prepare the response with mentor profile information
        const response = {
            _id: mentorProfile._id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phoneNumber: mentorProfile.phoneNumber,
            country: mentorProfile.country,
            city: mentorProfile.city,
            position: mentorProfile.position,
            company: mentorProfile.company,
            fieldOfStudy: mentorProfile.fieldOfStudy,
            industry: mentorProfile.industry,
            yearsExperience: mentorProfile.yearsExperience,
            qualifications: combinedQualifications,
            bio: mentorProfile.bio,
            photo: mentorProfile.photo,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching mentor profile:', error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = { mentorProfile };
