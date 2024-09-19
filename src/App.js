import './App.css';
import Header from './Header.js';
import UploadImage from './UploadImage';
import React, { useState } from 'react';
import Score from './Score.js';
import Instructions from './Instructions.js';




function App() {
  const [result, setResult] = useState(null);

  const handleUpload = (processedImage) => {
    setResult(processedImage);
  };
  return (
    <div className="App">
      <Header />
      <Instructions/>
      <div className='container'>
        <div className='column'>
        
        <UploadImage onUpload={handleUpload} />
            {result && (
              <div></div>
            )}
        </div>
        <div className='column'>
          <Score/>
        </div>
      </div>
    </div>
  );
}
export default App;