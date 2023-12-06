import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';



const ProfileUpload = ({ onUpload}) => {
    const onDrop = useCallback(acceptedFiles => {
        if (onUpload) {
            onUpload(acceptedFiles[0]);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*'})
  return (
    <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select one</p>
    </div>
  )
}

const dropzoneStyles = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  };
  
export default ProfileUpload;
