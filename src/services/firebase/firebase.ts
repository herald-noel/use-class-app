import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcrnIBGpqm9YK_uFgWKgtGfjSl2Giq7qw",
  authDomain: "useclass-1baae.firebaseapp.com",
  projectId: "useclass-1baae",
  storageBucket: "useclass-1baae.appspot.com",
  messagingSenderId: "181262543924",
  appId: "1:181262543924:web:76675de85f9fc8c3d42e61",
  measurementId: "G-YBK5G6NF33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app, auth}