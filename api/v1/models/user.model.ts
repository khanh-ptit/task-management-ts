import mongoose from "mongoose";
import * as generateHelper from "../../../helpers/generate"

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    status: {
        type: String,
        default: "initial"
    },
    token: {
        type: String,
        default: () => generateHelper.generateRandomString(30)
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema, "users")

export default User