const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingsAndreviewsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
})


const ratingsAndreviews = mongoose.model('Rating&Review', ratingsAndreviewsSchema);
module.exports = ratingsAndreviews