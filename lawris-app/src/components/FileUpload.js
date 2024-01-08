import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
 const [selectedFile, setSelectedFile] = useState(null);
 const [uploadProgress, setUploadProgress] = useState(0);

 const onFileChange = (e) => {
   setSelectedFile(e.target.files[0]);
 };

 const onFileUploadClick = () => {
   const formData = new FormData();
   formData.append('file', selectedFile);

   // Simulate an asynchronous file upload
   const uploadInterval = setInterval(() => {
     setUploadProgress((prevProgress) => Math.min(prevProgress + 10, 100));
   }, 500);

   setTimeout(() => {
     clearInterval(uploadInterval);
     setUploadProgress(100);

     // Pass the uploaded file to the parent component
     onFileUpload(selectedFile);
   }, 5000); // Simulating a 5-second upload time
 };

 const removeFile = () => {
   setSelectedFile(null);
   setUploadProgress(0);
 };

 return (
   <div>
     <input type="file" onChange={onFileChange} />
     <button onClick={onFileUploadClick}>Upload</button>
     {uploadProgress > 0 && uploadProgress < 100 && (
       <div className="progress-bar">
         <div style={{ width: `${uploadProgress}%` }}></div>
       </div>
     )}
     {selectedFile && (
       <div className="file-details">
         <p>File Selected:</p>
         <p>{selectedFile.name}</p>
         <p>Format: {selectedFile.type}</p>
         <button onClick={removeFile}>Remove File</button>
       </div>
     )}
   </div>
 );
};

export default FileUpload;
