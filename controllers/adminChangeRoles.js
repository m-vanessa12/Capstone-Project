const { User }= require('../models/User'); // Adjust the path according to your setup

const UpdateRole = async (req, res) => {
    const userId = req.params.userId;
    const { role } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({
            message: 'User role updated successfully',
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Failed to update user role' });
    }
};


module.exports = { 
  UpdateRole 
};
