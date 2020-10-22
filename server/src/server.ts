import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import { addUser, removeUser, getUser, getUsersInRoom } from './users';

import router from './routes';

const PORT = process.env.PORT || 3333;

const app = express();

const server = http.createServer(app);
const io = socketio(server);



io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        
        // Esta linha estava retornando um problema de desestruturação
        // em um elemento null / undefined. Por isso o "|| {}" no final.
        // Caso seja undefined ou null ele será entendido como um objeto vazio.

        // O real problema é que a função não retornava o objeto "user".
        const { error, user } = addUser({ id: socket.id, name, room }) || {};

        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room || 'global'}!` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });
    
    socket.on('disconnect', () => {
        const removedUser = removeUser(socket.id)

        if(removedUser) {
            io.to(removedUser.room).emit('message', { user: 'admin', text: `${removedUser.name} has left.` })
            io.to(removedUser.room).emit('roomData', { room: removedUser.room, users: getUsersInRoom(removedUser.room) })
        }
    })
})

app.use(router);


server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));