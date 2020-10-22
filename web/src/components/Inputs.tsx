import React from 'react';

import '../styles/components/inputs.css';

interface InputsProps {
    message: unknown;
    setMessage: Function;
    sendMessage: Function;
}

function Inputs({ message, setMessage, sendMessage }: InputsProps) {
    return (
        <div className="input-block">
        <input
            type="text"
            value={String(message)}
            onChange={event => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage() : null }
        />
        <button type="button" onClick={() => sendMessage()}>Send</button>
    </div>
    )
}

export default Inputs;