const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator')

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
        required: true
    },
    favouritesRestaurants: [
        {
            restaurantId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Restaurant'
            },
        }
    ],
})

userSchema.plugin(uniqueValidator)

const user = mongoose.model('User', userSchema);
module.exports = user