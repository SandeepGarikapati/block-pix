import {ethers} from 'ethers';
import contractAbi from "../constants/contractAbi.json"
import { toast } from 'react-hot-toast';
import axios from 'axios';
export const connectWallet = async () =>{
    try {
        if (!window.ethereum) {
            throw new Error("Metamask is not installed");
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const selectedAccount = accounts[0];

        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        const message ="Welcome to crypto World Website";

        const signature = await signer.signMessage(message);


        const dataSignature = {
            signature,

        }
        
        const url=`http://localhost:3000/api/authentication?address=${selectedAccount}`
        const res = await axios.post(url,dataSignature)
        const token = res.data.token;
        localStorage.setItem('token',token);
        
        console.log(res.data);


        const contractAddress = "0xCF2BcC29887517baCF8f33aa8074BD86d981E8c5";

        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

        return { selectedAccount, contractInstance };
    } catch (error) {
        toast.error('wallet connection failed');

        console.error("Failed to connect wallet:", error);
        throw error;
    }

}
