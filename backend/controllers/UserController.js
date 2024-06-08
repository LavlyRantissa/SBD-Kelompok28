const { signIn, signUp, getUser, topupUser, getUserById, updateUser, deleteUser } = require('../models/UserModel');

const handleSignIn = async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const user = await signIn(identifier, password);
        res.status(200).json({ message: 'Sign in successful', data: user });
    } catch (error) {
        res.status(400).json({ message: 'Sign in failed', error: error.message });
    }
};

const handleSignUp = async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;
    try {
        const user = await signUp(username, email, password, phoneNumber);
        res.status(201).json({ message: 'Sign up successful', data: user });
    } catch (error) {
        res.status(400).json({ message: 'Sign up failed', error: error.message });
    }
};

const handleGetUser = async (req, res) => {
    try {
        const users = await getUser();
        res.status(200).json({ message: 'User retrieval successful', data: users });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
    }
};

const handleGetUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (user) {
            res.status(200).json({ message: 'User retrieval successful', data: user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
    }
};

const handleTopupUser = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        const user = await topupUser(id, amount);
        res.status(200).json({ message: 'Top-up successful', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to top-up', error: error.message });
    }
};

const handleUpdateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, phoneNumber, password } = req.body;
    try {
        const user = await updateUser(id, username, email, phoneNumber, password);
        res.status(200).json({ message: 'User update successful', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

const handleDeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteUser(id);
        res.status(200).json({ message: 'User deletion successful' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

module.exports = { handleSignIn, handleSignUp, handleGetUser, handleTopupUser, handleGetUserById, handleUpdateUser, handleDeleteUser };