// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect,signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoDrH6pwVAk-d-z0cT4Lblf7mIh7JZd04",
  authDomain: "crwn-db-70265.firebaseapp.com",
  projectId: "crwn-db-70265",
  storageBucket: "crwn-db-70265.appspot.com",
  messagingSenderId: "1066544943481",
  appId: "1:1066544943481:web:4681d8ddb2cee3ad25dfa8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);