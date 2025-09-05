const jwt = require('jsonwebtoken');
const users = require('../models/user');

// Middleware to protect routes
async function authMiddleware(req, res, next) {
    let token;
    if(req.headers.authorisation && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await users.findById(decoded.id).select('-password');
            return next();
        }
        catch(err){
            res.status(401).json({message: "Not authorised, token failed"});
        }
    }
    if(!token){
        res.status(401).json({message: "Not authorised, no token"});
    }
}

module.exports = authMiddleware;