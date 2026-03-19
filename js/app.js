/* ============================================================
   APP — Entry point, tab routing, PWA install
   ============================================================ */
import { tabLabels } from './data.js';
import { loadPrefs, savePrefs } from './storage.js';
import { initTimer } from './components/timer.js';
import { initCourse } from './pages/course.js';
import { initPractice } from './pages/practice.js';
import { initLibrary } from './pages/library.js';
import { initProgress } from './pages/progress.js';
import { initGear } from './pages/gear.js';

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

/* ── Init ───────────────────────────────────────────────── */
async function init() {
  initTimer();
  initCourse();
  initPractice();
  await initLibrary();
  initProgress();
  initGear();
  handleHash();
}

init();
