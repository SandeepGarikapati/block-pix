import { useWeb3Context } from "../context/useWeb3context";
import UploadedImage from "../components/uploadImage";
import GetImage from "../components/GetImage";
import { useState } from "react";



const Home = () => {
    const [reload, setReload] = useState(false);
    const reloadEffect = () => {   
        setReload(!reload);
     }
return (
        <div className="relative h-full w-screen flex flex-col justify-center items-center mt-8 px-4 ">
            < UploadedImage reloadEffect={reloadEffect}/>
            <GetImage reload={reload}/>
        </div>
);
}

export default Home;