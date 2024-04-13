const Session = require('../models/BookSession');
const { Mentor } = require('../models/Mentor');
const mongoose = require('mongoose');

// Adjusted session booking function
const SessionBooking= async (req, res) => {
    try {
        // Extract the mentorModelId from the request body or URL params
        const { mentorModelId, dateTime, sessionInfo, meetingLink } = req.body; 
    
        const menteeUserId = req.user.id; // Assuming you're extracting this from the decoded JWT

        console.log("Finding mentor with ID:", mentorModelId);
        const mentor = await Mentor.findById(mentorModelId);
        console.log(mentor); 
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        // Here, assume `mentor.user` refers to the User ID associated with this mentor
        const mentorUserId = mentor.user;

        // Proceed with session booking using menteeUserId and mentorUserId
        const session = new Session({
            mentee: menteeUserId, // This should be the User ID of the mentee
            mentor: mentorUserId, // This is the User ID associated with the mentor, retrieved above
            dateTime,
            sessionInfo,
            meetingLink,

        });

        await session.save();
        res.status(201).json({ message: 'Session booked successfully', session });
    } catch (error) {
        console.error('Error booking session:', error);
        res.status(500).json({ message: 'An error occurred while booking the session' });
    }
};



// Session rejection function
const RejectSession = async (req, res) => {
    const { sessionId } = req.params; 
    const { rejectionReason } = req.body;  

    try {
        // Find the session by ID and ensure it exists
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Update the session's status to 'rejected' and add the rejection reason
        session.status = 'rejected';
        session.rejectionReason = rejectionReason;
        await session.save();

        res.json({ message: "Session rejected successfully", session });
    } catch (error) {
        console.error('Error rejecting session:', error);
        res.status(500).json({ message: 'An error occurred while rejecting the session' });
    }
};


// Session acceptance function
const AcceptSession = async (req, res) => {
    const { sessionId } = req.params; // Extract sessionId from URL parameters

    try {
        // Find the session by ID to ensure it exists
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Update the session's status to 'accepted'
        session.status = 'accepted';
        // Optionally, you can update any other relevant fields here

        await session.save(); // Save the updated session document

        res.json({ message: "Session accepted successfully", session });
    } catch (error) {
        console.error('Error accepting session:', error);
        res.status(500).json({ message: 'An error occurred while accepting the session' });
    }
};

module.exports = {
    SessionBooking,
    RejectSession,
    AcceptSession, 
};
