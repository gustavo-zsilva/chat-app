import React from 'react';

import '../styles/components/inputs.css';

interface IsTyping {
    name: unknown;
    isTyping: boolean;
}

interface InputsProps {
    message: unknown;
    setMessage: Function;
    sendMessage: Function;
    name: unknown;
    userIsTyping: IsTyping;
    isInputFocused: boolean;
    setInputFocus: Function;
}

function Inputs({ message, setMessage, sendMessage, name, userIsTyping, isInputFocused, setInputFocus }: InputsProps) {
    return (
        <div className="inputs">
            <p className="user-typing">
                {
                    userIsTyping && `${name} is typing...`
                }
            </p>
            <div className="input-block">
                <input
                    type="text"
                    value={String(message)}
                    onChange={event => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage() : null }
                    onFocus={setInputFocus(true)}
                    onBlur={setInputFocus(false)}
                />
                <button type="button" onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
    )
}

export default Inputs;