import React, { useState, useEffect, useRef, FormEvent } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';


import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/message-app.css';

let socket: SocketIOClient.Socket;

interface ILocation {
    location: Location;
}

interface Message {
    user: string;
    text: string;
}

interface Users {
    room: string;
    users: Array<string>;
}

function MessageApp({ location }: ILocation) {

    const [name, setName] = useState<unknown>('');
    const [room, setRoom] = useState<unknown>('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const messageInputRef = useRef();

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

        socket.on('roomData', ({room, users}: Users) => {
            setUsers([...users]);
        })
    }, [messages])


    function sendMessage(event: FormEvent) {

        event.preventDefault();
        
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    

    return (
        <div className="message-app">
            <header>
                <Link to="/" className="go-back">
                    <FiArrowLeft size={36} color="#F2F2F2" style={{verticalAlign: 'middle'}} />
                </Link>
            <h1># {room}</h1>
            </header>

            <div className="container">
                <aside>
                        <ul>
                            {
                                users.map((user, i) => {
                                    return <li key={i}>{user.name}</li>
                                })
                            }
                        </ul>
                </aside>
                
                    <div className="content">
                        <div className="messages-area">
                            <ul>
                                {
                                    messages.map((msg, i) => {
                                        return <li key={i}> {msg.user} {msg.text}</li>
                                    })
                                }
                            </ul>
                        </div>

                        <div className="input-block">
                            <input
                                type="text"
                                value={message}
                                onChange={event => setMessage(event.target.value)}
                                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null }
                                ref={messageInputRef}
                            />
                            <button type="button" onClick={sendMessage}>send</button>
                        </div>
                    </div>
                
                </div>
            </div>
            
       
    );
}

export default MessageApp;