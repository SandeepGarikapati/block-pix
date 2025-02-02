import axios from 'axios';
import { useState } from 'react';
import { useWeb3Context } from '../context/useWeb3context';
import { toast } from 'react-hot-toast';
import { ImageUp } from 'lucide-react';

const UploadedImage = ({ reloadEffect }) => {
  const [file, setFile] = useState(null);
  const { web3State } = useWeb3Context();
  const { selectedAccount, contractInstance } = web3State;
  const [loading, setLoading] = useState(false);

  const uploadImageHash = async (ipfsHash) => {
    if (!contractInstance) {
      toast.error('Contract instance is not available');
      return;
    }
    try {
      const tx = await contractInstance.uploadFile(selectedAccount, ipfsHash);
      await toast.promise(tx.wait(), {
        loading: 'Transaction is pending',
        success: 'Transaction successful',
        error: 'Transaction failed',
      });
      console.log(tx);
    } catch (error) {
      console.error('Error uploading image hash:', error);
      toast.error('Failed to upload file to contract');
    }
  };

  const handleImageUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      console.log('Function called');
      const url = `http://localhost:3000/api/uploadImage`;
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-access-token': token,
        },
      };
      const res = await axios.post(url, formData, config);

      toast.success('Image uploaded successfully');
      await uploadImageHash(res.data.ipfsHash);
      setLoading(false);
      reloadEffect();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-8 bg-gray-50 p-4">
      <p className="font-semibold text-2xl text-gray-800">
        Upload File with Web3 Security
      </p>
      <div className="flex flex-col items-center gap-4">
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-md bg-blue-500 text-white py-2 px-4 text-center shadow-lg hover:bg-blue-600 transition duration-300"
        >
          {file ? file.name : 'Choose a File'}
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
        <button
          onClick={handleImageUpload}
          disabled={loading}
          className={`py-2 px-6 rounded-md flex items-center gap-2 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white transition duration-300'
          }`}
        >
          <ImageUp />
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {!file && (
          <p className="text-sm font-medium text-red-500">
            Please choose a file to upload
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadedImage;
