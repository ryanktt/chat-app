const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const path = require('path');

const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index');
});

messageArr = [];

io.on('connection', socket => { 
    console.log(`Socket conectado: ${socket.id}`)

    socket.emit('previousMessages', messageArr)

    socket.on('sendMessage', data => {
        messageArr.push(data);
        socket.broadcast.emit('receivedMessage', data)
    })
})

const port = process.env.PORT;
server.listen(port); 
console.log(`running on port ${port}`);