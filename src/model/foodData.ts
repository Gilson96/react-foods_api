import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

type FoodTypes = {
    _id: Types.ObjectId,
    name: string,
    price: string,
    description: string,
    poster_image: string,
    quantity: number,
    restaurant: { _id: Types.ObjectId },
}

const foodSchema = new Schema<FoodTypes>({
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
        type: Number,
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
})


const Food = mongoose.model('Food', foodSchema);
export default Food