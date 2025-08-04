
const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: ""
    },
    followers: [{
        type: ObjectId,
        ref: "user"
    }],
    following: [{
        type: ObjectId,
        ref: "user"
    }]

})

module.exports = mongoose.model("User", userSchema)