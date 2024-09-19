import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function UploadImage({ onUpload }) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null); 
  const [jointInfo, setJointInfo] = useState(null);
  const [testJoint, setTestJoint] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setError(null);
    setProcessedImage(null);
    setJointInfo(null);
  };

  const clearSelection = async () => {
    setImage(null);
    setError(null);
    setProcessedImage(null);
    setJointInfo(null);
  }

  const fileToBase64 = (file) => {//converts uploaded image to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  //joint scoring functions:
  const cropImage = (joint) => {//crops each joint from original xray image
    return new Promise((resolve,reject) => {
      const jointImage = new Image();
      //jointImage.src = image.name;
      console.log(jointImage);
      console.log(image);

      jointImage.onload = () => {
        console.log('poop')
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        console.log('peeeeeeee')
        canvas.width = joint.width;
        canvas.height = joint.height;
        console.log('drawing');
        ctx.drawImage(
          jointImage,
          joint.x,
          joint.y,
          joint.width,
          joint.height,
          0,
          0,
          joint.width,
          joint.height
        )
        resolve(canvas.toDataURL('jointImage/png'))
      }
      jointImage.onerror = (error) => {
        reject(new Error('Failed to crop image.'));
      }
    })
  }

  const scoreJoints = async () => {//iterate through each joint, call crop function and send to joint detection api

  }

  const handleSubmit = async () => {//submit button
    if (!image) {//if theres no image selected, return
      setError('Please select an image.');
      return;
    }

    setLoading(true); // Start loading spinner
    try {
        //session hash is hardcoded for now, will amend later
        const base64ImageOriginal = await fileToBase64(image);
        const payload = {"fn_index":0,"data": ['"'+base64ImageOriginal+'"'],"session_hash":"knwj8al8dei"}
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
        setJointInfo(additionalInfo);
        onUpload(response.data); 
        console.log(additionalInfo.MCP[0]);
        const testJointCrop = await cropImage(additionalInfo.MCP[0]);
        setTestJoint(testJointCrop);
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
          <img src={testJoint}></img>
        </div>
      </div>
      
    </div>
  );  
}

export default UploadImage;
