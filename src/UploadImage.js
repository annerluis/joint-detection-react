import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Instructions from './Instructions.js';


function UploadImage({ onUpload }) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null); 
  const [jointInfo, setJointInfo] = useState(null);

  const handleImageChange = (e) => {
    //resets all 
    setImage(e.target.files[0]);
    setError(null);
    setProcessedImage(null);
    setJointInfo(null);
  };

  const fileToBase64 = (file) => {//converts uploaded image to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select an image.');
      return;
    }

    setLoading(true); // Start loading spinner
    //api call
    try {
        //convert image to base64, add to message payload
        //session hash is hardcoded for now, will amend later
        const base64Image = await fileToBase64(image);
        const payload = {"fn_index":0,"data": ['"'+base64Image+'"'],"session_hash":"knwj8al8dei"}
        const response = await axios.post('https://darylfunggg-xray-hand-joint-detection.hf.space/api/predict/',
        payload,
        {
            "content-type": "application/json"
        }
      );
      console.log(response.status)
      if(response.status === 200){
        const { data } = response.data;
        const [imageInBase64, additionalInfo] = data;
        setProcessedImage(imageInBase64);
        setJointInfo(additionalInfo);
        onUpload(response.data); // Call the onUpload callback with the response data
      }else {
        setError(response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process image.');
    } finally{
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div>
      <div className='container'>
      <div className='column'>
          <Instructions/>
        </div>
        <div className='column'>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading && <div className="spinner"></div>} 
          {processedImage && !loading && (
            <div>
              <h2>Processed Image:</h2>
              <img src={processedImage} className='processed-image' alt="Processed" />
            </div>
          )}
        </div>
        <div className='column'>
        <h2>Output:</h2>
        <div className='instructions-box'>
          {jointInfo && (
            <div className='instructions'>
              <pre>{JSON.stringify(jointInfo, null, 2)}</pre>
            </div>
          )}
        </div>
        </div>
      </div>
      
    </div>
  );  
}

export default UploadImage;
