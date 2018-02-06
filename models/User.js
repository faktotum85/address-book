const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// TODO: Need to encrypt password
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

userSchema.pre('save', next => {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return done(err);
        }
        done(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);