
require('dotenv').config()

module.exports={
    MONGODB_URL:process.env.MONGODB_URL,
    PORT:process.env.PORT || 3000,
    PINATA_JWT:process.env.PINATA_JWT,
    GATEWAY_URL:process.env.GATEWAY_URL,
    JWT_SECRET:process.env.JWT_SECRETKEY
    
};