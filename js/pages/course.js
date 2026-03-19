/* ============================================================
   COURSE — On-course tips tab (situations, clubs, pre-shot,
            strategy, personal notes)
   ============================================================ */
import { situationalTips, clubReminders, preShotRoutine, courseManagement } from '../data.js';
import { loadNotes, saveNotes, esc } from '../storage.js';

const CHEVRON = `<svg class="chevron-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
const CHECK_SVG = `<svg class="preshot-step__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

export function initCourse() {
  renderSituations();
  renderClubs();
  renderPreShot();
  renderStrategy();
  renderNotes();
  initSubNav();
  initFab();
  initNoteModal();
}

/* ── Sub-navigation ─────────────────────────────────────── */
function initSubNav() {
  const nav = document.querySelector('#tab-course .sub-nav');
  nav.addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    const sub = pill.dataset.sub;

    nav.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    document.querySelectorAll('#tab-course .sub-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`course-${sub}`)?.classList.add('active');

    // Show FAB only on notes sub-panel
    const fab = document.getElementById('fab-add-note');
    if (sub === 'notes') fab.classList.remove('hidden');
    else fab.classList.add('hidden');
  });
}

/* ── Situational Tips ───────────────────────────────────── */
function renderSituations() {
  const el = document.getElementById('course-situations');
  el.innerHTML = `
    <div class="section-header">
      <div class="eyebrow">On the Course</div>
      <h2>Situational Tips</h2>
      <p class="section-copy">Tap a situation to see tips and common mistakes to avoid.</p>
    </div>
    <div class="situation-grid">
      ${situationalTips.map(tip => `
        <div class="card card--expandable card--accent" data-id="${tip.id}">
          <div class="card__header">
            <div>
              <span style="margin-right:4px">${tip.icon}</span>
              <span class="card__title">${esc(tip.scenario)}</span>
            </div>
            ${CHEVRON}
          </div>
          <div class="card__body">
            <p style="margin-bottom:var(--sp-3);font-weight:500">${esc(tip.tip)}</p>
            <h4 style="margin-bottom:var(--sp-1)">Key Cues</h4>
            <ul>
              ${tip.cues.map(c => `<li>${esc(c)}</li>`).join('')}
            </ul>
            <div class="card card--danger" style="margin-top:var(--sp-3);padding:var(--sp-3)">
              <div class="card__subtitle" style="font-weight:700;color:var(--danger);margin-bottom:var(--sp-1)">⚠️ Common Mistake</div>
              <p class="text-sm">${esc(tip.mistake)}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  addExpandListeners(el);
}

/* ── Club Reminders ─────────────────────────────────────── */
function renderClubs() {
  const el = document.getElementById('course-clubs');
  el.innerHTML = `
    <div class="section-header">
      <div class="eyebrow">Quick Reference</div>
      <h2>Club Tips</h2>
      <p class="section-copy">Swing cues and fault fixes for each club in your bag.</p>
    </div>
    <div class="club-grid">
      ${clubReminders.map(club => `
        <div class="card card--expandable card--accent" data-id="${club.id}">
          <div class="card__header">
            <div>
              <span style="margin-right:4px">${club.icon}</span>
              <span class="card__title">${esc(club.club)}</span>
            </div>
            ${CHEVRON}
          </div>
          <div class="card__body">
            <h4>Ball Position</h4>
            <div class="ball-pos ball-pos--${club.ballPosition}" style="margin-bottom:var(--sp-3)">
              ${club.ballPosition === 'forward' ? `
                <div class="ball-pos__ball"></div>
                <div class="ball-pos__foot" style="margin-left:4px" title="Lead foot"></div>
                <div style="flex:1"></div>
                <div class="ball-pos__foot" title="Trail foot"></div>
              ` : `
                <div class="ball-pos__foot" title="Lead foot"></div>
                <div style="flex:1"></div>
                <div class="ball-pos__ball"></div>
                <div style="flex:1"></div>
                <div class="ball-pos__foot" title="Trail foot"></div>
              `}
            </div>
            <h4 style="margin-bottom:var(--sp-1)">Swing Cues</h4>
            <ul>
              ${club.cues.map(c => `<li>${esc(c)}</li>`).join('')}
            </ul>
            <div class="card card--warning" style="margin-top:var(--sp-3);padding:var(--sp-3)">
              <div class="card__subtitle" style="font-weight:700;color:var(--warning);margin-bottom:var(--sp-1)">Common Fault: ${esc(club.fault)}</div>
              <p class="text-sm">${esc(club.fix)}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  addExpandListeners(el);
}

