/* ============================================================
   SESSION BUILDER — Generates a practice plan from user input
   ============================================================ */
import { drills, builderSequences, focusLabels, locationLabels } from '../data.js';
import { loadBuilder, saveBuilder, loadGearOwned, esc } from '../storage.js';
import { openTimer } from './timer.js';

let rootEl;

export function initSessionBuilder(el) {
  rootEl = el;
  render();
}

function render() {
  const saved = loadBuilder();
  rootEl.innerHTML = `
    <div class="card">
      <div class="section-header">
        <div class="eyebrow">Build a Session</div>
        <h2>Session Builder</h2>
        <p class="section-copy">Pick your location, time, and focus — get a structured practice plan.</p>
      </div>
      <form id="builder-form" class="builder-form">
        <label class="form-label">Location
          <select id="builder-location" class="form-select">
            ${Object.entries(locationLabels).map(([k, v]) =>
              `<option value="${k}" ${k === saved.location ? 'selected' : ''}>${v}</option>`
            ).join('')}
          </select>
        </label>
        <label class="form-label">Available Time
          <div class="form-chips" id="builder-time">
            ${[10, 15, 20, 30, 45, 60].map(m =>
              `<button type="button" class="form-chip ${m === saved.time ? 'selected' : ''}" data-time="${m}">${m} min</button>`
            ).join('')}
          </div>
        </label>
        <label class="form-label">Focus
          <select id="builder-focus" class="form-select">
            ${Object.entries(focusLabels).map(([k, v]) =>
              `<option value="${k}" ${k === saved.focus ? 'selected' : ''}>${v}</option>`
            ).join('')}
          </select>
        </label>
        <button type="submit" class="button button--primary button--full">Generate Plan</button>
      </form>
      <div id="builder-result" class="builder-result"></div>
    </div>
  `;

  // Time chip selection
  const timeContainer = rootEl.querySelector('#builder-time');
  timeContainer.addEventListener('click', e => {
    const chip = e.target.closest('.form-chip');
    if (!chip) return;
    timeContainer.querySelectorAll('.form-chip').forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
  });

  // Form submit
  rootEl.querySelector('#builder-form').addEventListener('submit', e => {
    e.preventDefault();
    generatePlan();
  });
}

function getFormState() {
  const location = rootEl.querySelector('#builder-location').value;
  const timeChip = rootEl.querySelector('#builder-time .form-chip.selected');
  const time = timeChip ? parseInt(timeChip.dataset.time, 10) : 15;
  const focus = rootEl.querySelector('#builder-focus').value;
  return { location, time, focus };
}

function generatePlan() {
  const { location, time, focus } = getFormState();
  saveBuilder({ location, time, focus });

  const sequence = builderSequences[location]?.[focus] || builderSequences[location]?.balanced || [];
  const ownedGear = loadGearOwned();

  // Filter drills by equipment owned (keep drills with no equipment or equipment user owns)
  const available = sequence
    .map(id => drills.find(d => d.id === id))
    .filter(Boolean)
    .filter(d =>
      d.equipment.length === 0 ||
      d.equipment.some(eq => ownedGear.includes(eq))
    );

  if (available.length === 0) {
    rootEl.querySelector('#builder-result').innerHTML =
      '<p class="text-sm text-muted" style="margin-top:var(--sp-3)">No matching drills found. Try a different focus or check your gear.</p>';
    return;
  }

  // Allocate time
  const allocated = allocateMinutes(available, time);

  const resultEl = rootEl.querySelector('#builder-result');
  resultEl.innerHTML = `
    <div class="section-header" style="margin-top:var(--sp-4)">
      <div class="eyebrow">Your Plan</div>
      <h3>${locationLabels[location]} · ${time} min · ${focusLabels[focus]}</h3>
    </div>
    ${allocated.map((item, i) => `
      <div class="session-block">
        <div class="session-block__order">${i + 1}</div>
        <div class="session-block__info">
          <div class="session-block__name">${esc(item.drill.title)}</div>
          <div class="session-block__time">${item.minutes} min</div>
        </div>
        <button class="session-block__timer" data-drill-id="${item.drill.id}" data-minutes="${item.minutes}">
          ▶ Timer
        </button>
      </div>
    `).join('')}
  `;

  // Timer buttons
  resultEl.querySelectorAll('.session-block__timer').forEach(btn => {
    btn.addEventListener('click', () => {
      const drill = drills.find(d => d.id === btn.dataset.drillId);
      const mins = parseInt(btn.dataset.minutes, 10);
      openTimer(mins * 60, drill?.title || 'Drill');
    });
  });
}

function allocateMinutes(availableDrills, totalMinutes) {
  // Smart allocation: use as many drills as fit, min 5 min each
  const minPerDrill = 5;
  const maxDrills = Math.min(availableDrills.length, Math.floor(totalMinutes / minPerDrill));
  const selected = availableDrills.slice(0, Math.max(1, maxDrills));

  // Evenly distribute, then add remainder to first drills
  const baseMin = Math.floor(totalMinutes / selected.length);
  let remainder = totalMinutes - baseMin * selected.length;

  return selected.map(drill => {
    const extra = remainder > 0 ? 1 : 0;
    remainder--;
    return { drill, minutes: baseMin + extra };
  });
}
