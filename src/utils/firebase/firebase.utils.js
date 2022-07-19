import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUt1lrWV29QrCmzOGbYGqyFyQk_XCXA6A",
  authDomain: "crwn-clothing-db-27789.firebaseapp.com",
  projectId: "crwn-clothing-db-27789",
  storageBucket: "crwn-clothing-db-27789.appspot.com",
  messagingSenderId: "292319011931",
  appId: "1:292319011931:web:0419b6f6c78392eef88b7e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// The 'provider' inturn gives back the provider instance from GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// we are now instantaiating the Firestore DB. The below code will point to the DB we created in the firestore.
export const db = getFirestore();

//  We are getting the Data(object) retrived from authservice in sigin component and storing it into the fire base database
export const createDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;
  // First we need to seeif there is an existing document reference
  // In the below code the "doc" method recives 3 arguments => 1st: firestore db, 2nd: Collection(Users collections in our case) 3rd: identifiers(this has to be an unique id)
  // With our google signIn, in there we use 'uid'.
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if user data exits?

  //  if it does not then create/set the document with the data from userAuth in my collection

  // true: return the userDocref

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error Creating the User", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
