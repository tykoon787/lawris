/*
 * This file is used to initialize the firebase app
 */


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {

  apiKey: 'AIzaSyBJJBiGk3pPG8Dm8w-MUA81iSB87JH4MxQ',
  authDomain: 'authentication-2f5cc.firebaseapp.com',
  projectId: 'authentication-2f5cc',

};

const app  = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
