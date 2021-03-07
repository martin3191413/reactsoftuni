const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Shoe', shoeSchema);