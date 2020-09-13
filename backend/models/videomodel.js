const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
},{
    timestamps:true
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel 