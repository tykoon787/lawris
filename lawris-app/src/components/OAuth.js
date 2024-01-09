// Handles OAuth authentication with different providers

import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';


export const signInWithGoogle = async () => {
  
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const result = await signInWithPopup(auth, provider);
  
    
    // Successful authentication
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const email = result.user.email;
  


    console.log('Google Authentication successful!');
    console.log('Credential:', credential);
    console.log('Access Token:', token);
    console.log('User:', user);
    console.log('Email:', email);

    return { user, email };
    
    // Use 'credential', 'token', and 'user' as needed
  } catch (error) {
    // Handle errors for Google sign-in
    console.error('Google Authentication error:', error);
    // Display specific error messages or handle the error cases
  }
};


export const signInWithMicrosoft = async () => {
    try {
        const provider = new OAuthProvider('microsoft.com');
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);

        // Successful authentication
        const token = result.accessToken;
        const user = result.user;
        const email = result._tokenResponse.email;

        console.log('Microsoft Authentication successful!');
        console.log('Result:', result);
        console.log('Access Token:', token);
        console.log('User:', user);
        console.log('Email:', email);

        return { user, email }; // Return the email
    } catch (error) {
        console.error('Microsoft Authentication error:', error);
        throw error; // Throw the error for handling in the calling function
    }
};

export const logout = async () => {
  try {
    const auth = getAuth();
    const refreshToken = localStorage.getItem('refresh_token');

    // If a refreshToken is provided, call the backend logout endpoint
    if (refreshToken) {
      await fetch('http://localhost:8000/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      console.log('Sign out successful');
      // Perform any necessary actions after successful backend logout
    }

    // Firebase sign-out
    await firebaseSignOut(auth);
    // Perform any necessary actions after successful Firebase sign-out
  } catch (error) {
    console.error('Error during logout:', error);
    // Handle any errors that occur during logout
  }
};
