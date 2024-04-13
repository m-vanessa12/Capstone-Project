// controllers/AdminController.js
const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const { isAdmin } = require('../middleware/isAdmin');

const addUserByAdmin = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });

        // Save user
        await newUser.save();

        return res.status(201).json({ message: 'User added successfully.', user: { id: newUser._id, email: newUser.email, role: newUser.role } });
    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).json({ message: 'Server error while adding user.' });
    }
};

module.exports = { 
    addUserByAdmin 
};
