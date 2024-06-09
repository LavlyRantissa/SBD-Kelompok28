const express = require('express');
const router = express.Router();
const { handleSignIn, handleSignUp, handleGetUser, handleTopupUser, handleGetUserByIdentifier, handleUpdateUser, handleDeleteUser, handleCheckUsername, handleCheckEmail, handleForgotPassword, handleAccountExist, handlePicture, handleAddress, handlePhoneNumber} = require('../controllers/UserController');

router.post('/signin', handleSignIn);
router.post('/signup', handleSignUp);
router.get('/checkEmail/:email', handleCheckEmail);
router.get('/checkUsername/:username', handleCheckUsername);
router.get('/checkAccount/:identifier', handleAccountExist);
router.get('/info', handleGetUser);
router.get('/info/:identifier', handleGetUserByIdentifier);
router.post('/topup/:identifier', handleTopupUser);
router.post('/address/:identifier', handleAddress);
router.post('/phonenumber/:identifier', handlePhoneNumber);
router.put('/info/:identifier', handlePicture);
router.put('/forgotPassword', handleForgotPassword);
router.delete('/:id', handleDeleteUser);

module.exports = router;