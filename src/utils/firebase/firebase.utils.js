// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect,
          signInWithPopup, GoogleAuthProvider,
        createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
    signOut } from 'firebase/auth';
import { getFirestore,doc,getDoc,setDoc } from 'firebase/firestore';


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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect( auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  
  const userSnapshot = await getDoc(userDocRef);
  
  if(!userSnapshot.exists())
  {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{ displayName, email,createdAt, ...additionalInformation });
    }
    catch (error)
    {
      switch(error.code){
        case 'auth/':
          alert('incorrect password for email');
          break;
        default:
          console.log(error);
          break;
        }
      }
    }

  return userDocRef;
  
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  try{
    return await signInWithEmailAndPassword(auth, email, password);
    }
  catch(error)
  {
    switch(error.code){
      case 'auth/wrong-password':
        alert('incorrect password for email');
        break;
      case 'auth/user-not-found':
        alert('the user account was not found');
        break;
      default:
        console.log(error);
        break;
      }
  }
};

export const signOutUser = async () =>{ 
  const auth = getAuth();
  await signOut(auth);
};