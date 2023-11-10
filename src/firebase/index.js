import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    //firebase에서는 아래와 같이 dotenv를 설정해줘야 한다.
    apiKey: `${process.env.REACT_APP_KEY}`,
    authDomain: `${process.env.REACT_APP_DOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECTID}`,
    storageBucket: `${process.env.REACT_APP_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_SENDERID}`,
    appId: `${process.env.REACT_APP_APPID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENTID}`

};

//firebase 초기화
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db }