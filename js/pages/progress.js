/* ============================================================
   PROGRESS — Session logger, metrics, driver goals
   ============================================================ */
import { driverDistanceGoals, focusLabels, locationLabels } from '../data.js';
import { loadSessions, saveSessions, loadGoals, saveGoals, esc } from '../storage.js';

export function initProgress() {
  renderMetrics();
  renderDriverGoals();
  renderSessionForm();
  renderSessionHistory();
}

/* ── Metrics Dashboard ──────────────────────────────────── */
function renderMetrics() {
  const el = document.getElementById('metrics-dashboard');
  const sessions = loadSessions();

  const total = sessions.length;
  const avgStrike = total > 0
    ? (sessions.reduce((s, e) => s + (e.strikeQuality || 0), 0) / total).toFixed(1)
    : '—';
  const carryEntries = sessions.filter(s => s.driverCarry > 0);
  const avgCarry = carryEntries.length > 0
    ? Math.round(carryEntries.reduce((s, e) => s + e.driverCarry, 0) / carryEntries.length)
    : '—';
  const speedEntries = sessions.filter(s => s.ballSpeed > 0);
  const avgSpeed = speedEntries.length > 0
    ? Math.round(speedEntries.reduce((s, e) => s + e.ballSpeed, 0) / speedEntries.length)
    : '—';

  el.innerHTML = `
    <div class="section-header">
      <div class="eyebrow">Your Numbers</div>
      <h2>Metrics</h2>
    </div>
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-card__value">${total}</div>
        <div class="metric-card__label">Sessions</div>
      </div>
      <div class="metric-card">
        <div class="metric-card__value">${avgStrike}</div>
        <div class="metric-card__label">Avg Strike (1-10)</div>
      </div>
      <div class="metric-card">
        <div class="metric-card__value">${avgCarry === '—' ? '—' : avgCarry + 'm'}</div>
        <div class="metric-card__label">Avg Driver Carry</div>
      </div>
      <div class="metric-card">
        <div class="metric-card__value">${avgSpeed === '—' ? '—' : avgSpeed + ' mph'}</div>
        <div class="metric-card__label">Avg Ball Speed</div>
      </div>
    </div>
  `;
}

