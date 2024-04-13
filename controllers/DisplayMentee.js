const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Mentee } = require('../models/Mentee');

const ProfilesOfMentee = async (req, res) => {
    try {
        // Fetch mentee profiles for users with role 'Mentee' and exclude admin
        const menteeProfiles = await Mentee.find().populate({
            path: 'user',
            match: { role: { $eq: 'Mentee' } },
            select: 'firstName lastName role'
        });

        const filteredProfiles = menteeProfiles
            .filter(menteeProfile => menteeProfile.user) // Ensure user exists and role hasn't changed
            .map(menteeProfile => {
                const { user } = menteeProfile;
                let allInterests = menteeProfile.interests || [];
                if (menteeProfile.otherInterests && menteeProfile.otherInterests.trim() !== "") {
                    allInterests.push(menteeProfile.otherInterests);
                }
                let interestsString = allInterests.length > 0 ? "My interests are " + allInterests.join(', ') : "";
                return {
                    _id: menteeProfile._id,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                    interests: interestsString,
                    photo: menteeProfile.photo || 'DefaultPhotoPath'
                };
            });

        res.status(200).json(filteredProfiles);
    } catch (error) {
        console.error('Error fetching mentee profiles:', error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = {
    ProfilesOfMentee
};
