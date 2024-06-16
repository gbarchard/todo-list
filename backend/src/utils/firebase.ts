import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { credential } from 'firebase-admin'

if (!process.env.FIREBASE_SERVICE) {
  throw new Error('Firebase credentials not found')
}

const app = initializeApp({
  credential: credential.cert(JSON.parse(process.env.FIREBASE_SERVICE)),
})

console.log('Initialized firebase: ', app.name)

export const auth = getAuth()
