import express from 'express';
const UserRouter = express.Router();
import UserController from '../controllers/User.Controller.js';
import ValidateToken from '../middleware/token.validation.js';
import apiKeyValidation from '../middleware/apiKey.validation.js';

UserRouter
    .post('/register', UserController.Register)
    .post('/login', UserController.Login)
    .post('/getApiKey', ValidateToken, UserController.getApiKey)
    .get('/getAllKeys/:email', ValidateToken, UserController.getAllKeys)
    .get('/found', apiKeyValidation, (req, res) => {res.send('hello world')})
export default UserRouter;