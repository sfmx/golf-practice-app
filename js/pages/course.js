/* ============================================================
   COURSE — On-course tips tab (situations, clubs, pre-shot,
            strategy, personal notes)
   ============================================================ */
import { situationalTips, clubReminders, preShotRoutine, courseManagement, courses, defaultClubDistances } from '../data.js';
import { loadNotes, saveNotes, loadClubDistances, esc } from '../storage.js';

const CHEVRON = `<svg class="chevron-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
const CHECK_SVG = `<svg class="preshot-step__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

export function initCourse() {
  renderHoleGuide();
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
  if (nav._listenerAdded) return;
  nav._listenerAdded = true;
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

/* ── Hole Guide ─────────────────────────────────────────── */
let _selectedCourseId = null;

function getClubDistances() {
  return loadClubDistances() || defaultClubDistances;
}

function renderHoleGuide() {
  const el = document.getElementById('course-holes');
  if (_selectedCourseId) {
    renderCourseDetail(el, _selectedCourseId);
  } else {
    renderCourseList(el);
  }
}

function renderCourseList(el) {
  el.innerHTML = `
    <div class="section-header">
      <div class="eyebrow">On the Course</div>
      <h2>Hole Guide</h2>
      <p class="section-copy">Choose a course to see your hole-by-hole approach plan.</p>
    </div>
    <div class="course-select-grid">
      ${courses.map(c => `
        <button class="course-select-card card card--accent" data-course-id="${c.id}">
          <div class="course-select-card__icon">⛳</div>
          <div class="course-select-card__info">
            <span class="course-select-card__name">${esc(c.name)}</span>
            <span class="course-select-card__detail">${esc(c.tees)} Tees · Par ${c.par} · ${c.totalDistance}m</span>
            ${c.location ? `<span class="course-select-card__location">${esc(c.location)}</span>` : ''}
          </div>
          <svg class="course-select-card__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      `).join('')}
    </div>
  `;

  el.addEventListener('click', e => {
    const card = e.target.closest('[data-course-id]');
    if (!card) return;
    _selectedCourseId = card.dataset.courseId;
    renderHoleGuide();
  });
}

function renderCourseDetail(el, courseId) {
  const course = courses.find(c => c.id === courseId);
  if (!course) { _selectedCourseId = null; renderCourseList(el); return; }

  const clubs = getClubDistances();
  const distNote = 'Distances from your My Clubs settings in the Gear tab. Update them as you improve!';

  const legend = clubs.map(c =>
    `<span class="club-dist-chip"><strong>${esc(c.club)}</strong> ${c.distance}m</span>`
  ).join('');

  el.innerHTML = `
    <button class="back-btn" id="hole-guide-back">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      All Courses
    </button>
    <div class="section-header">
      <div class="eyebrow">${esc(course.name)} — ${esc(course.tees)} Tees</div>
      <h2>Hole-by-Hole Guide</h2>
      <p class="section-copy">Par ${course.par} · ${course.totalDistance}m · Slope ${course.slope}</p>
    </div>
    <div class="club-dist-legend">
      ${legend}
    </div>
    <div class="club-dist-note">
      💡 ${esc(distNote)}
    </div>
    <div class="hole-guide-grid">
      ${course.holes.map(h => {
        const lastRemaining = h.shots[h.shots.length - 1]?.remaining ?? 0;
        const needsChip = lastRemaining > 5;
        let shotNum = 0;

        const clubShotsHtml = h.shots.map((s, i) => {
          shotNum++;
          const isLast = i === h.shots.length - 1;
          return `
            <div class="hole-shot">
              <div class="hole-shot__num">${shotNum}</div>
              <div class="hole-shot__info">
                <span class="hole-shot__club">${esc(s.club)}</span>
                <span class="hole-shot__carry">${s.carry}m</span>
              </div>
              <div class="hole-shot__remaining">
                ${isLast && !needsChip ? '<span class="hole-shot__on">On green ✓</span>' : `${s.remaining}m left`}
              </div>
            </div>
          `;
        }).join('');

        const chipHtml = needsChip ? (() => {
          shotNum++;
          return `
            <div class="hole-shot hole-shot--short">
              <div class="hole-shot__num">${shotNum}</div>
              <div class="hole-shot__info">
                <span class="hole-shot__club">Chip</span>
                <span class="hole-shot__carry">${lastRemaining}m</span>
              </div>
              <div class="hole-shot__remaining"><span class="hole-shot__on">On green ✓</span></div>
            </div>
          `;
        })() : '';

        const putt1Num = ++shotNum;
        const putt2Num = ++shotNum;
        const puttsHtml = `
          <div class="hole-shot hole-shot--putt">
            <div class="hole-shot__num">${putt1Num}</div>
            <div class="hole-shot__info">
              <span class="hole-shot__club">Putt</span>
            </div>
            <div class="hole-shot__remaining">Lag close</div>
          </div>
          <div class="hole-shot hole-shot--putt">
            <div class="hole-shot__num">${putt2Num}</div>
            <div class="hole-shot__info">
              <span class="hole-shot__club">Putt</span>
            </div>
            <div class="hole-shot__remaining">In the hole ⛳</div>
          </div>
        `;

        const estimatedStrokes = shotNum;
        const scoreDiff = estimatedStrokes - h.par;
        const scoreName = scoreDiff <= -2 ? 'Eagle chance' : scoreDiff === -1 ? 'Birdie chance' : scoreDiff === 0 ? 'Par target' : scoreDiff === 1 ? 'Bogey target' : `+${scoreDiff} target`;

        return `
          <div class="card card--expandable card--accent hole-card" data-id="hole-${h.hole}">
            <div class="card__header">
              <div class="hole-card__header-left">
                <div class="hole-card__number">${h.hole}</div>
                <div class="hole-card__meta">
                  <span class="hole-card__par">Par ${h.par}</span>
                  <span class="hole-card__dist">${h.distance}m</span>
                  <span class="hole-card__idx">HI ${h.index}</span>
                </div>
              </div>
              <div class="hole-card__header-right">
                <span class="hole-card__shots-badge">${esc(scoreName)}</span>
                ${CHEVRON}
              </div>
            </div>
            <div class="card__body">
              <div class="hole-shots-plan">
                ${clubShotsHtml}
                ${chipHtml}
                ${puttsHtml}
              </div>
              <div class="hole-strategy">
                <h4>📋 Strategy</h4>
                <p>${esc(h.strategy)}</p>
              </div>
              <div class="hole-tip">
                <h4>💡 Tip</h4>
                <p>${esc(h.tip)}</p>
              </div>
              <div class="hole-bogey">
                <h4>🎯 ${esc(scoreName)}</h4>
                <p>${esc(h.bogeyPlan)}</p>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  el.querySelector('#hole-guide-back').addEventListener('click', () => {
    _selectedCourseId = null;
    renderHoleGuide();
  });

  addExpandListeners(el);
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
  if (fab._listenerAdded) return;
  fab._listenerAdded = true;
  fab.addEventListener('click', () => {
    document.getElementById('note-modal').classList.remove('hidden');
  });
}

function initNoteModal() {
  const modal = document.getElementById('note-modal');
  if (modal._listenerAdded) return;
  modal._listenerAdded = true;
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
  if (container._expandListenerAdded) return;
  container._expandListenerAdded = true;
  container.addEventListener('click', e => {
    const header = e.target.closest('.card--expandable .card__header');
    if (!header) return;
    const card = header.closest('.card--expandable');
    card.classList.toggle('open');
  });
}
