const express = require('express');
const app = express();
const cors = require('cors');
const authenticationRoute = require('./routes/authenticationRoute');
const uploadImageRoute = require('./routes/uploadImageRoute');
const getImageRoute = require('./routes/getImageRoute');
const {PORT,MONGODB_URL}=require('./config/serverConfig');
const {connectDB} = require('./db/connect');
require('dotenv').config()

const url = "mongodb+srv://sandeepcsedvit:rupaismywife@sandeep.aiutq.mongodb.net/UserCryptedVault?retryWrites=true&w=majority&appName=sandeep";


app.use(cors());
app.use(express.json());

app.use('/api',authenticationRoute)
app.use('/api',uploadImageRoute)
app.use('/api',getImageRoute)

async function serverStart(){

    try {
        await connectDB(url);
        console.log("Connected to DB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
}

serverStart();
