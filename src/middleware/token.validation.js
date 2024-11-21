import jwt from  "jsonwebtoken";


function ValidateToken(req, res, next){
    const {token} = req.cookies || req.headers;

    if(!token){
        return res.status(401).json({message: 'access denied'})
    }

    const tokenSinBearer = token.replace('Barer', '');

    jwt.verify(tokenSinBearer, process.env.JWT_SECRET_KEY, (err, decoded) =>{
        if (err) {
            return res.status(403).json({message: 'invalid token'})
        }

        next()
    })
}

export default ValidateToken;