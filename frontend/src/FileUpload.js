import React, { useState } from 'react';
import axios from 'axios';
import "./FileUpload.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    console.log("file selected", e.target.files[0].name);
    setSelectedFile(e.target.files[0]);
    setSelectedFileName(e.target.files[0].name);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('File uploaded:', response.data);
      setMessage(response.data.message);
      // Handle success or further operations after successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error cases
    }
  };

  return (
    <div className='container'>
        <div className='addFromExcel'>
            Add from Excel
        </div>
        <div className='containerText'>
            Add Candidate to Database
        </div>
        <div className='dropZoneContainer'>
        <input type="file" className="FileUpload"  onChange={handleFileChange} />
        <div className="dropZoneOverlay">
           <img className='img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdAFvxUjum14wRy5TdIMnsKKCrDxThlsCSmsICTNySkNKEuQloF8GkUSGVyqKFGRpXbY&usqp=CAU' /> <br/>         
            <button onClick={handleFileUpload}>Submit</button>
            <div>{selectedFileName}</div>
            <div className='message'>{message}</div>
        </div>
        
      
      
      </div>
    </div>
  );
};

export default FileUpload;
