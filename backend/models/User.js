const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value)
            },
            message: 'Your username must contain only English letters and digits!'
        }
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);