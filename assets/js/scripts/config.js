var firebaseConfig = {
  apiKey: "AIzaSyBHPx5ij0m6J8LdAZlpzCAjoF2mJDDC2hk",
  authDomain: "stretch-pattarai.firebaseapp.com",
  projectId: "stretch-pattarai",
  storageBucket: "stretch-pattarai.appspot.com",
  messagingSenderId: "1046668280702",
  appId: "1:1046668280702:web:a17d1559f809831d8e692f",
  measurementId: "G-LS9VD8ZZQC",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var APIRoute = "https://api-stretch.pattarai.in/";
// var APIRoute = "http://localhost/stretch-api-v1/";
