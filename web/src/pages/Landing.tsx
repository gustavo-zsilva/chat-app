import React, { FormEvent, useState } from 'react';
import { FiLogIn, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import styleSheet from '../utils/selectThemes';
import roomOptions from '../utils/selectRoomOptions';
import '../styles/pages/landing.css';

function Landing() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    function handleFormSubmit(event: FormEvent) {
        if (!name || !room) {
            event.preventDefault();
            return;
        }
    }

    function handleSelectRoom(event: any) {
        setRoom(event.value)
    }

    return (
        <div className="landing-page">
            <header>
                <h1>Entrar</h1>
            </header>

            <main>
                <form onSubmit={event => event.preventDefault()}>
                    <div className="input-block">
                        <label htmlFor="username-input">nome de usuário</label>
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>

                    <Select
                        theme={styleSheet.customTheme}
                        options={roomOptions}
                        onChange={handleSelectRoom}
                        className="select-chats"
                        placeholder="Selecione a sala"
                        isSearchable
                    />

                    <Link onClick={handleFormSubmit} to={`/app?name=${name}&room=${room}`} className="enter-app">
                        Pronto!
                        <FiLogIn size={32} color="#F2F2F2" style={{marginLeft: '1rem'}} />
                    </Link>
                </form>
            </main>

            <footer>
                Feito com <FiHeart /> por <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/gustavo-zsilva"
                >
                    Gustavo Silva
                </a>
            </footer>
        </div>
    );
}

export default Landing;