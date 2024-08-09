import './App.css';
import Header from './Header.js';
import UploadImage from './UploadImage';
import React, { useState } from 'react';



function App() {
  const [result, setResult] = useState(null);

  const handleUpload = (processedImage) => {
    setResult(processedImage);
  };
  return (
    <div className="App">
      <Header />
          <UploadImage onUpload={handleUpload} />
            {result && (
            <div></div>)}
    </div>
  );
}
export default App;