import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyDH2fRQTRoFTCox4TmjjXp5g8WRJFN2GoQ",
authDomain: "zafirogimcloud.firebaseapp.com",
projectId: "zafirogimcloud",
storageBucket: "zafirogimcloud.appspot.com",
messagingSenderId: "1074430014050",
appId: "1:1074430014050:web:a9598398f22e1cf67ed73b"
};

/*
const firebaseConfig = {
    apiKey: "AIzaSyAN0sN-WbOIYFmGngH-99fZOTaE0n6Hb_c",
    authDomain: "bc-gim.firebaseapp.com",
    databaseURL: "https://bc-gim.firebaseio.com",
    projectId: "bc-gim",
    storageBucket: "bc-gim.appspot.com",
    messagingSenderId: "815072522968",
    appId: "1:815072522968:web:77a50fe685fadc90da1dad"
};
*/
  // Initialize Firebase
//firebase.initializeApp(firebaseConfig);

//const auth = firebase.auth;

//export {auth, firebase}


export default firebase.initializeApp(firebaseConfig);
