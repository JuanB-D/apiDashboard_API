import mongoose from "mongoose";

const apiKeySchema = mongoose.Schema({
    service: {type: String, required:true},
    apiKey: {type: String, required: true},
    timesUsed: {type: Number, default: 0},
    limit: {type: Number, required: true}
})

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    apiKeys: [apiKeySchema]
})

const User = mongoose.model('User', userSchema);

export default User;