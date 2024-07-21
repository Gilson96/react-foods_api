const mongooose = require('mongoose')

const connectDB = async () => {
  try {
    await mongooose.connect("mongodb+srv://grafael99:MvxubfKOqNXgVN0w@cluster0.azizgqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

    
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB