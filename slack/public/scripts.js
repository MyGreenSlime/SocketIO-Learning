const username = prompt("what is your username")
const socket = io('http://localhost:9000',{
    query: {
        username
    }
});
let nsSocket = "";

socket.on('nsList', (data)=>{
    console.log("the list of ns", data)
    let namespacesDiv = document.querySelector('.namespaces')
    namespacesDiv.innerHTML = "";
    data.map(ns => {
        namespacesDiv.innerHTML+= `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"></div>`
    })

    Array.from(document.getElementsByClassName('namespace')).forEach(ele => {
        ele.addEventListener('click', (e) => {
            const endPoint  = ele.getAttribute('ns');
            joinNs(endPoint)
        })
    })

})

