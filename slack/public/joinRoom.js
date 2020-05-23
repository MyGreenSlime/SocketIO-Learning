function joinRoom(roomName){
    nsSocket.emit('joinRoom', roomName, (newNumberOfMember)=>{
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMember} <span class="glyphicon glyphicon-user"></span>`
    })
    nsSocket.on('historyCatchUp', (history) => {
        const  messageUl = document.querySelector('#messages');
        messageUl.innerHTML = "";
        history.forEach(msg => {
            const newMsg = buildMessageHTML(msg)
            const currentMessage = messageUl.innerHTML
            messageUl.innerHTML = currentMessage + newMsg
        })
        messageUl.scrollTo(0,messageUl.scrollHeight)
    })
    nsSocket.on('updateMembers', (numMembers) => {
        document.querySelector('.curr-room-num-users').innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"></span>`
        document.querySelector('.curr-room-text').innerHTML = `${roomName}`
    })

    let searchBox = document.querySelector('#search-box')
    searchBox.addEventListener('input', (e) => {
        console.log(e.target.value)
        let messages =Array.from(document.getElementsByClassName('message-text'))
        messages.forEach((msg) => {
            if(msg.innerText.indexOf(e.target.value) === -1) {
                msg.style.display = "none";
            } else {
                msg.style.display = "block";
            }
        })
    })
}