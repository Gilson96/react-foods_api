const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    image: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    favouritesRestaurants: [
        {
            restaurantId: {
                type: Schema.Types.ObjectId,
                ref: 'Restaurant'
            },
        }
    ],
    Orders: [
        {
            restaurantId: {
                type: Schema.Types.ObjectId,
                ref: 'Restaurant'
            },
            date: {
                type: Date
            },
            totalCost: {
                type: String
            }
        }
    ],
})

const user = mongoose.model('User', userSchema);
module.exports = user