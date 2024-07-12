const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});

const UserCollection = mongoose.model("UserCollection", blogSchema);
module.exports = UserCollection;
