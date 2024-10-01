import './App.css';
import React, { useState } from 'react';


function Score({ image, JointData }){
    const cropWorker = new Worker(new URL('./cropWorker.js', import.meta.url));

    function scoreJoints(){
        return new Promise((resolve, reject) => {
            cropWorker.onmessage = function(e) {
                
            }
        })
    }
    /*
    const scoreButton = async () => {
        const testJoint = JointData.MCP[0];

        cropImage(image,testJoint)
            .then(croppedImage => {
                console.log(croppedImage);
                const imgElement = document.createElement('img');
                imgElement.src = croppedImage;
                document.body.appendChild(imgElement);
            })
            .catch(error => {
                console.error("Error cropping image: ",error);
            });
    }
*/
    const scoreButton = async() => {

    }
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