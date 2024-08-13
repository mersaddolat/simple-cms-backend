const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 256
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 256
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


const Post = mongoose.model("Post", postSchema);


module.exports = {
    Post,
}