const { fileUpload } = require('../helpers/multer');
// const Mentee = require('../models/Mentee');
const { Mentee, skillsEnum, interestsEnum } = require('../models/Mentee');

// Controller function for creating a mentee profile
// Controller function for creating a mentee profile
const menteeProfile = async (req, res) => {
    try {
        const {
            phoneNumber,
            country,
            city,
            universityName,
            degreeType,
            fieldOfStudy,
            skills,
            otherSkills,
            interests,
            otherInterests,
            bio

        } = req.body;
        const userId = req.user.id;

        // Check if the user already has a mentee profile
        const existingMenteeProfile = await Mentee.findOne({ user: userId });

        if (existingMenteeProfile) {
            return res.status(400).json({ message: 'Mentee profile already exists' });
        }

        if (req.file) {
            req.body.photo = await fileUpload(req);
        } else {
            req.body.photo = "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80";
        }

        // Create a new mentee profile
        const newMenteeProfile = new Mentee({
            user: userId,
            photo: req.body.photo,
            phoneNumber,
            country,
            city,
            universityName,
            degreeType,
            fieldOfStudy,
            skills,
            otherSkills,
            interests,
            otherInterests,
            bio
        });

        // Save mentee profile to the database
        await newMenteeProfile.save();

        res.status(201).json({ message: 'Mentee profile created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Error' });
    }
};


module.exports = {
    menteeProfile
};
