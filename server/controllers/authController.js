const ethers = require('ethers');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/serverConfig');

async function authController(req, res) {
    

    try {
        const {signature} = req.body;
        const {address}=req.query;
        // const {address}= req.query;
        const JWT_KEY = "5f4dcc3b5aa765d61d8327deb882cf99";


        if (!signature) {
            throw new Error('Signature is invalid');
        }

        const recoveredAddress = ethers.utils.verifyMessage('Welcome to crypto World Website', signature);
        console.log(recoveredAddress);
        if(address.toLowerCase()===recoveredAddress.toLowerCase()){
            const address = recoveredAddress.toLowerCase();
            const user = await UserModel.findOne({userAddress:address})
            if(!user){
               const userData = await UserModel.create({userAddress:address})
               console.log(userData);

            }
            const token = jwt.sign({
                address
            },JWT_KEY)
            res.status(200).json({message:"Authentication Successful",token})
        }
        else{
            res.status(400).json({message:"Authentication Failed"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }

}

module.exports = {authController};