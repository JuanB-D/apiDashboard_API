import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import https from 'https'
import fs from 'fs'
import cookieParser from 'cookie-parser';
dotenv.config();

const privateKey = fs.readFileSync('private.key', 'utf-8');
const certificate = fs.readFileSync('certificate.crt', 'utf-8')
const credentials = {key: privateKey, cert: certificate}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

import UserRouter from './routes/User.Routes.js';
app.use('/auth', UserRouter)

app.listen(PORT, () =>{
    console.log(`app running in port ${PORT}`)
})
