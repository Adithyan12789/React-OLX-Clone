// src/firebase/config.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBIFG56ZdxH-qp2YPJfyEzEEv3TOOdbf3c",
    authDomain: "fir-7307d.firebaseapp.com",
    projectId: "fir-7307d",
    storageBucket: "fir-7307d.appspot.com",
    messagingSenderId: "804697223307",
    appId: "1:804697223307:web:bd670f0ff9bae2b672248e",
    measurementId: "G-F9FHEZEREW"
};

export default firebase.initializeApp(firebaseConfig);