/* ── Driver Distance Goals ──────────────────────────────── */
function renderDriverGoals() {
  const el = document.getElementById('driver-goals');
  const savedGoals = loadGoals();

  // Merge saved state with defaults
  const goals = driverDistanceGoals.map((g, i) => {
    if (savedGoals && savedGoals[i]) return { ...g, status: savedGoals[i].status };
    return { ...g };
  });

  el.innerHTML = `
    <div class="card" style="margin-bottom:var(--sp-4)">
      <div class="section-header">
        <div class="eyebrow">Driver Distance</div>
        <h2>Distance Goals</h2>
        <p class="section-copy">Tap a goal to mark it complete. Milestones unlock with better compression and lag.</p>
      </div>
      <div class="goals-list">
        ${goals.map((g, i) => `
          <div class="goal-card ${g.status}" data-index="${i}">
            <div class="goal-card__dist">${g.distance}</div>
            <div class="goal-card__info">
              <div class="goal-card__title">${esc(g.title)} ${g.status === 'complete' ? '✅' : g.status === 'active' ? '🔄' : '🔒'}</div>
              <div class="goal-card__detail">${esc(g.detail)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  el.addEventListener('click', e => {
    const card = e.target.closest('.goal-card');
    if (!card) return;
    const idx = parseInt(card.dataset.index, 10);
    const current = goals[idx];

    // Toggle between states: pending → active → complete → active
    if (current.status === 'pending') goals[idx].status = 'active';
    else if (current.status === 'active') goals[idx].status = 'complete';
    else goals[idx].status = 'active';

    saveGoals(goals.map(g => ({ status: g.status })));
    renderDriverGoals();
  });
}

/* ── Session Form ───────────────────────────────────────── */
function renderSessionForm() {
  const el = document.getElementById('session-form-root');
  const today = new Date().toISOString().split('T')[0];

  el.innerHTML = `
    <div class="card">
      <div class="section-header">
        <div class="eyebrow">Log a Session</div>
        <h2>Session Tracker</h2>
      </div>
      <form id="session-form" class="session-form">
        <div class="form-row">
          <label class="form-label">Date
            <input type="date" id="sf-date" class="form-input" value="${today}" required>
          </label>
          <label class="form-label">Location
            <select id="sf-location" class="form-select">
              <option value="home">Home</option>
              <option value="range">Driving Range</option>
              <option value="course">On Course</option>
            </select>
          </label>
        </div>
        <div class="form-row">
          <label class="form-label">Focus
            <select id="sf-focus" class="form-select">
              ${Object.entries(focusLabels).map(([k, v]) =>
                `<option value="${k}">${v}</option>`
              ).join('')}
            </select>
          </label>
          <label class="form-label">Duration (min)
            <input type="number" id="sf-duration" class="form-input" min="5" max="180" placeholder="15">
          </label>
        </div>
        <div class="form-row">
          <label class="form-label">Driver Carry (m)
            <input type="number" id="sf-carry" class="form-input" min="0" max="350" placeholder="Optional">
          </label>
          <label class="form-label">Ball Speed (mph)
            <input type="number" id="sf-speed" class="form-input" min="0" max="200" placeholder="Optional">
          </label>
        </div>
        <label class="form-label">Strike Quality
          <div style="display:flex;align-items:center;gap:var(--sp-2)">
            <input type="range" id="sf-strike" class="range-slider" min="1" max="10" value="5">
            <span id="sf-strike-val" class="text-sm" style="font-weight:700;min-width:24px;text-align:center">5</span>
          </div>
        </label>
        <label class="form-label">Notes
          <textarea id="sf-notes" class="form-textarea" rows="2" placeholder="How did it go?"></textarea>
        </label>
        <button type="submit" class="button button--primary button--full">Save Session</button>
      </form>
    </div>
  `;

  // Strike slider value display
  const strikeSlider = el.querySelector('#sf-strike');
  const strikeVal = el.querySelector('#sf-strike-val');
  strikeSlider.addEventListener('input', () => { strikeVal.textContent = strikeSlider.value; });

  // Form submit
  el.querySelector('#session-form').addEventListener('submit', e => {
    e.preventDefault();
    const session = {
      date: el.querySelector('#sf-date').value,
      location: el.querySelector('#sf-location').value,
      focus: el.querySelector('#sf-focus').value,
      duration: parseInt(el.querySelector('#sf-duration').value, 10) || 0,
      driverCarry: parseInt(el.querySelector('#sf-carry').value, 10) || 0,
      ballSpeed: parseInt(el.querySelector('#sf-speed').value, 10) || 0,
      strikeQuality: parseInt(strikeSlider.value, 10),
      notes: el.querySelector('#sf-notes').value.trim()
    };

    const sessions = loadSessions();
    sessions.unshift(session);
    saveSessions(sessions);

    el.querySelector('#session-form').reset();
    strikeSlider.value = 5;
    strikeVal.textContent = '5';
    el.querySelector('#sf-date').value = today;

    renderMetrics();
    renderSessionHistory();
  });
}

/* ── Session History ────────────────────────────────────── */
function renderSessionHistory() {
  const el = document.getElementById('session-history');
  const sessions = loadSessions();

  if (sessions.length === 0) {
    el.innerHTML = `
      <div class="empty-state" style="margin-top:var(--sp-4)">
        <div class="empty-state__icon">📊</div>
        <div class="empty-state__text">No sessions logged yet. Use the form above to track your practice.</div>
      </div>
    `;
    return;
  }

  el.innerHTML = `
    <div class="section-header" style="margin-top:var(--sp-4)">
      <h3>Session History</h3>
    </div>
    <div class="session-log-list">
      ${sessions.map((s, i) => `
        <div class="card session-log" data-index="${i}">
          <div class="session-log__header">
            <div>
              <span class="text-sm" style="font-weight:700">${esc(s.date)}</span>
              <span class="tag" style="margin-left:var(--sp-2)">${esc(focusLabels[s.focus] || s.focus)}</span>
              <span class="tag tag--muted">${s.location === 'home' ? 'Home' : s.location === 'range' ? 'Range' : 'Course'}</span>
            </div>
            <button class="note-card__delete" data-index="${i}" aria-label="Delete session">&times;</button>
          </div>
          <div class="session-log__stats">
            ${s.duration ? `<div class="session-log__stat"><span class="session-log__stat-label">Duration</span><span class="session-log__stat-value">${s.duration}m</span></div>` : ''}
            ${s.driverCarry ? `<div class="session-log__stat"><span class="session-log__stat-label">Carry</span><span class="session-log__stat-value">${s.driverCarry}m</span></div>` : ''}
            ${s.ballSpeed ? `<div class="session-log__stat"><span class="session-log__stat-label">Ball Spd</span><span class="session-log__stat-value">${s.ballSpeed}</span></div>` : ''}
            <div class="session-log__stat"><span class="session-log__stat-label">Strike</span><span class="session-log__stat-value">${s.strikeQuality}/10</span></div>
          </div>
          ${s.notes ? `<div class="session-log__notes">"${esc(s.notes)}"</div>` : ''}
        </div>
      `).join('')}
    </div>
  `;

  // Delete
  el.addEventListener('click', e => {
    const btn = e.target.closest('.note-card__delete');
    if (!btn) return;
    const idx = parseInt(btn.dataset.index, 10);
    const sessions = loadSessions();
    sessions.splice(idx, 1);
    saveSessions(sessions);
    renderMetrics();
    renderSessionHistory();
  });
}
