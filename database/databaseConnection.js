const mongoose = require("mongoose")


async function connectToDb(){

await mongoose.connect("mongodb+srv://intaf:txYUXGutWFI0t6XY@cluster0.qfj1j3b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   console.log("Database connected")
}
module.exports = connectToDb