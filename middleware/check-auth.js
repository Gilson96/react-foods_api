const jwt = require('jsonwebtoken')

module.exports =  (req, res, next) => {
    // Authorization needs to be 'Bearer TOKEN'
    // using split('') to separate 'Bearer' and 'Token'
    // And using [1] to access the Token value
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        // if token is undefined throw an error
        if (!token) {
            throw new Error('Authentication failed')
        }
        // Validating the token
        const decodedToken = jwt.verify(token, 'secret');
        // Adds data to the request
        req.userData = { userId: decodedToken.userId }
        // When is valid let the rest of request continue
        next();
    } catch (err) {
        // if verification fails throws an error
      const error =  res.status(403).json({ message: 'Authentication failed!' +  err});
        return next(error);
    }
}