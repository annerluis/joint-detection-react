import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import session_hash from './session_hash.txt'


function UploadImage({ onUpload, onJointData }) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null); 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setError(null);
    setProcessedImage(null);
  };

  const clearSelection = async () => {
    setImage(null);
    setError(null);
    setProcessedImage(null);
  }

  const fileToBase64 = (file) => {//converts uploaded image to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async () => {//submit button
    if (!image) {//if theres no image selected, return
      setError('Please select an image.');
      return;
    }

    setLoading(true); // Start loading spinner
    try {
        //session hash is hardcoded for now, will amend later
        const base64ImageOriginal = await fileToBase64(image);
        
        ////////////////////////////////////CHANGES//////////////////////////////////////////////
        // 1. extract from the text file
        let sessionHashLocal = "session_hash";
        fetch(session_hash)
            .then(res => res.text())
            .then(text => {
              sessionHashLocal = text;
            });

        // 2. store session hash + apiurl as global variables
        const sessionHash = process.env.REACT_APP_JOINT_DETECTION_SESSION_HASH;
        const sessionApi = process.env.REACT_APP_JOINT_DETECTION_API;
        const payload = {"fn_index":0,"data": ['"'+base64ImageOriginal+'"'],"session_hash": sessionHashLocal} // use local file method
        ////////////////////////////////////CHANGES//////////////////////////////////////////////

        const response = await axios.post('https://darylfunggg-xray-hand-joint-detection.hf.space/api/predict/',
        payload,
        {
            "content-type": "application/json"
        }
      );
      if(response.status === 200){//api response, sets state variables
        const { data } = response.data;
        const [imageInBase64, additionalInfo] = data;
        setProcessedImage(imageInBase64);
        onUpload(base64ImageOriginal);
        onJointData(additionalInfo); 
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
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
          <button onClick={clearSelection}>
            {'Clear Image'}
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
      </div>
      
    </div>
  );  
}

export default UploadImage;
