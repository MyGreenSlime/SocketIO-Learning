const express = require('express')
const app = express()
const socketio =  require("socket.io")
app.use(express.static(__dirname+'/public'))

const  expressServer  = app.listen(9000)

const io =socketio(expressServer)
io.on('connection', (socket) =>{
    socket.emit('messageFromServer', {text : "Fuck EveryOne I am from Server"})
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient)
    })
    socket.join('level1')
    socket.to('level1').emit('joined', `${socket.id} says I have joined the level1 room!`)
})

io.of('/admin').on('connection', (socket) => {
    console.log("Someone Connected to the admin namespace!")
    io.of('/admin').emit('welcome', {text : "Welcome to the admin channel!"})
})
