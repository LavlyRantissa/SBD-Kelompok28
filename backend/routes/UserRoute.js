const express = require('express');
const router = express.Router();
const { handleSignIn, handleSignUp, handleGetUser, handleTopupUser, handleGetUserById, handleUpdateUser, handleDeleteUser } = require('../controllers/userController');

router.post('/signin', handleSignIn);
router.post('/signup', handleSignUp);
router.get('/info', handleGetUser);
router.get('/info/:id', handleGetUserById);
router.post('/:id/topup', handleTopupUser);
router.put('/:id', handleUpdateUser);
router.delete('/:id', handleDeleteUser);

module.exports = router;
