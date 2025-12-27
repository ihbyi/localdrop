const users = [];

const createUser = (id, name, type) => {
    const user = {
        id,
        name,
        type,
    };

    users.push(user);
    return user;
};

const updateUser = (user) => {
    const { id } = user;

    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
        users[index] = user;
        return user;
    }
    return null;
};

const removeUser = (id) => {
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) return users.splice(index, 1);
};

const getUser = (id) => {
    return users.find((u) => u.id === id);
};

const getRecievers = () => {
    return users.filter((user) => user.type === 'reciever');
};

export { createUser, updateUser, removeUser, getRecievers, getUser };
