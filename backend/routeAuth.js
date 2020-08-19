const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('authentication_token');
    if(!token) return res.status(401).send('Access denied');

    try {
       const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
       res.user = verifiedUser;
       next();
    } catch (err) {
        res.status(400).send('Invalid user');
    }
    
}