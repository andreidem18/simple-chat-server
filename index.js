require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.static(path.join(__dirname, "public")))

app.use(cors());

const PORT = process.env.PORT || 8000;

const server = app.listen(8000, () => {
    console.log('Server on port', 8000);
});

const SocketIO = require('socket.io');
const io = SocketIO(server)

io.on('connection', socket => {
    socket.broadcast.emit('new-conection', {
        message: 'someone joined'
    })
    socket.on('message', data => {
        io.sockets.emit('message', data)
    })
    socket.on('typing', (user) => {
        socket.broadcast.emit('typing', user)
    })
 })

app.use(express.static(path.join(__dirname + 'public')));