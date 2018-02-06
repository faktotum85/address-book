const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.createUser = async (req, res) => {
    const user = await new User(req.body).save();
    res.send(user);
};

exports.authenticateUser = async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    });
    if (!user) {
        return res.json({
            success: false,
            message: 'Authentication failed. User not found'
        });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        if (!isMatch) {
            return res.json({
                success: false, 
                message: 'Authentication failed. Wrong password'
            });
        }
        res.json({
            success: true,
            message: 'Enjoy your token'
        });
    });
};