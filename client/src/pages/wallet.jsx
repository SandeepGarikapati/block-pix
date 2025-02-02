import {useWeb3Context} from "../context/useWeb3context";
import { connectWallet } from "../utils/connectWallet";
import { toast } from 'react-hot-toast';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
    const navigateTo=useNavigate()
    const {updateWeb3State,web3State} = useWeb3Context()
    const {selectedAccount}=web3State;
    useEffect(()=>{
      if(selectedAccount){
        navigateTo("/home")
      }
    },[selectedAccount,navigateTo])


    const handlewalletConnection = async () => {
        try {
            const {contractInstance,selectedAccount} = await connectWallet();
            console.log("selectedAccount", selectedAccount);
            console.log("contractInstance", contractInstance);
            updateWeb3State({contractInstance,selectedAccount})
          
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    }
    
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] flex flex-col justify-center items-center gap-20">
          <h1 className="font-bold text-[42px] gradient-text md:text-[60px]">
            Crypted Vault
          </h1>
          <button
            className="relative px-12 py-4 text-white bg-sky-400 rounded-md hover:bg-sky-800 font-semibold"
            onClick={handlewalletConnection}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
}

export default Wallet;