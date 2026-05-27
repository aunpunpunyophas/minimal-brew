const firebaseConfig = {
  apiKey: "AIzaSyDieSJAOC2k6KsQ8ZNFGAbg_gPIzSTxsis",
  authDomain: "minimal-brew-aebc2.firebaseapp.com",
  projectId: "minimal-brew-aebc2",
  storageBucket: "minimal-brew-aebc2.firebasestorage.app",
  messagingSenderId: "136486783523",
  appId: "1:136486783523:web:7b4a17f995baabe77a3f96"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
window.db = db;