const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const User = mongoose.model('User');

exports.createUser = async (req, res) => {
    const user = await new User(req.body).save();
    const token = jwt.encode(user._id, process.env.SECRET);
    return res.json({
        success: true,
        message: 'Successfully created a new user',
        token
    });
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
        // no error and password matches, issue that token :)
        const token = jwt.encode(user._id, process.env.SECRET);
        res.json({
            success: true,
            message: 'Authentication successful. Enjoy your token',
            token: token
        });
    });
};