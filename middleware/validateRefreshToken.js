const jwt = require('jsonwebtoken');
const validateRefreshToken = (req,res,next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader){
        token = authHeader.split(' ')[1];
        if(token){
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoder) =>{
                if(err){
                    res.status(401);
                    throw new Error('Invalid token')
                }

                const user = decoder.user
                const token = jwt.sign({
                    user
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'10m'}
                )

                const refreshToken = jwt.sign({
                    user
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'20m'}
                )
                req.token = token;
                req.refreshToken = refreshToken;
                req.user = user;
                next();
            })
        }
    }

    if(!token){
        res.status(400);
        throw new Error('Invalid token')
    }
}

module.exports = validateRefreshToken; 