// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg8FhJSe5_Xil8AjcQCclr7mSRPG4u3l0",
  authDomain: "spacechat-22aaa.firebaseapp.com",
  projectId: "spacechat-22aaa",
  storageBucket: "spacechat-22aaa.appspot.com",
  messagingSenderId: "519250516156",
  appId: "1:519250516156:web:343b257b064d7f1ae298b9",
  measurementId: "G-QD7ZCBKXXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
