const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    poster_image: {
        type: String,
    },
    restaurants: [{ 
        type: mongoose.Types.ObjectId, 
        required: true, 
        ref: 'Restaurant'
    }],
})

const user = mongoose.model('Category', categorySchema);
module.exports = user