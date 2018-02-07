const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
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

userSchema.pre('save', function(next) {
    if (!(this.isModified('password') || this.isNew)) return next();
    bcrypt.genSalt(12)
        .then(salt => {
            return bcrypt.hash(this.password, salt);
        })
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => next(err));
});

userSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password)
        .then(isMatch => next(null, isMatch))
        .catch(err => next(err));
};

module.exports = mongoose.model('User', userSchema);