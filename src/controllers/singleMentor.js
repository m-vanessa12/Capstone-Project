const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Mentor } = require('../models/Mentor');

// Route to get information of a single mentor by ID
const mentorInfo = async (req, res) => {
    try {
        const { mentorId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(mentorId)) {
            return res.status(400).json({ message: 'Invalid mentor ID' });
        }

        const mentorProfile = await Mentor.findById(mentorId).populate('user');

        if (!mentorProfile) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        const user = mentorProfile.user;
        let combinedQualifications = [...mentorProfile.qualifications]; // Start with the qualifications array
        
        // Add otherQualification to the array if it exists and is a non-empty string
        if (mentorProfile.otherQualification && mentorProfile.otherQualification.trim() !== '') {
            combinedQualifications.push(mentorProfile.otherQualification);
        }

        const response = {
            _id: mentorProfile._id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            calendly: user.calendly,
            phoneNumber: mentorProfile.phoneNumber,
            country: mentorProfile.country,
            city: mentorProfile.city,
            position: mentorProfile.position,
            company: mentorProfile.company,
            fieldOfStudy: mentorProfile.fieldOfStudy,
            industry: mentorProfile.industry,
            yearsExperience: mentorProfile.yearsExperience,
            qualifications: combinedQualifications, // Now includes otherQualification
            bio: mentorProfile.bio,
            photo: mentorProfile.photo
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Error' });
    }
};


module.exports = {
    mentorInfo
};
