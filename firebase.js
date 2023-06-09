// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import * as firebase from "firebase/compat";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOh96t6mSqP668BLHGmr3V04Zm1a5MK5E",
  authDomain: "add-friends-test.firebaseapp.com",
  projectId: "add-friends-test",
  storageBucket: "add-friends-test.appspot.com",
  messagingSenderId: "710833994836",
  appId: "1:710833994836:web:9bb2e5b0692801aea3c1c1"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export { auth };


export const db = getFirestore(app)