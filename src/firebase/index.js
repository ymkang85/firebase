import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDTd-YvQLUdx1yvaVSNIOKDn6_k3qHOvQQ",
    authDomain: "ymkangfirebasestart.firebaseapp.com",
    projectId: "ymkangfirebasestart",
    storageBucket: "ymkangfirebasestart.appspot.com",
    messagingSenderId: "742915925814",
    appId: "1:742915925814:web:ad2e74b845c58fe0d97597",
    measurementId: "G-FJH55NV48L"
};

//firebase 초기화
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth }