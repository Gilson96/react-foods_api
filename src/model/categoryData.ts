import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

type CategoryTypes = {
    _id: Types.ObjectId,
    name: string,
    price: string,
    description: string,
    poster_image: string,
    quantity: number,
    restaurants: [{ _id: Types.ObjectId }],
}

const categorySchema = new Schema<CategoryTypes>({
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

export default user