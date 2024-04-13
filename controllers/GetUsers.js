// Assuming you have a User model set up
const { User } = require('../models/User');


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Excluding the password field for security
        res.json(users);
    } catch (error) {
        console.error('Failed to retrieve users:', error);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
};

module.exports = {
    getAllUsers

}
