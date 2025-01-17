const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    madeAt: {
        type: String,
        required: true
    },
    items: [{
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
        },
        category:{
            type: String,
            required: true
        }
    }],
    user: {
        type: String,
        required: true
    },
    totalMoney:{
        type: Number,
        required: true
    },
    refunded:{
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Order', orderSchema);