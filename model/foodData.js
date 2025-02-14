const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    poster_image: {
        type: String,
    },
    quantity: {
        type: number
    }
    restaurant: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
})


const Food = mongoose.model('Food', foodSchema);
module.exports = Food