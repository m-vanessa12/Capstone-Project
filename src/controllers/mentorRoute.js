    const { fileUpload } = require('../helpers/multer');
    const { Mentor } = require('../models/Mentor');

    // Controller function for creating a mentor profile
    const mentorProfile = async (req, res) => {
        try {
            const {
                phoneNumber,
                country,
                city,
                position,
                company,
                // universityName,
                // degreeType,
                fieldOfStudy,
                industry,
                yearsExperience,
                qualifications,
                otherQualification,
                bio
            } = req.body;
            const userId = req.user.id;

            // Check if the user already has a mentor profile
            const existingMentorProfile = await Mentor.findOne({ user: userId });

            if (existingMentorProfile) {
                return res.status(400).json({ message: 'Mentor profile already exists' });
            }

            // If a photo is uploaded, save its URL
            let photoUrl = "https://example.com/default-photo.jpg";
            if (req.file) {
                photoUrl = await fileUpload(req); // Assuming fileUpload function handles file upload and returns URL
            }

            // Create a new mentor profile
            const newMentorProfile = new Mentor({
                user: userId,
                photo: photoUrl,
                phoneNumber,
                country,
                city,
                position,
                company,
                // universityName,
                // degreeType,
                fieldOfStudy,
                industry,
                yearsExperience,
                qualifications,
                otherQualification,
                bio
            });

            // Save mentor profile to the database
            await newMentorProfile.save();

            res.status(201).json({ message: 'Mentor profile created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Error' });
        }
    };

    module.exports = {
        mentorProfile
    };
