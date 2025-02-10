const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    poster_image: {
        type: String,
    },
    logo_image: {
        type: String,
    },
    rating: {
        type: String,
    },
    deliveryFee: {
        type: String,
    },
    arrival: {
        type: Number,
    },
    foods: [{ 
        type: mongoose.Types.ObjectId, 
        required: true, 
        ref: 'Food'
    }],
    recommendedFoods: [{
        type: mongoose.Types.ObjectId, 
        required: true, 
        ref: 'RecommendedFood'
    }],
    ratings_and_reviews: [{
        type: mongoose.Types.ObjectId, 
        required: true, 
        ref: 'Rating&Review'
    }],
    category: {
        type: mongoose.Types.ObjectId, 
        required: true,
        ref: 'Category'
    }
   
})

const user = mongoose.model('Restaurant', restaurantSchema);
module.exports = user