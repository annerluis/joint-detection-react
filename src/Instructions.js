import './App.css';
import svhscorescale from './images/svhscorescale.png';

function instructions() {
    return(
        <div className='instructions'>
            <h2>Instructions</h2>
              <p style={{textAlign: "left"}}>
                1. Upload an image of a hand x-ray by dragging or selecting.<br />
                2. wait for joints to be detected, it may take around 10 seconds. <br />
                3. Adjust and resize joints to desired locations.<br />
                4. Click button to detect SVH scores.
              </p>
              <h2>SVH Score Legend</h2>
              <img src={svhscorescale} style={{ width: "50%" }} alt='score legend'/>
        </div>
    );
}
export default instructions;