/* ── Pre-Shot Routine ───────────────────────────────────── */
function renderPreShot() {
  const el = document.getElementById('course-preshot');
  el.innerHTML = `
    <div class="section-header">
      <div class="eyebrow">Every Shot</div>
      <h2>Pre-Shot Routine</h2>
      <p class="section-copy">Tap each step as you complete it. Resets automatically for the next shot.</p>
    </div>
    <div class="preshot-steps" id="preshot-steps">
      ${preShotRoutine.map(s => `
        <div class="preshot-step" data-step="${s.step}">
          <div class="preshot-step__num">${s.step}</div>
          <div class="preshot-step__text">${esc(s.text)}</div>
          ${CHECK_SVG}
        </div>
      `).join('')}
    </div>
    <button class="button button--ghost button--small preshot-reset" id="preshot-reset">Reset Routine</button>
  `;

  const stepsEl = el.querySelector('#preshot-steps');
  stepsEl.addEventListener('click', e => {
    const step = e.target.closest('.preshot-step');
    if (!step || step.classList.contains('done')) return;
    step.classList.add('done');

    // Vibrate lightly
    if (navigator.vibrate) navigator.vibrate(30);

    // Auto-reset after last step
    const allDone = stepsEl.querySelectorAll('.preshot-step.done').length === preShotRoutine.length;
    if (allDone) {
      setTimeout(() => {
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
        resetPreShot(stepsEl);
      }, 1500);
    }
  });

  el.querySelector('#preshot-reset').addEventListener('click', () => resetPreShot(stepsEl));
}

function resetPreShot(container) {
  container.querySelectorAll('.preshot-step').forEach(s => s.classList.remove('done'));
}

/* ── Course Management ──────────────────────────────────── */
function renderStrategy() {
  const el = document.getElementById('course-strategy');
  el.innerHTML = `
    <div class="section-header">
      <div class="eyebrow">Think Smart</div>
      <h2>Course Management</h2>
      <p class="section-copy">Strategy tips that save strokes without changing your swing.</p>
    </div>
    <div class="strategy-grid">
      ${courseManagement.map(tip => `
        <div class="card card--expandable card--accent" data-id="${tip.id}">
          <div class="card__header">
            <div>
              <span style="margin-right:4px">${tip.icon}</span>
              <span class="card__title">${esc(tip.title)}</span>
            </div>
            ${CHEVRON}
          </div>
          <div class="card__body">
            <p style="margin-bottom:var(--sp-3);font-weight:500">${esc(tip.tip)}</p>
            <ul>
              ${tip.details.map(d => `<li>${esc(d)}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  addExpandListeners(el);
}

/* ── Personal Notes ─────────────────────────────────────── */
function renderNotes() {
  const el = document.getElementById('course-notes');
  const notes = loadNotes();

  el.innerHTML = `
    <div class="section-header">
      <div class="eyebrow">Your Insights</div>
      <h2>My Notes</h2>
      <p class="section-copy">Capture tips and thoughts during your rounds. Tap + to add.</p>
    </div>
    <div id="notes-list">
      ${notes.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state__icon">📝</div>
          <div class="empty-state__text">No notes yet. Tap the + button to add your first course note.</div>
        </div>
      ` : notes.map((note, i) => `
        <div class="card note-card" data-index="${i}">
          <div class="note-card__meta">
            <span class="tag">${esc(note.category)}</span>
            ${note.club ? `<span class="tag tag--muted">${esc(note.club)}</span>` : ''}
            <span class="note-card__date">${esc(note.date)}</span>
          </div>
          <div class="note-card__text">${esc(note.text)}</div>
          <button class="note-card__delete" data-index="${i}" aria-label="Delete note">&times;</button>
        </div>
      `).join('')}
    </div>
  `;

  // Delete buttons
  el.querySelector('#notes-list').addEventListener('click', e => {
    const btn = e.target.closest('.note-card__delete');
    if (!btn) return;
    const idx = parseInt(btn.dataset.index, 10);
    const allNotes = loadNotes();
    allNotes.splice(idx, 1);
    saveNotes(allNotes);
    renderNotes();
  });
}

/* ── FAB & Modal ────────────────────────────────────────── */
function initFab() {
  const fab = document.getElementById('fab-add-note');
  fab.addEventListener('click', () => {
    document.getElementById('note-modal').classList.remove('hidden');
  });
}

function initNoteModal() {
  const modal = document.getElementById('note-modal');
  const form = document.getElementById('note-form');

  modal.querySelector('.modal__backdrop').addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('note-cancel').addEventListener('click', () => modal.classList.add('hidden'));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const category = document.getElementById('note-category').value;
    const club = document.getElementById('note-club').value;
    const text = document.getElementById('note-text').value.trim();
    if (!text) return;

    const notes = loadNotes();
    notes.unshift({
      category,
      club: club || null,
      text,
      date: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    saveNotes(notes);
    form.reset();
    modal.classList.add('hidden');
    renderNotes();
  });
}

/* ── Helpers ─────────────────────────────────────────────── */
function addExpandListeners(container) {
  container.addEventListener('click', e => {
    const header = e.target.closest('.card--expandable .card__header');
    if (!header) return;
    const card = header.closest('.card--expandable');
    card.classList.toggle('open');
  });
}
