/* ============================================================
   TIMER — Countdown timer component (overlay)
   ============================================================ */

const CIRCUMFERENCE = 2 * Math.PI * 54; // matches SVG circle r=54

let state = {
  totalSeconds: 300,
  remaining: 300,
  running: false,
  interval: null,
  drillName: 'Timer'
};

let els = {};

export function initTimer() {
  els = {
    overlay:   document.getElementById('timer-overlay'),
    close:     document.getElementById('timer-close'),
    drillName: document.getElementById('timer-drill-name'),
    display:   document.getElementById('timer-display'),
    ring:      document.getElementById('timer-ring'),
    start:     document.getElementById('timer-start'),
    pause:     document.getElementById('timer-pause'),
    reset:     document.getElementById('timer-reset')
  };

  // Set initial stroke
  els.ring.style.strokeDasharray = CIRCUMFERENCE;
  els.ring.style.strokeDashoffset = '0';

  // Preset buttons
  els.overlay.querySelectorAll('.pill-button[data-minutes]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mins = parseInt(btn.dataset.minutes, 10);
      setTime(mins * 60);
    });
  });

  els.start.addEventListener('click', startTimer);
  els.pause.addEventListener('click', pauseTimer);
  els.reset.addEventListener('click', resetTimer);
  els.close.addEventListener('click', closeTimer);

  // Close on backdrop click
  els.overlay.addEventListener('click', e => {
    if (e.target === els.overlay) closeTimer();
  });
}

export function openTimer(seconds = 300, drillName = 'Timer') {
  state.drillName = drillName;
  els.drillName.textContent = drillName;
  setTime(seconds);
  els.overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeTimer() {
  pauseTimer();
  els.overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

function setTime(seconds) {
  pauseTimer();
  state.totalSeconds = seconds;
  state.remaining = seconds;
  updateDisplay();
  updateRing();
  els.start.classList.remove('hidden');
  els.pause.classList.add('hidden');
}

function startTimer() {
  if (state.running) return;
  if (state.remaining <= 0) setTime(state.totalSeconds);
  state.running = true;
  els.start.classList.add('hidden');
  els.pause.classList.remove('hidden');

  state.interval = setInterval(() => {
    state.remaining--;
    updateDisplay();
    updateRing();

    if (state.remaining <= 0) {
      pauseTimer();
      onComplete();
    }
  }, 1000);
}

function pauseTimer() {
  state.running = false;
  clearInterval(state.interval);
  state.interval = null;
  els.start.classList.remove('hidden');
  els.pause.classList.add('hidden');
}

function resetTimer() {
  pauseTimer();
  state.remaining = state.totalSeconds;
  updateDisplay();
  updateRing();
}

function updateDisplay() {
  const m = Math.floor(state.remaining / 60);
  const s = state.remaining % 60;
  els.display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateRing() {
  const progress = state.totalSeconds > 0
    ? (state.totalSeconds - state.remaining) / state.totalSeconds
    : 0;
  els.ring.style.strokeDashoffset = (CIRCUMFERENCE * progress).toFixed(1);
}

function onComplete() {
  els.display.textContent = '00:00';

  // Vibrate if available
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 400]);
  }

  // Flash the display
  els.display.style.color = 'var(--accent)';
  setTimeout(() => { els.display.style.color = ''; }, 2000);

  els.start.classList.remove('hidden');
  els.pause.classList.add('hidden');
}
