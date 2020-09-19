const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const examSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    option1: {
        type: String,
        required: true,
    },
    option2: {
        type: String,
        required: true,
    },
    option3: {
        type: String,
        required: true,
    },
    option4: {
        type: String,
        required: true,
    },
    correct: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
})

const examModel = mongoose.model("Exam", examSchema);

export default examModel