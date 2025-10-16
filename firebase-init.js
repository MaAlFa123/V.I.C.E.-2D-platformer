import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Start anonymous sign-in
signInAnonymously(auth)
  .then(() => console.log("✅ Signing in anonymously..."))
  .catch(err => console.error("Auth failed:", err));

// Wait until signed in before allowing actions
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User authenticated:", user.uid);
    allowLobbyCreation();
  } else {
    console.log("⏳ Waiting for authentication...");
  }
});

function allowLobbyCreation() {
  const createBtn = document.getElementById("createLobbyBtn");
  if (createBtn) createBtn.disabled = false;
}

export { auth, db };
