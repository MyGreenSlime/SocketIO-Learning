function joinNs(endpoint){
    if(nsSocket){
        nsSocket.close()
        document.querySelector('#user-input').removeEventListener('submit', formSubmission)
    }
    nsSocket = io(`http://localhost:9000${endpoint}`)
    nsSocket.on('nsRoomLoad', (nsRooms) => {
        let roomList = document.querySelector('.room-list');
        roomList.innerHTML = "";
        nsRooms.forEach(room => {
            let glyph 
            if(room.privateRoom){
                glyph = 'lock'
            } else {
                glyph = 'globe'
            }
            roomList.innerHTML += `<li class ='room' rm = "${room.roomTitle}"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`
        })
        let roomNodes = document.getElementsByClassName('room')
        Array.from(roomNodes).forEach(elem => {
            elem.addEventListener('click', (e) => {
                let roomName = elem.getAttribute('rm')
                console.log(roomName)
                joinRoom(roomName)
            })
        })

    })

    document.querySelector('.message-form').addEventListener('submit', formSubmission)

    nsSocket.on('messageToClient', (msg) => {
        console.log(msg)
        let html = buildMessageHTML(msg)
        document.querySelector('#messages').innerHTML += html
    })
}

function formSubmission(event){
    event.preventDefault()
    const newMessage = document.querySelector('#user-message').value
    nsSocket.emit('newMessageToServer', {text : newMessage})
}

function buildMessageHTML(msg){
    const convertTime = new Date(msg.time).toLocaleString();
    const newHTML = `<li>
    <div class="user-image">
        <img src="${msg.avatar}" />
    </div>
    <div class="user-message">
        <div class="user-name-time">${msg.username} <span>${convertTime}</span></div>
        <div class="message-text">${msg.text}</div>
    </div>
    </li>`
    return newHTML
}