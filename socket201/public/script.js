const socket = io('http://localhost:9000')
const socket2 = io('http://localhost:9000/admin')

socket.on('connect', () => {
    console.log(socket.id)    
})
socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit('messageToServer', {data : "Fuck data from client"})
})

socket.on('joined', (msg)=> {
    console.log(msg)
})

socket.on('message', (msg) => {
    let ul = document.getElementById('message')
    let message = document.createElement('li')
    message.textContent = msg.text
    ul.appendChild(message)
})

socket2.on('welcome', (dataFromServer)=>{
    console.log(dataFromServer)
})


document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault()
    console.log("From Submitted!")
    let text = document.getElementById('user-message').value
    console.log(text)
    socket.emit("message", {text : text})
    document.getElementById('user-message').value = ""
})