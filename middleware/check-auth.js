const jwt = require('jsonwebtoken')

module.exports =  (req, res, next) => {
    // Authorization needs to be 'Bearer TOKEN'
    // using split('') to separate 'Bearer' and 'Token'
    // And using [1] to access the Token value
    try {
       
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZkODQ1YWJiNmJhYmFjNWFmZjFjOGMiLCJlbWFpbCI6InRlc3RAdGVzdDIuY29tIiwiaWF0IjoxNzQ0NjcxMTI5LCJleHAiOjE3NDQ2NzQ3Mjl9.4iQFbT9fhfecuXp0igQM3g7HadcLborwG9K2xL0f4C0";
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