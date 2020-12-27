import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyAXcwM4YP1wTE7ovvOpHyeuU8_DtXwHNi8",
    authDomain: "notereact-b27d0.firebaseapp.com",
    databaseURL: "https://notereact-b27d0-default-rtdb.firebaseio.com",
    projectId: "notereact-b27d0",
    storageBucket: "notereact-b27d0.appspot.com",
    messagingSenderId: "13295826659",
    appId: "1:13295826659:web:b6e3f630c759e2d65537d6",
    measurementId: "G-TGY91LK5SV"
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export const nodeData=firebase.database().ref('dataForNote');