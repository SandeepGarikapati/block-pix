const ethers = require('ethers');
const UserModel = require('../models/User');
const { PinataSDK } = require("pinata-web3");
const {PINATA_JWT,GATEWAY_URL} = require('../config/serverConfig');
const {generateEncryptionKey} = require('../utils/generateKey');
const {encryptFile} = require('../utils/encryption');

async function uploadImageController(req, res,next) {
    try {
        const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhZTRiNDEyNi1iZjk5LTQ5ODUtOGViNC00NzkwMGU1ZTJhOTIiLCJlbWFpbCI6InNhbmRlZXAuY3NlZHZpdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDQ5MzFmMWVkODVhNzk1ZGMyODMiLCJzY29wZWRLZXlTZWNyZXQiOiI5MWQxMjk1MzcwMDAwN2YzM2JjMzllMjlhNWE2NjU2MTJmYTE2ZmFiNzZjNzZlN2JiNWVjNDhjMDdmOTRhZDc0IiwiZXhwIjoxNzY5MTUzODM4fQ.xfAw6PpsCaY0hcrO8Ws1IEwUq7I_3-A6g528BNH_Uw4";
        const url_gateway = "ivory-quickest-antlion-34.mypinata.cloud";
        const address = req.address;
        const userAddress = address.toLowerCase();
        const user = await UserModel.findOne({userAddress: userAddress});
        if(!user){
            throw new Error("User not found");
        }
        if(user.encryptionKey===null)
        {
            const encryptionKey = generateEncryptionKey(32);
            user.encryptionKey = encryptionKey;
            await user.save();
        }

        const {encryptedData, iv} = encryptFile(req.file.buffer, user.encryptionKey);
        const jsonData = {
            encryptedData: encryptedData.toString('base64'),
            iv: iv.toString('base64'),
        };
        const pinata = new PinataSDK({
            pinataJwt: key,
            pinataGateway: url_gateway
          })
        
          const resPinata = await pinata.upload.json(jsonData);

        console.log(resPinata);

        res.status(200).json({ipfsHash:resPinata.IpfsHash,message:"File uploaded successfully"});
       } catch (error) {
        console.error(error);
         res.status(500).json({message:"Internal Server Error"});
    }

}

module.exports = {uploadImageController};