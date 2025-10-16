import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// sign in anonymously
signInAnonymously(auth)
  .then(() => console.log("✅ Signing in anonymously..."))
  .catch(err => console.error("Auth failed:", err));

// Wait for authentication
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User authenticated:", user.uid);
    window.firebaseReady = true; // tell the rest of your game it's safe
  } else {
    console.log("⏳ Waiting for authentication...");
    window.firebaseReady = false;
  }
});

// make everything global
window.firebase = { auth, db };
