const { signIn, signUp, getUser, topupUser, getUserByIdentifier, updateUser, deleteUser, checkEmail, checkUsername, forgotPassword, accountExist, insertPicture, addressUser, phoneNumberUser} = require('../models/UserModel');
const { link } = require('../routes/UserRoute');

const handleSignIn = async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const user = await signIn(identifier, password);
        return res.status(200).json({ message: 'Sign in successful', data: user });
    } catch (error) {
        return res.status(400).json({ message: 'Sign in failed', error: error.message });
    }
};

const handleCheckEmail = async (req, res) => {
    const {email } = req.params;
    try {
        const user = await checkEmail(email);
        return res.status(201).json({ message: 'Email not exist', data: user });
    } catch (error) {
        return res.status(400).json({ message: 'Email exist', error: error.message });
    }
};

const handleForgotPassword = async (req, res) => {
    const { identifier, newPassword } = req.body;
    try {
        const user = await forgotPassword(identifier, newPassword);
        return res.status(200).json({ message: 'Change password successful', data: user });
    } catch (error) {
        return res.status(400).json({ message: 'Change password failed', error: error.message });
    }
};

const handleCheckUsername = async (req, res) => {
    const {username } = req.params;
    try {
        const user = await checkUsername(username);
        res.status(201).json({ message: 'Username not exist', data: user });
    } catch (error) {
        res.status(400).json({ message: 'Username exist', error: error.message });
    }
};

const handleSignUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await signUp(username, email, password);
        res.status(201).json({ message: 'Sign up successful', data: user });
    } catch (error) {
        res.status(400).json({ message: 'Sign up failed', error: error.message });
    }
};

const handleGetUser = async (req, res) => {
    try {
        const users = await getUser(identifier);
        res.status(200).json({ message: 'User retrieval successful', data: users });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
    }
};

const handleGetUserByIdentifier = async (req, res) => {
    const { identifier } = req.params;
    console.log(identifier);
    try {
        const user = await getUserByIdentifier(identifier);
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
    const { identifier } = req.params;
    const { balance } = req.body;
    try {
        const user = await topupUser(identifier, balance);
        res.status(200).json({ message: 'Top-up successful', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to top-up', error: error.message });
    }
};

const handleAddress = async (req, res) => {
    const { identifier } = req.params;
    const { address } = req.body;
    try {
        const user = await addressUser(identifier, address);
        res.status(200).json({ message: 'Update address successful', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Update address failed', error: error.message });
    }
};

const handlePhoneNumber = async (req, res) => {
    const { identifier } = req.params;
    const { phoneNumber } = req.body;
    try {
        const user = await phoneNumberUser(identifier, phoneNumber);
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

const handleAccountExist = async (req, res) => {
    const { identifier } = req.params;
    try {
        const user = await accountExist(identifier);
        res.status(200).json({ message: 'Account exist', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to check account', error: error.message });
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

const handlePicture = async (req, res) => {
    const { identifier} = req.params;
    const { linkPicture } = req.body;
    try {
        await insertPicture(identifier, linkPicture);
        res.status(200).json({ message: 'Update profile picture successful' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile picture', error: error.message });
    }
};

module.exports = { handleSignIn, handleSignUp, handleGetUser, handleTopupUser, handleGetUserByIdentifier, handleUpdateUser, handleDeleteUser, handleCheckEmail, handleCheckUsername, handleForgotPassword, handleAccountExist, handlePicture, handleAddress, handlePhoneNumber};