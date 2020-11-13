import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA6-9eOkHWCKoeSjDV7o3bWR8aow6XsKvE",
    authDomain: "crwn-db-7520c.firebaseapp.com",
    databaseURL: "https://crwn-db-7520c.firebaseio.com",
    projectId: "crwn-db-7520c",
    storageBucket: "crwn-db-7520c.appspot.com",
    messagingSenderId: "451699841751",
    appId: "1:451699841751:web:9a53e35ed8968f9df1ee92",
    measurementId: "G-YD2JRBC5Z7"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //snapShot = reference of the data
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {

            // Create user request to database
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;