const express = require('express')
const app = express()
const socketio =  require("socket.io")
let namespaces = require("./data/namespaces")




app.use(express.static(__dirname+'/public'))

const  expressServer  = app.listen(9000, ()=>{
    console.log("listen on port", 9000)
})

const io =socketio(expressServer)


io.on('connection', (socket) =>{
    let nsData = namespaces.map(ns => {
        return {
            img : ns.img,
            endpoint : ns.endpoint
        }
    })
    socket.emit('nsList', nsData)
    
})

namespaces.map(namespace =>{
    io.of(namespace.endpoint).on('connection', (socket) => {
        const username  = socket.handshake.query.username
        console.log(`${socket.id} has joined ${namespace.endpoint}`)
        socket.emit('nsRoomLoad', namespace.rooms)
        socket.on('joinRoom', (roomToJoin, numberOfUsersCallback)=> {
            const previousRoom = Object.keys(socket.rooms)[1]
            socket.leave(previousRoom)
            updateRoomMember(namespace, previousRoom)
            socket.join(roomToJoin)
            io.of(namespace.endpoint).in(roomToJoin).clients((error, clients) => {
                console.log(clients)
                numberOfUsersCallback(clients.length);
            })
            const currRoom = namespace.rooms.find(room => {
                return room.roomTitle == roomToJoin
            })

            socket.emit('historyCatchUp', currRoom.history)

            updateRoomMember(namespace, roomToJoin)    
        })
        socket.on('newMessageToServer', (msg)=>{
            const fullMsg = {
                text : msg.text,
                time : Date.now(),
                username : username,
                avatar : 'https://via.placeholder.com/30'
            }
            const roomTitle = Object.keys(socket.rooms)[1]
            const currRoom = namespace.rooms.find(room => {
                return room.roomTitle == roomTitle
            })
            currRoom.addMessage(fullMsg)
            console.log(currRoom.roomTitle)
            io.of(namespace.endpoint).in(currRoom.roomTitle).emit('messageToClient', fullMsg)
        })
      
    })
})


function updateRoomMember(namespace, room){
    io.of(namespace.endpoint).in(room).clients((error, clients) => {
        io.of(namespace.endpoint).in(room).emit("updateMembers", clients.length)
    }) 
}