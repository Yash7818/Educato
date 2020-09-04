import express from 'express'
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute'
import videoRoute from './routes/videoRoute'
dotenv.config()
const mongodbUrl = config.MONGODB_URL

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('Mongoose Connected')).catch(error => console.log(error.reason));

const app = express()
app.use(bodyParser.json())
app.use(express.json());
// app.use("/api/users", userRoute)
// app.use("/api/video", videoRoute)
app.use(userRoute);
app.use(videoRoute);


app.listen(5000, () => {
    console.log('server started at 5000')
})