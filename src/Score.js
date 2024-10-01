import { TableContainer } from '@mui/material';
import './App.css';

import UploadImage from './UploadImage.js';
import React, { useState } from 'react';

function Score(){//takes in output1 from joint detection and converts each joint into an object to be cropped, displays joints in a table
    /*const pips = jointInfo.PIP
    const mcps = jointInfo.MCP
    const ulna = jointInfo.Ulna
    const radius = jointInfo.Radius 
    const wrist = jointInfo.Wrist*/

    const [ogImage, setOgImage] = useState(null);
    const [jointsInfo, setJointsInfo] = useState(null);

    const setJointCropInfo = (additionalInfo, image) => {
        setJointsInfo(additionalInfo);
        setOgImage(image);
    }
/*
    const cropImageNow = (joint, image) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = joint.width;
        canvas.height = joint.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = joint.width * pixelRatio;
        canvas.height = joint.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            joint.x * scaleX,
            joint.y * scaleY,
            joint.width * scaleX,
            joint.height * scaleY,
            0,
            0,
            joint.width,
            joint.height,
        );

        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');
        return(base64Image);
    };
    */

    const scoreButton = async () => {
        setJointCropInfo(UploadImage.additionalInfo,UploadImage.image)
        if(UploadImage.image != null){
            console.log(UploadImage.image)
        }
        else{
            console.log('joints are null')
        }
    }


/*
    CropImage(pips[0], image)
        .then((croppedImage) => {
        console.log(croppedImage);

        // Create an img element to display the cropped image
        const img = document.createElement('img');
        img.src = croppedImage;
        img.alt = 'Cropped Image'; // Optional: Set an alt attribute for accessibility

        // Append the img element to the body or a specific container
        document.body.appendChild(img);
        })
    .catch((error) => {
        console.error('Error cropping the image:', error);
    });

*/

    const tableData = [
        {id: 0, Type: 'MCP', Erosion: 0, Narrowing: 5, Total: 5},
        {id: 1, Type: 'MCP', Erosion: 3, Narrowing: 0, Total: 3},
        {id: 2, Type: 'PIP', Erosion: 4, Narrowing: 4, Total: 8},
        {id: 3, Type: 'PIP', Erosion: 1, Narrowing: 5, Total: 6},
        {id: 4, Type: 'PIP', Erosion: 2, Narrowing: 2, Total: 4},
        {id: 5, Type: 'Radius', Erosion: 0, Narrowing: 1, Total: 1},
        {id: 6, Type: 'Ulna', Erosion: 1, Narrowing: 1, Total: 2},
        {id: 7, Type: 'Wrist', Erosion: 2, Narrowing: 2, Total: 4},
    ];

    return (
        <div>
            <button onClick={scoreButton}>
                {'Score joints'}
            </button>
            <button>
                {'Clear Scores'}
            </button>
            <div>
            <h2>Score Predictions</h2>
      <table style={{ width: '90%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Erosion</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Narrowing</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.Type}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.Erosion}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.Narrowing}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.Total}</td>
            </tr>
          ))}
        </tbody>
      </table>
            </div>
        </div>
    );
}

export default Score;