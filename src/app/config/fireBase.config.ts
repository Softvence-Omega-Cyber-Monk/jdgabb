import admin from "firebase-admin";
import { envVers } from "./env";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: envVers.FIREBASE.FIREBASE_PROJECT_ID,
            clientEmail: envVers.FIREBASE.FIREBASE_CLIENT_EMAIL,
            privateKey: envVers.FIREBASE.FIREBASE_PRIVATE_KEY
        })
    });
};


export const messaging: admin.messaging.Messaging = admin.messaging();
export const db: admin.firestore.Firestore = admin.firestore();
export default admin;