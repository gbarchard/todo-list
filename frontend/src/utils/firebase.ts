import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import firebaseConfig from './firebase.json'

// Initialize Firebase
if (!firebaseConfig) throw Error('Missing Firebase Config')
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
