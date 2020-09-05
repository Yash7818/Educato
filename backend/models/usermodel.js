import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
<<<<<<< HEAD
    avatar: {
        type: Buffer,
        contentType: String
=======
    avatar : {
        type:String
>>>>>>> upstream/master
    }

}, {
    timestamps: true
})

const userModel = mongoose.model("User", userSchema);

export default userModel