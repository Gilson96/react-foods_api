const mongoose = require('mongoose');
const { Schema } = mongoose;

const recommendedFoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    poster_image: {
        type: String,
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
})


const recommendedFood = mongoose.model('RecommendedFood', recommendedFoodSchema);
module.exports = recommendedFood