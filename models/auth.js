
const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
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
        default: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg"
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