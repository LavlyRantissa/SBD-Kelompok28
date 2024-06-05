const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../models/UserModel');

const handleCreateUser = async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;
    try {
        const user = await createUser(username, email, phoneNumber, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleGetUser = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleGetUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleUpdateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, phoneNumber, password } = req.body;
    try {
        const user = await updateUser(id, username, email, phoneNumber, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleDeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteUser(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { handleCreateUser, handleGetUser, handleGetUserById, handleUpdateUser, handleDeleteUser };