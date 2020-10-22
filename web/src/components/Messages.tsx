import userEvent from '@testing-library/user-event';
import React from 'react';

import '../styles/components/messages.css';

interface Message {
    id?: string;
    user: string;
    text: string;
}

function Messages({ name, messages }: any) {
    return (
        <div className="messages-area">
            <ul>
                {
                    messages.map((msg: Message) => {

                            if(msg.user === name) {
                                return (
                                    <li key={msg.id} className="message user-sent">
                                        <span className="sender user-sent">
                                            {msg.user}
                                        </span>

                                        <p className="text user-sent">
                                            {msg.text}
                                        </p>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={msg.id} className="message">
                                        <span className="sender">
                                            {msg.user}
                                        </span>

                                        <p className="text">
                                            {msg.text}
                                        </p>
                                    </li>
                                )
                            }
                                    
                        }
                    )
                }
            </ul>
        </div>
    );
}

export default Messages;