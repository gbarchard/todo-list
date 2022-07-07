import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

// TODO: Add your config here...
const firebaseConfig = {
  apiKey: "AIzaSyCBy68fPiUg4U8yExaKBKxCqK0MXPs33aQ",
  authDomain: "etch-dev-2d703.firebaseapp.com",
  projectId: "etch-dev-2d703",
  storageBucket: "etch-dev-2d703.appspot.com",
  messagingSenderId: "986675990728",
  appId: "1:986675990728:web:55146c04565cf8c473d5fd",
  measurementId: "G-KCNGNVTZLN",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
