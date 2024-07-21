const Food = require("../model/foodData")
const Person = require("../model/personData")

// Get all Food data
exports.getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get a specific Food
exports.getFood = async (req, res) => {
    const id = req.params.id;
    try {
        const food = await Food.findOne({ id: id });
        res.status(200).json(food);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Create a Food
exports.createFood = async (req, res) => {
    console.log(req.body)
    try {
        const createFood = await Food.create(req.body)
        res.status(200).json(createFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Upadate a Food
exports.updateFood = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedFood = await Food.findOneAndUpdate({ id: id }, req.body, { new: true });
        res.status(200).json(updatedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a Food
exports.deleteFood = async (req, res) => {
    const id = req.params.id;
    try {
        await Food.findOneAndDelete({ id: id });
        res.status(200).json('deleted');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Create an Person
exports.createPerson = async (req, res, doctorId) => {
     const id = req.params.id;
    try {
        const createPerson = await Person.create(req.body)
        const updatedFood = await Food.findOneAndUpdate({ id: id }, {$push: {appoitments: createPerson}}, { new: true });

        res.status(200).json(createPerson, updatedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get person's booking
exports.getPerson = async (req, res) => {
    const id = req.params.id;
    try {
        const persons = await Food.findOne({id: id}).populate('persons', "-_id -__v" );
        res.status(200).json(persons);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
