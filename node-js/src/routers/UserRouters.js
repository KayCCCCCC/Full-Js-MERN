const express = require('express');
const { UserController } = require('../controllers/UserController')
const { authMiddleWare, authUserMiddleWare } = require('../middlewares/AuthMiddleWare')
const router = express.Router();
const cors = require("cors");

router.post('/create', UserController.createUser)
router.post('/signin', UserController.loginUser)
router.post('/signout', UserController.logoutUser)
router.put('/update-user/:id', authUserMiddleWare, UserController.updateUser)
router.delete('/delete-user/:id', authMiddleWare, UserController.deleteUser)
router.get('/getAll', authMiddleWare, UserController.getAllUser)
router.get('/get-details/:id', authUserMiddleWare, UserController.getDetailsUser)
router.post('/refresh-token', UserController.refreshToken)
router.post('/delete-many', authMiddleWare, UserController.deleteMany)

module.exports = router