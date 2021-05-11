import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Messages from '../components/Messages';
import Inputs from '../components/Inputs';

import '../styles/pages/message-app.css';

let socket: SocketIOClient.Socket;

interface ILocation {
    location: Location;
}

interface Message {
    id?: string;
    user: string;
    text: string;
}

interface RoomData {
    room: string;
    users: Array<string>;
}

interface IsTyping {
    name: unknown;
    isTyping: boolean;
}

function MessageApp({ location }: ILocation) {

    const [name, setName] = useState<unknown>('');
    const [room, setRoom] = useState<unknown>('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [isInputFocused, setInputFocus] = useState(false)
    const [userIsTyping, setUserIsTyping] = useState<IsTyping>({name, isTyping: isInputFocused});

    const ENDPOINT = 'localhost:3333';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT);
        
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
        
        });

        return () => {
            socket.emit('disconnect');

            socket.disconnect();
        }
    }, [ENDPOINT, location.search])


    useEffect(() => {
        socket.on('message', (message: Message) => {
            setMessages([...messages, message])
        })

        socket.on('roomData', ({room, users}: RoomData) => {
            setUsers([...users]);
        })
    }, [messages])


    useEffect(() => {
        
        socket.emit('userType', { message })

    
        socket.on('typing', ({ name, isTyping }: IsTyping) => {
            setUserIsTyping({name, isTyping});
            console.log('ddd');
            
        })

        console.log(userIsTyping);
        
   

    }, [message])

  

    function sendMessage() {
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    

    return (
        <div className="message-app">
         
            <Header room={room} />

            <div className="container">
                
                <Sidebar users={users} />
                
                    <div className="content">
                        <Messages name={name} messages={messages} />

                        <Inputs
                            message={message}
                            setMessage={setMessage}
                            sendMessage={sendMessage}
                            name={name}
                            userIsTyping={userIsTyping}
                            isInputFocused={isInputFocused}
                            setInputFocus={setInputFocus}
                        />
                    </div>
                
                </div>
            </div>
            
       
    );
}

export default MessageApp;