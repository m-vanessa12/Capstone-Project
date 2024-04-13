// const { User } = require('../models/User.js');
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../middleware/isAuthenticated.js');

// Account creation for users handler
const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,

        });

        // Save the user to the database
        await newUser.save();

        res.json({ message: 'Account created!' });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Error creating account.' });
    }
};

const login = async(req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

   await  User.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({ error: err });
                    }
                    if (result) {
                        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, 'verySecreteValue', { expiresIn: '1h' });
                        res.json({
                            message: 'Login Successful',
                            token
                            // role: user.role
                        });
                    } else {
                        res.json({ message: 'Password Incorrect' });
                    }
                });
            } else {
                res.json({ message: 'User not found' });
            }
        })
        .catch(error => {
            console.error('Error during login:', error,res.status());
            res.status(500).json({ message: 'Error during login.' });
        });
};

// Controller function for changing password
const changePassword = async (req, res, next) => {
    try {
        // Extract user ID from the JWT token
        const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the Authorization header
        const decodedToken = jwt.verify(token, 'verySecreteValue');
        const userId = decodedToken.id;
        //console.log(userId)

        // Extract current password, new password, and confirm new password from request body
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'Match New password and confirm new password' });
        }

        // Check if the current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in the database
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    register,
    login,
    changePassword
};
