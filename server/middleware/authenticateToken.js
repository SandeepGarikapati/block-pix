const jwt = require('jsonwebtoken');
async function authenticateToken(req, res, next) {
    try {
        const secret_key="5f4dcc3b5aa765d61d8327deb882cf99";
        const token = req.headers['x-access-token'];
        
        if (!token) {
            throw new Error("Token not found");
        }
        
       const decoded = jwt.verify(token, secret_key);
    //    console.log(decoded);
        req.address = decoded.address;
        next();

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    
}

module.exports = {authenticateToken}