import connectDB from "../db/db.js";
import User from "../db/models/User.Model.js";
connectDB();
async function apiKeyValidation(req, res, next){
    try{
        const apiKey= req.header('x-api-key');
        const user = await User.findOne({
            'apiKeys.apiKey': apiKey
        })
        if(!user){
           return res.apiKeysstatus(400).send('api key invalid')
        }

        const apiKeyU = user.apiKeys.find(key => key.apiKey=== apiKey);
        if(apiKeyU.timesUsed >= apiKeyU.limit){
            return res.status(400).send('limit exeded')
        }
        apiKeyU.timesUsed += 1;

        await user.save();
        
        next()
    }
    catch(error){
        return res.status(403).send('apiKey Invalid', error)
    }
}

export default apiKeyValidation;