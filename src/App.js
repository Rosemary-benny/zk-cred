import React, { useState } from "react";
import Tesseract from "tesseract.js";
import Spinner from "./Spinner"; // import your loading spinner component

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dob, setDOB] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
    setDOB("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      setLoading(true);
      const { data } = await Tesseract.recognize(file);
      const dobRegex =
        /(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[0-2])[\/\-\.](19|20)\d{2}/;
      const dobMatch = data.text.match(dobRegex);
      const dob = dobMatch ? dobMatch[0] : "";
      setDOB(dob);
      // turn off the loading spinner after OCR is done
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>"Title"</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
          {previewUrl && (
            <div>
              <img src={previewUrl} alt="Document Preview" />
            </div>
          )}
          {loading && (
            <div>
              <Spinner />
            </div>
          )}
          <button type="submit">Scan Document</button>
        </form>
        {dob && (
          <div className="ocr-results">
            <p>Date of Birth: {dob}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
