const { signIn, signUp, getUser, topupUser, getUserById, updateUser, deleteUser } = require('../models/userModel');

const handleSignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await signIn(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const handleSignUp = async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;
    try {
        const user = await signUp(username, email, password, phoneNumber);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const handleGetUser = async (req, res) => {
    try {
        const users = await getUser();
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

const handleTopupUser = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        const user = await topupUser(id, amount);
        res.status(200).json(user);
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

module.exports = { handleSignIn, handleSignUp, handleGetUser, handleTopupUser, handleGetUserById, handleUpdateUser, handleDeleteUser };