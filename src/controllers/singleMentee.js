const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const { Mentee } = require('../models/Mentee');

// Route to get information of a single mentee by ID
const menteeInfo = async (req, res) => {
    try {
        const { menteeId } = req.params;

        // Ensure menteeId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(menteeId)) {
            return res.status(400).json({ message: 'Invalid mentee ID' });
        }

        // Fetch the mentee profile for the provided menteeId and populate the user field
        const menteeProfile = await Mentee.findById(menteeId).populate('user');

        if (!menteeProfile) {
            return res.status(404).json({ message: 'Mentee not found' });
        }

        // Combine skills and otherSkills
        const combinedSkills = menteeProfile.skills.slice(); // Create a copy of the skills array
        if (menteeProfile.otherSkills) {
            combinedSkills.push(menteeProfile.otherSkills); // Add otherSkills if it exists
        }

        // Combine interests and otherInterests
        const combinedInterests = menteeProfile.interests.slice(); // Create a copy of the interests array
        if (menteeProfile.otherInterests) {
            combinedInterests.push(menteeProfile.otherInterests); // Add otherInterests if it exists
        }

        // Access the user's information from the populated user field
        const user = menteeProfile.user;
        const response = {
            _id: menteeProfile._id,
            firstName: user.firstName, 
            lastName: user.lastName,  // Access the user's name
            role: user.role, // Access the user's role
            phoneNumber: menteeProfile.phoneNumber,
            country: menteeProfile.country,
            city: menteeProfile.city,
            universityName: menteeProfile.universityName,
            degreeType: menteeProfile.degreeType,
            fieldOfStudy: menteeProfile.fieldOfStudy,
            skills: combinedSkills, // Use the combined skills array
            interests: combinedInterests, // Use the combined interests array
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
    menteeInfo
};
