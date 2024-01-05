import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { signInWithGoogle, signInWithFacebook }  from './OAuth';

// const provider = new GoogleAuthProvider();
// const credential = GoogleAuthProvider.credentialFromResult(result);
// const token = credential.accessToken;

// const firebaseApp = initializeApp(token)
// const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);


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
