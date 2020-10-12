const app = require('express') ();
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', socket => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

    socket.on('chat message', msg => {
        console.log('message: ' + msg);
        io.emit('chat message', msg)
    })
})


http.listen(3000, () => console.log('Ouvindo *: 3000'))