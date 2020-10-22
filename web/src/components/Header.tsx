import React from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/components/header.css';

interface HeaderProps {
    room: unknown;
}

function Header({ room }: HeaderProps) {
    return (
        <header className="app-header">
            <Link to="/" className="go-back">
                <FiArrowLeft size={36} color="#F2F2F2" style={{verticalAlign: 'middle'}} />
            </Link>
            
            <h1># {room}</h1>
        </header>
    );
}

export default Header;