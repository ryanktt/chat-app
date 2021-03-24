const socket = io('http://localhost:3000');

window.addEventListener('load', () => {
    document.querySelector('.login').classList.add('active');
    document.querySelector('.backdrop').classList.add('active');
    
});

let clientName = '';

const renderMessage = (data) => {
    const {name, message} = data;
    if(clientName === name){
        document.querySelector('.chat').insertAdjacentHTML('beforeend', `<div class="my-message message">
        <h5 class="username">${name}</h5>
        <p class="message-text">${message}</p>
        </div>`)
    } else {
        document.querySelector('.chat').insertAdjacentHTML('beforeend', `<div class="other-message message">
        <h5 class="username">${name}</h5>
        <p class="message-text">${message}</p>
        </div>`)
    }

}

socket.on('previousMessages', (dataArr) => {
    dataArr.forEach(message => {
        renderMessage(message);
    });
})

socket.on('receivedMessage', (data) => {
    renderMessage(data);
});

let messageObj = {}

const onSubmitLogin = (e) => {
    e.preventDefault();
    const name =  document.querySelector('#login #name').value;
    if(name.length) {
        clientName = name;
        messageObj = {
            name: name
        }
        document.querySelector('.login').classList.remove('active')
        document.querySelector('.backdrop').classList.remove('active')
    }
    
}

const onSubmitMessage = (e) => {
    e.preventDefault();
    const message =  document.querySelector('#message').value;
    if(message.length) {
        messageObj = {
            ...messageObj,
            message: message
        }
        document.querySelector('#message').value='';
        socket.emit('sendMessage', messageObj);
        renderMessage(messageObj);                  
    }
    
}


