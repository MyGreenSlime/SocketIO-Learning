const express = require('express')
const app = express()
const socketio =  require("socket.io")
app.use(express.static(__dirname+'/public'))

const  expressServer  = app.listen(9000)

const io =socketio(expressServer)

io.on('connection', (socket) =>{
    socket.emit('messageFromServer', {data : "Fuck EveryOne I am from Server"})
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient)
    })
    socket.on('message', (msg) => {
        console.log("get message from client :",msg)
        io.emit('message', msg)
    })
})
