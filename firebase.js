// Import the functions you need from the SDKs you need

import * as firebase from "firebase/compat";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9WSh6d-9HbuiBGN6jMYCTJcacOjdqc2Q",
  authDomain: "fir-test-57976.firebaseapp.com",
  projectId: "fir-test-57976",
  storageBucket: "fir-test-57976.appspot.com",
  messagingSenderId: "300035690959",
  appId: "1:300035690959:web:097cbba0a5f9de57f502ba"
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