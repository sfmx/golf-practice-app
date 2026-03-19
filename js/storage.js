/* ============================================================
   STORAGE — localStorage wrapper with namespaced keys
   + Firestore cloud sync when signed in
   ============================================================ */
import { syncToCloud, getUser } from './firebase.js';

const PREFIX = 'gp-';

function key(name) { return PREFIX + name; }

export function load(name, fallback = null) {
  try {
    const raw = localStorage.getItem(key(name));
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

export function save(name, value) {
  try {
    localStorage.setItem(key(name), JSON.stringify(value));
  } catch { /* quota exceeded — silently fail */ }

  // Fire-and-forget sync to Firestore if signed in
  if (getUser()) {
    syncToCloud(name, value).catch(() => {});
  }
}

export function remove(name) {
  localStorage.removeItem(key(name));
}

export function clearAll() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PREFIX)) keys.push(k);
  }
  keys.forEach(k => localStorage.removeItem(k));
}

/* ── Specific stores ─────────────────────────────────────── */

// Weekly plan checkbox state
export function loadWeek()       { return load('week', {}); }
export function saveWeek(state)  { save('week', state); }

// Session logs (capped at 50)
export function loadSessions()         { return load('sessions', []); }
export function saveSessions(sessions) { save('sessions', sessions.slice(0, 50)); }

// Session builder last state
export function loadBuilder()       { return load('builder', { location: 'home', time: 15, focus: 'balanced' }); }
export function saveBuilder(state)  { save('builder', state); }

// User-added videos
export function loadUserVideos()       { return load('user-videos', []); }
export function saveUserVideos(videos) { save('user-videos', videos); }

// Personal course notes
export function loadNotes()       { return load('notes', []); }
export function saveNotes(notes)  { save('notes', notes); }

// Gear owned
export function loadGearOwned()       { return load('gear-owned', ['alignment-sticks']); }
export function saveGearOwned(ids)    { save('gear-owned', ids); }

// Driver distance goals
export function loadGoals()       { return load('goals', null); }
export function saveGoals(goals)  { save('goals', goals); }

// User preferences
export function loadPrefs()       { return load('prefs', { lastTab: 'course' }); }
export function savePrefs(prefs)  { save('prefs', prefs); }

/* ── HTML escaping ───────────────────────────────────────── */
const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export function esc(str) {
  return String(str).replace(/[&<>"']/g, c => ESC_MAP[c]);
}

export function sanitiseUrl(url) {
  try {
    const u = new URL(url);
    if (u.protocol === 'https:' || u.protocol === 'http:') return u.href;
  } catch { /* invalid */ }
  return '';
}
