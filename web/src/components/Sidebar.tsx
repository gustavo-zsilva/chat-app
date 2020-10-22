import React from 'react';
import { BiCircle } from 'react-icons/bi'

import '../styles/components/sidebar.css';

interface SidebarProps {
    users: Array<User>;
}

interface User {
    id: string;
    room: string;
    name: string;
}

function Sidebar({ users }: SidebarProps) {
    return (
        <aside>
            <ul>
                {
                    users.map((user: User) => {
                        return <li key={user.id}>
                            <BiCircle size={18} color="#00ee00" className="online-icon" />
                            {user.name}
                        </li>
                    })
                }
            </ul>
        </aside>
    );
}

export default Sidebar;