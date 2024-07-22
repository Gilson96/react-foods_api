const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
    id: Number,
    image: String,
    name: String,
    price: String,
    description: String
})


const Food = mongoose.model('Food', foodSchema);
module.exports = Food