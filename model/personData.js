const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    id: Number,
    fullName: String,
    email: String,
    street: String,
    postCode: String,
    city: String,
    foods: {
        type: Schema.Types.ObjectId,
        ref: "Food"
    }
   
},
    {strictPopulate: false}
)


const Person = mongoose.model('Person', personSchema);
module.exports = Person