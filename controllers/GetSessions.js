const Session = require('../models/BookSession');
const { User } = require('../models/User');

// Controller function to get session details along with mentee and mentor information
const getSessionDetails = async (req, res) => {
    try {
        // Retrieve the session details and populate the mentee and mentor fields with user information
        const sessions = await Session.find()
            .populate('mentee', 'firstName lastName email role') // Populate mentee fields with firstName, lastName, email, and role
            .populate('mentor', 'firstName lastName email role'); // Populate mentor fields with firstName, lastName, email, and role

        // Format the response data
        const formattedSessions = sessions.map(session => ({
            _id: session._id,
            mentee: {
                name: `${session.mentee.firstName} ${session.mentee.lastName}`,
                email: session.mentee.email,
                role: session.mentee.role
            },
            mentor: {
                name: `${session.mentor.firstName} ${session.mentor.lastName}`,
                email: session.mentor.email,
                role: session.mentor.role
            },
            dateTime: session.dateTime,
            sessionInfo: session.sessionInfo
        }));

        // Send the formatted session details in the response
        res.status(200).json({ success: true, sessions: formattedSessions });
    } catch (error) {
        console.error('Error retrieving session details:', error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving session details' });
    }
};

module.exports = {
    getSessionDetails
};
