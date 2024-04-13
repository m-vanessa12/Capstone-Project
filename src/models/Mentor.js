const mongoose = require('mongoose');
const { User } = require('../models/User');
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Mentee specific profile Information
    photo: {
        type: String,
        default: '' // Default to an empty string or null, depending on your preference
    },
    phoneNumber: String,
    country: String,
    city: String,
    position: String,
    company: String,
    // universityName: String,
    // degreeType: String,
    fieldOfStudy: String,
    industry: String,
    yearsExperience: String,
    qualifications: {
        type: [String],
        enum: ['Graphic Design', 'Digital Marketing', 'Project Management', 'Financial Literacy', 'Communication', 'Problem-solving', 'Teamwork','Leadership', 'Scientific Research Expertise', 'Educational Expertise', 'Financial Expertise', 'Art and Design Expertise', 'Scientific Research Expertise'],
        required: true
    },
    otherQualification: String,
    bio: String,
});

const Mentor = mongoose.model('Mentor', mentorSchema);
module.exports = {
    Mentor,
};
