import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCKvVSqbpnyxTUmTBpsadO2bcCtQTjUkrw",
    authDomain: "clone-196f5.firebaseapp.com",
    databaseURL: "https://clone-196f5.firebaseio.com",
    projectId: "clone-196f5",
    storageBucket: "clone-196f5.appspot.com",
    messagingSenderId: "800102514748",
    appId: "1:800102514748:web:290b5b6298c7f80da90339",
    measurementId: "G-9QH9GC33CD"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };
