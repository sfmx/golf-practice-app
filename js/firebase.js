/* ============================================================
   FIREBASE — Auth + Firestore sync (offline-first)
   Uses ESM CDN imports — no build tools needed.
   ============================================================ */

const FB_VERSION = '11.6.0';
const CDN = `https://www.gstatic.com/firebasejs/${FB_VERSION}`;

const firebaseConfig = {
  apiKey: "AIzaSyATcdqwoUHRKieeFjR_yw945x7iWZ91Dx4",
  authDomain: "golf-practice-e2924.firebaseapp.com",
  projectId: "golf-practice-e2924",
  storageBucket: "golf-practice-e2924.firebasestorage.app",
  messagingSenderId: "225689656389",
  appId: "1:225689656389:web:367d87b55b249a6239972c",
  measurementId: "G-V90ZC80ZWC"
};

/* ── State ────────────────────────────────────────────────── */
let app = null;
let auth = null;
let db = null;
let currentUser = null;
let authReady = false;
let onAuthChange = null;        // callback: (user) => void

/* ── Lazy-load Firebase SDK ──────────────────────────────── */
let _initPromise = null;

async function ensureFirebase() {
  if (_initPromise) return _initPromise;
  _initPromise = (async () => {
    const [{ initializeApp }, { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut: fbSignOut },
           { getFirestore, doc, setDoc, getDoc, enableIndexedDbPersistence }] = await Promise.all([
      import(/* webpackIgnore: true */ `${CDN}/firebase-app.js`),
      import(/* webpackIgnore: true */ `${CDN}/firebase-auth.js`),
      import(/* webpackIgnore: true */ `${CDN}/firebase-firestore.js`)
    ]);

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    // Enable offline persistence (ignore errors if already enabled)
    try { await enableIndexedDbPersistence(db); } catch { /* ok */ }

    // Store module refs for later use
    _modules = { GoogleAuthProvider, signInWithPopup, fbSignOut, doc, setDoc, getDoc };

    // Listen for auth changes
    onAuthStateChanged(auth, user => {
      currentUser = user;
      authReady = true;
      if (onAuthChange) onAuthChange(user);
    });
  })();
  return _initPromise;
}

let _modules = null;

/* ── Public API ──────────────────────────────────────────── */

/** Initialize Firebase (call once at app start) */
export async function initFirebase(authCallback) {
  onAuthChange = authCallback;
  await ensureFirebase();
}

/** Sign in with Google popup */
export async function signIn() {
  await ensureFirebase();
  const { GoogleAuthProvider, signInWithPopup } = _modules;
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    // User closed popup or error — fail silently
    console.warn('Sign-in cancelled or failed:', err.code);
  }
}

/** Sign out */
export async function signOut() {
  await ensureFirebase();
  await _modules.fbSignOut(auth);
}

/** Get current user (or null) */
export function getUser() {
  return currentUser;
}

/** Is Firebase auth ready? */
export function isAuthReady() {
  return authReady;
}

/* ── Firestore Sync ──────────────────────────────────────── */

// Data store names that we sync to Firestore
const SYNC_STORES = ['sessions', 'notes', 'goals', 'gear-owned', 'week', 'prefs', 'builder', 'user-videos'];

/**
 * Save a single store to Firestore.
 * Call this whenever localStorage is updated.
 */
export async function syncToCloud(storeName, data) {
  if (!currentUser || !db) return;
  if (!SYNC_STORES.includes(storeName)) return;

  try {
    const { doc, setDoc } = _modules;
    const docRef = doc(db, 'users', currentUser.uid, 'data', storeName);
    await setDoc(docRef, { value: data, updatedAt: Date.now() }, { merge: true });
  } catch (err) {
    console.warn('Firestore write failed:', err.message);
  }
}

/**
 * Load a single store from Firestore.
 * Returns the value or null if not found.
 */
export async function loadFromCloud(storeName) {
  if (!currentUser || !db) return null;
  if (!SYNC_STORES.includes(storeName)) return null;

  try {
    const { doc, getDoc } = _modules;
    const docRef = doc(db, 'users', currentUser.uid, 'data', storeName);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data().value ?? null;
    }
  } catch (err) {
    console.warn('Firestore read failed:', err.message);
  }
  return null;
}

/**
 * Pull all cloud data and merge with localStorage.
 * Cloud data wins for each store, but we never delete local-only stores.
 * Returns the merged data map.
 */
export async function pullAllFromCloud() {
  if (!currentUser || !db) return null;

  const PREFIX = 'gp-';
  const merged = {};

  for (const storeName of SYNC_STORES) {
    const cloudVal = await loadFromCloud(storeName);
    if (cloudVal !== null) {
      // Cloud wins — overwrite localStorage
      try {
        localStorage.setItem(PREFIX + storeName, JSON.stringify(cloudVal));
      } catch { /* quota */ }
      merged[storeName] = cloudVal;
    }
  }

  return merged;
}

/**
 * Push all localStorage data to Firestore.
 * Call once after first sign-in if no cloud data exists.
 */
export async function pushAllToCloud() {
  if (!currentUser || !db) return;

  const PREFIX = 'gp-';

  for (const storeName of SYNC_STORES) {
    try {
      const raw = localStorage.getItem(PREFIX + storeName);
      if (raw) {
        const value = JSON.parse(raw);
        await syncToCloud(storeName, value);
      }
    } catch { /* skip malformed data */ }
  }
}

/**
 * Full sync: pull from cloud, and if cloud was empty push local to cloud.
 */
export async function fullSync() {
  if (!currentUser || !db) return;

  // Try pulling first
  const merged = await pullAllFromCloud();

  // Check if cloud had any data
  const hasCloudData = merged && Object.keys(merged).length > 0;

  if (!hasCloudData) {
    // First time — push local data up
    await pushAllToCloud();
  }
}
