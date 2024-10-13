// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth' ;

const firebaseConfig = {
  apiKey: "AIzaSyAVdSi6Fh13zcCeX3RL_rMhoRk95qvt82A",
  authDomain: "projectnite.firebaseapp.com",
  projectId: "projectnite",
  storageBucket: "projectnite.appspot.com",
  messagingSenderId: "564353562930",
  appId: "1:564353562930:web:a4b6894643e67140b23f2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);