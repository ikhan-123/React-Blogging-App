import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCn1gwnJtKn3XFWUb4s9-yeG85mdXtuMGI",
    authDomain: "react-blogging-app-dd7e7.firebaseapp.com",
    projectId: "react-blogging-app-dd7e7",
    storageBucket: "react-blogging-app-dd7e7.appspot.com",
    messagingSenderId: "969629143974",
    appId: "1:969629143974:web:5fc00b86e66d9c0d6e3567"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app