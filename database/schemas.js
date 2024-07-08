const { Schema, mongoose } = require("mongoose");

const blogSchema = new Schema({
    title:{
        type: String
    },
    subtitle:{
        type : String
    },
    description:{
        type : String
    },
    image:{
        type : String
    },
    
})
const Blog = mongoose.model("Blog",blogSchema)
module.exports = Blog

