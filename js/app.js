/* ============================================================
   APP — Entry point, tab routing, PWA install, Firebase auth
   ============================================================ */
import { tabLabels } from './data.js';
import { loadPrefs, savePrefs } from './storage.js';
import { initTimer } from './components/timer.js';
import { initCourse } from './pages/course.js';
import { initPractice } from './pages/practice.js';
import { initLibrary } from './pages/library.js';
import { initProgress } from './pages/progress.js';
import { initGear } from './pages/gear.js';
import { initFirebase, signIn, signOut, getUser, fullSync } from './firebase.js';

const APP_VERSION = '1.1.0';

/* ── Tab Routing ────────────────────────────────────────── */
const tabBtns = document.querySelectorAll('.tab-bar__btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const subtitle = document.getElementById('top-bar-subtitle');
const fab = document.getElementById('fab-add-note');

function switchTab(tabId) {
  // Update buttons
  tabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Update panels
  tabPanels.forEach(panel => {
    panel.classList.toggle('active', panel.dataset.tab === tabId);
  });

  // Update top bar subtitle
  subtitle.textContent = tabLabels[tabId] || '';

  // Show/hide FAB (only on course > notes)
  if (tabId === 'course') {
    const activeSubPill = document.querySelector('#tab-course .sub-nav .pill.active');
    if (activeSubPill?.dataset.sub === 'notes') fab.classList.remove('hidden');
    else fab.classList.add('hidden');
  } else {
    fab.classList.add('hidden');
  }

  // Save preference
  const prefs = loadPrefs();
  prefs.lastTab = tabId;
  savePrefs(prefs);

  // Update hash
  window.location.hash = tabId;
}

// Tab bar click handlers
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Hash-based routing
function handleHash() {
  const hash = window.location.hash.replace('#', '') || loadPrefs().lastTab || 'course';
  const valid = ['course', 'practice', 'drills', 'progress', 'gear'];
  switchTab(valid.includes(hash) ? hash : 'course');
}

window.addEventListener('hashchange', handleHash);

/* ── PWA Install ────────────────────────────────────────── */
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('install-banner');
  banner.classList.remove('hidden');
});

document.getElementById('install-btn')?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('install-banner').classList.add('hidden');
});

document.getElementById('install-dismiss')?.addEventListener('click', () => {
  document.getElementById('install-banner').classList.add('hidden');
});

/* ── Service Worker ─────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

/* ── Firebase Auth UI ────────────────────────────────────── */
const authBtn = document.getElementById('auth-btn');
const authIcon = document.getElementById('auth-icon');
const authAvatar = document.getElementById('auth-avatar');
const syncIndicator = document.getElementById('sync-indicator');

function updateAuthUI(user) {
  if (user) {
    // Signed in — show avatar
    authIcon.classList.add('hidden');
    authAvatar.classList.remove('hidden');
    authAvatar.src = user.photoURL || '';
    authAvatar.alt = user.displayName || 'User';
    authBtn.title = `Signed in as ${user.displayName || user.email}. Tap to sign out.`;
    syncIndicator.classList.remove('hidden');
  } else {
    // Signed out — show person icon
    authIcon.classList.remove('hidden');
    authAvatar.classList.add('hidden');
    authAvatar.src = '';
    authBtn.title = 'Sign in to sync';
    syncIndicator.classList.add('hidden');
  }
}

async function handleAuthStateChange(user) {
  updateAuthUI(user);
  if (user) {
    // Sync data with cloud, then refresh UI
    showSyncing();
    await fullSync();
    hideSyncing();
    // Re-init pages to pick up synced data
    initCourse();
    initPractice();
    initProgress();
    initGear();
  }
}

function showSyncing() {
  syncIndicator.classList.remove('hidden');
  syncIndicator.classList.add('syncing');
}

function hideSyncing() {
  syncIndicator.classList.remove('syncing');
}

authBtn?.addEventListener('click', async () => {
  if (getUser()) {
    if (confirm('Sign out? Your data stays on this device but won\'t sync until you sign back in.')) {
      await signOut();
    }
  } else {
    await signIn();
  }
});

/* ── About Modal ─────────────────────────────────────────── */
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');

aboutBtn?.addEventListener('click', () => {
  document.getElementById('about-version').textContent = `Version ${APP_VERSION}`;
  document.getElementById('about-cache').textContent = `SW Cache: golf-practice-v6`;
  aboutModal.classList.remove('hidden');
});
document.getElementById('about-close')?.addEventListener('click', () => aboutModal.classList.add('hidden'));
aboutModal?.querySelector('.modal__backdrop')?.addEventListener('click', () => aboutModal.classList.add('hidden'));

/* ── Init ───────────────────────────────────────────────── */
async function init() {
  initTimer();
  initCourse();
  initPractice();
  await initLibrary();
  initProgress();
  initGear();
  handleHash();

  // Initialize Firebase (non-blocking — loads SDK async)
  initFirebase(handleAuthStateChange).catch(err => {
    console.warn('Firebase init failed (offline?):', err.message);
  });

  console.log(`Golf Practice v${APP_VERSION} loaded`);
}

init();
