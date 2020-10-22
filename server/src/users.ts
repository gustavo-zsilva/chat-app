
const users: Array<User> = [];

interface User {
    id: string;
    name: string;
    room: string;
}


    const addUser = ({ id, name, room }: User) => {
        // Gustavo Silva = gustavosilva

        name = name.trim().toLowerCase()
    
        const existingUser = users.find((user) => user.room === room && user.name === name);
        
        if (existingUser) {
            return { error: 'Username is taken' };
        }
    
        const user = { id, name, room };
    
        users.push(user)

        return { user };
    }
    
    const removeUser = (id: string) => {
        const index = users.findIndex((user) => user.id === id)
    
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
    }
    
    const getUser = (id: string) => {
        return users.find(user => user.id === id);
    }
    
    const getUsersInRoom = (room) => {
        return users.filter(user => user.room === room)
    }

export { addUser, removeUser, getUser, getUsersInRoom };



