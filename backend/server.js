import express from 'express'
import dotenv from 'dotenv'
import config from './config/config'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute'
import videoRoute from './routes/videoRoute'
import examRoute from './routes/examRoute'
import Cors from 'cors'
import socket from 'socket.io'
import http from 'http'

dotenv.config()
const mongodbUrl = config.MONGODB_URL

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('Mongoose Connected')).catch(error => console.log(error.reason));

const app = express()
app.use(bodyParser.json())
app.use(Cors())
app.use("/api/users", userRoute)
app.use("/api/video", videoRoute)
app.use("/api/exam", examRoute)
const server = http.createServer(app)
const io = socket(server);

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 8) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        console.log(users)
        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});
server.listen(5000, () => {
    console.log('server started at 5000')
})