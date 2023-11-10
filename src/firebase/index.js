import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// import dotenv from 'dotenv'
// dotenv.config();

const firebaseConfig = {

    apiKey: "AIzaSyDTd-YvQLUdx1yvaVSNIOKDn6_k3qHOvQQ",
    authDomain: "ymkangfirebasestart.firebaseapp.com",
    projectId: "ymkangfirebasestart",
    storageBucket: "ymkangfirebasestart.appspot.com",
    messagingSenderId: "742915925814",
    appId: "1:742915925814:web:ad2e74b845c58fe0d97597",
    measurementId: "G-FJH55NV48L"

    // apiKey: process.env.FIREBASE_KEY,
    // authDomain: process.env.FIREBASE_DOMAIN,
    // projectId: process.env.FIREBASE_PROJECTID,
    // storageBucket: process.env.FIREBASE_BUCKET,
    // messagingSenderId: process.env.FIREBASE_SENDERID,
    // appId: process.env.FIREBASE_APPID,
    // measurementId: process.env.FIREBASE_MEASUREMENTID

};

//firebase 초기화
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage }