const mongooose = require('mongoose')

const connectDB = async () => {
  try {
    await mongooose.connect("mongodb+srv://grafael99:D2L6ngrfSxn5cvhl@reactfoods.6641u.mongodb.net/?retryWrites=true&w=majority&appName=reactFoods")
    
    
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB