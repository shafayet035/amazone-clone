import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyALlBtNTp03fvXxgHmx7KK8KwpuhzuH2bs",
    authDomain: "e-clone-2c81e.firebaseapp.com",
    databaseURL: "https://e-clone-2c81e.firebaseio.com",
    projectId: "e-clone-2c81e",
    storageBucket: "e-clone-2c81e.appspot.com",
    messagingSenderId: "77305754106",
    appId: "1:77305754106:web:553ebbc79e69fefbb2b443",
    measurementId: "G-3E19LY5ZXG"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig)


  const db = firebaseApp.firestore()
  const auth = firebaseApp.auth()

  export { db, auth }