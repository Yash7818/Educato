const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const examSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    questionPic: {
        type: String
    },
    option1: {
        type: String,
    },
    option1Pic: {
        type: String
    },
    option2: {
        type: String,
    },
    option2Pic: {
        type: String
    },
    option3: {
        type: String,
    },
    option3Pic: {
        type: String
    },
    option4: {
        type: String,
    },
    option4Pic: {
        type: String
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