const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
            },
            message: 'Please enter a valid email address!'
        }
    },
    password:{
        type: String,
        required: true
    },
    amountMoney:{
        type: Number,
        required: true
    },
    joinedAt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);