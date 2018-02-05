const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.createUser = async (req, res) => {
    const user = await new User(req.body).save();
    res.send(user);
};

exports.authenticateUser = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        res.json({
            success: false,
            message: 'Authentication failed. User not found'
        });
    } else if (user.password !== req.body.password) {
        res.json({
            success: false,
            message: 'Authentication failed. Wrong password'
        });
    } else { // TODO: Need to actually generate the token :)
        res.json({
            success: true,
            message: 'Enjoy your token'
        });
    }
};