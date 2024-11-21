import User from "../db/models/User.Model.js";
import connectDB from "../db/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import crypto from 'crypto'
dotenv.config();

connectDB();
const UserService = {
    Login: async(params) =>{
        try {
            const {email, password} = params;
            const user = await User.findOne({email});
            if(!user){
                throw new Error('user not found')
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                throw new Error('Incorrect password')
            }
            const rpst = {
                user_id: user._id,
                email,
                name: user.name
            }
            const token = await jwt.sign(rpst, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            if(!token){
                throw new Error('error validation jwt secret key')
            }

            return { token, email}
        } catch (error) {
            throw new Error(error)
        }
    },
    Register: async(params) =>{
        try {
            const {name, email, password} = params;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already in use');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({name, email, password: hashedPassword});
            await newUser.save();

            return name;
        
        } catch (error) {
            
        }
    },
    getApiKey: async(params) =>{
        try{
            const {email, service, limit} = params;
            const user = await User.findOne({email});
            if(!user){
                throw new Error('user not found')
            }
            const apiKey = crypto.randomBytes(32).toString('hex');

            if( limit <= 0){
                throw new Error('invalid limit value')
            }
            user.apiKeys.push({
                apiKey,
                service,
                limit
            });
            await user.save();

            return {apiKey};
        }
        catch(error){
            throw new Error(error)
        }
    },
    getAllKeys: async(params) =>{
        try{
            const {email} = params;
            const user = await User.findOne({email});
            if(!user){
                throw new Error('user not found')
            }
            
            return {data: user.apiKeys};
        }
        catch(error){
            throw new Error(error)
        }
    }
}
export default UserService;