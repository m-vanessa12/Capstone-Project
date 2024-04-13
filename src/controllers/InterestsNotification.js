const mongoose = require('mongoose');
const { User} = require('../models/User'); 
const Interests = require('../models/Interests');

const postInterest = async (req, res) => {
    const mentorId = req.user.id;
    const menteeId = req.params.menteeId;
    const { message } = req.body;

    if (!menteeId || !message) {
        return res.status(400).json({ message: 'Mentee ID and message are required.' });
    }

    try {
        const newInterest = new Interests({
            mentorId,
            menteeId,
            message
        });

        await newInterest.save();
        res.status(201).json({
            message: 'Interest notification sent successfully.'
        });
    } catch (error) {
        console.error('Error sending interest notification:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    postInterest
};

