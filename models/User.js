const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Need to encrypt password
const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);