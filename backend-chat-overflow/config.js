const admin = require('firebase-admin')
const firebase = require('firebase')
const serviceAccount = require("./chat-overflow-firebase-adminsdk-jn0y5-fe627f70b8.json");

const firebaseConfig = {
    apiKey: "AIzaSyCYcqRJ4Jc9Dc2WIMYTLbkG_mG8l4dBvbg",
    authDomain: "chat-overflow.firebaseapp.com",
    databaseURL: "https://chat-overflow.firebaseio.com",
    projectId: "chat-overflow",
    storageBucket: "chat-overflow.appspot.com",
    messagingSenderId: "218822666930",
    appId: "1:218822666930:web:a62f33091dcb6b3e1637ab"
};
firebase.initializeApp(firebaseConfig)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-overflow.firebaseio.com/"
});

const db = admin.database()


module.exports = {admin,firebase,db};
