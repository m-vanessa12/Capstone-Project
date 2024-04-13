const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    // Your existing fields
    mentor: {
        type: Schema.Types.ObjectId,
        ref: 'Mentor',
        required: true,
    },
    mentee: {
        type: Schema.Types.ObjectId,
        ref: 'Mentee',
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    sessionInfo: {
        type: String,
        required: true,
    },
    meetingLink: {
        type: String,
        required: true,
    },
    rejectionReason: {
        type: String,
        required: false, // Make it optional since it's only needed for rejected sessions
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
    // Add timestamps option
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
