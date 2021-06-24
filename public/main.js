const socket = io()

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

let timer = null

const timeout = () => timer = setTimeout(() => {
    actions.innerHTML = ''
}, 3000);


btn.addEventListener('click', () => {
    socket.emit('message', {
        username: username.value, 
        message: message.value
    })
});

message.addEventListener('keydown', () => socket.emit('typing', username.value))

socket.on('new-conection', ({message}) => {
    actions.innerHTML = message;
    timeout()
})

socket.on('message', ({username, message}) => {
    output.innerHTML += `<p><b>${username}</b>: ${message}</p>`
})

socket.on('typing', (user) => {
    actions.innerHTML = `${user} is typing`
    if(timer){
        console.log("Me ejecuté")
        clearTimeout(timer)
    }
    timeout()
})