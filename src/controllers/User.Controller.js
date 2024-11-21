import UserService from "../services/User.Service.js";
const UserController = {
    Login: async(req, res) =>{
        try {
            const {email, password} = req.body;
            if(
                !email ||
                !password
            ){
                throw new Error('All params required')
            }

            const response = await UserService.Login({email, password});

            if(!response){
                throw new Error('invalid credentials')
            }
            res.cookie('email', response.email, {httpOnly:true, secure: process.env.NODE_ENV === 'production'});
            res.cookie('token', response.token, {httpOnly: true, secure: process.env.NODE_ENV === 'production'});
            res.status(200).send({message: 'Login succesfully'});

        } catch (error) {
            res.status(400).send({message: error.message})
        }
    },
    Register: async(req, res) =>{
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const {name, email, password} = req.body;
            if(
                !name ||
                !email ||
                !password
            ){
                throw new Error('All params required ')
            }

            if(!emailRegex.test(email)){
                throw new Error('invalid email format')
            }
            if(password.length < 7){
                throw new Error('password too short')
            }

            const response = await UserService.Register({name, email, password});
            if(!response){
                throw new Error('Error registering user')
            }

            res.status(201).send({message: `user register succesfully ${name}`})
        } catch (error) {
            res.status(400).send({message: `error during register: ${error}`})
        }
    },
    getApiKey: async(req, res) =>{
        try{
            const {email, service, limit} = req.body || req.cookies;
            if(!email || !service || !limit){
                throw new Error('All params required')
            }
            const response = await UserService.getApiKey({email, service, limit});
            if(!response){
                throw new Error('error during creating a new ApiKey')
            }
            res.status(201).send({message: 'api key created succesfully'})
        }
        catch(error){
            res.status(400).send({message: error.message})
        }
    },
    getAllKeys: async(req, res) =>{
        try{
            const {email} = req.params || req.cookies;
            if(!email){
                throw new Error('All params required')
            }
    
            const response = await UserService.getAllKeys({email});
            if(!response){
                throw new Error('user not found')
            }
            res.status(200).send(response.data);
        }
        catch(error){
           res.status(400).send({message: error.message})
        }
    }
}
export default UserController;