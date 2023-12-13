// Handles OAuth authentication with different providers

import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const result = await signInWithPopup(auth, provider);
    
    // Successful authentication
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    console.log('Google Authentication successful!');
    console.log('Credential:', credential);
    console.log('Access Token:', token);
    console.log('User:', user);
    
    // Use 'credential', 'token', and 'user' as needed
  } catch (error) {
    // Handle errors for Google sign-in
    console.error('Google Authentication error:', error);
    // Display specific error messages or handle the error cases
  }
};

export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();

    const result = await signInWithPopup(auth, provider);
    
    // Successful authentication
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    console.log('Facebook Authentication successful!');
    console.log('Credential:', credential);
    console.log('Access Token:', token);
    console.log('User:', user);
    
    // Use 'credential', 'token', and 'user' as needed
  } catch (error) {
    // Handle errors for Facebook sign-in
    console.error('Facebook Authentication error:', error);
    // Display specific error messages or handle the error cases
  }
};


export const signInWithMicrosoft = async () => {
  try {
    const provider = new OAuthProvider('microsoft.com');
    const auth = getAuth();

    const result = await signInWithPopup(auth, provider);

    // Successful authentication
    const credential = result.credential;     
    const token = result.accessToken;
    const user = result.user;

    console.log('Microsoft Authentication successful!');
    console.log('Result:', result);
    console.log('Access Token:', token);
    console.log('User:', user);

    // Use 'result', 'token', and 'user' as needed
  } catch (error) {
    // Handle errors for Microsoft sign-in
    console.error('Microsoft Authentication error:', error);
    // Display specific error messages or handle the error cases
  }
};
