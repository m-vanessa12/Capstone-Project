const express = require('express');
const router = express.Router();
const { Mentor } = require('../models/Mentor');

const ProfilesOfMentor = async (req, res) => {
    try {
        // Fetch mentor profiles and populate user details for users with 'Mentor' role
        const mentorProfiles = await Mentor.find().populate({
            path: 'user',
            match: { role: { $eq: 'Mentor' } },
            select: 'firstName lastName role'
        });

        const filteredProfiles = mentorProfiles
            .filter(mentorProfile => mentorProfile.user) // Ensure user exists and is currently a mentor
            .map(mentorProfile => {
                const { user } = mentorProfile;
                let allQualifications = mentorProfile.qualifications || [];

                if (mentorProfile.otherQualifications && mentorProfile.otherQualifications.trim() !== "") {
                    allQualifications.push(mentorProfile.otherQualifications);
                }

                let qualificationsString = allQualifications.length > 0 ? "My qualifications are " + allQualifications.join(', ') : "Qualifications not specified";

                return {
                    _id: mentorProfile._id,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                    qualifications: qualificationsString,
                    photo: mentorProfile.photo || 'DefaultPhotoPath'
                };
            });

        res.status(200).json(filteredProfiles);
    } catch (error) {
        console.error('Error fetching mentor profiles:', error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = {
    ProfilesOfMentor
};
