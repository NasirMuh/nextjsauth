import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
}, { timestamps: true }
)

const User = models.User || mongoose.model("User", userSchema)
export default User;



