/* ============================================================
   LIBRARY — Drill & Video library tab
   ============================================================ */
import { drills, focusLabels } from '../data.js';
import { loadUserVideos, saveUserVideos, esc, sanitiseUrl } from '../storage.js';
import { openTimer } from '../components/timer.js';

let curatedVideos = {};
let filterFocus = 'all';
let filterLocation = 'all';

const CHEVRON = `<svg class="chevron-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

export async function initLibrary() {
  await loadVideos();
  renderFilters();
  renderDrills();
}

async function loadVideos() {
  try {
    const res = await fetch('videos.json');
    const data = await res.json();
    curatedVideos = data.drills || {};
  } catch {
    curatedVideos = {};
  }
}

function renderFilters() {
  const el = document.getElementById('drill-filters');
  const focusOptions = [['all', 'All'], ...Object.entries(focusLabels)];
  const locationOptions = [['all', 'All'], ['home', 'Home'], ['range', 'Range']];

  el.innerHTML = `
    <div class="drill-filters">
      <div>
        <span class="text-xs text-muted" style="display:block;margin-bottom:2px;font-weight:600">Focus</span>
        <div style="display:flex;gap:var(--sp-1);flex-wrap:wrap">
          ${focusOptions.map(([k, v]) =>
            `<button class="pill ${k === filterFocus ? 'active' : ''}" data-filter="focus" data-value="${k}">${v}</button>`
          ).join('')}
        </div>
      </div>
      <div style="margin-top:var(--sp-2)">
        <span class="text-xs text-muted" style="display:block;margin-bottom:2px;font-weight:600">Location</span>
        <div style="display:flex;gap:var(--sp-1);flex-wrap:wrap">
          ${locationOptions.map(([k, v]) =>
            `<button class="pill ${k === filterLocation ? 'active' : ''}" data-filter="location" data-value="${k}">${v}</button>`
          ).join('')}
        </div>
      </div>
    </div>
  `;

  el.addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    const { filter, value } = pill.dataset;
    if (filter === 'focus') filterFocus = value;
    if (filter === 'location') filterLocation = value;
    renderFilters();
    renderDrills();
  });
}

function renderDrills() {
  const el = document.getElementById('drill-grid');
  const userVideos = loadUserVideos();

  const filtered = drills.filter(d => {
    if (filterFocus !== 'all' && !d.focus.includes(filterFocus)) return false;
    if (filterLocation !== 'all' && !d.locations.includes(filterLocation)) return false;
    return true;
  });

  if (filtered.length === 0) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🔍</div>
        <div class="empty-state__text">No drills match these filters. Try a different combination.</div>
      </div>
    `;
    return;
  }

  el.innerHTML = `
    <div class="drill-list">
      ${filtered.map(drill => {
        const videos = [
          ...(curatedVideos[drill.id] || []),
          ...userVideos.filter(v => v.drillId === drill.id)
        ];

        return `
          <div class="card card--expandable" data-drill-id="${drill.id}">
            <div class="card__header">
              <div>
                <div class="card__title">${esc(drill.title)}</div>
                <div class="card__subtitle">${drill.defaultMinutes} min · ${drill.locations.map(l => l === 'home' ? 'Home' : 'Range').join(' / ')}</div>
              </div>
              ${CHEVRON}
            </div>
            <div class="card__body">
              <p style="margin-bottom:var(--sp-3)">${esc(drill.description)}</p>

              <div class="drill-card__meta">
                ${drill.focus.map(f => `<span class="tag">${focusLabels[f] || f}</span>`).join('')}
                ${drill.equipment.length > 0 ? drill.equipment.map(eq =>
                  `<span class="tag tag--orange">${eq.replace('-', ' ')}</span>`
                ).join('') : '<span class="tag tag--muted">No equipment</span>'}
              </div>

              <h4 style="margin:var(--sp-3) 0 var(--sp-1)">Steps</h4>
              <ol class="drill-card__steps">
                ${drill.steps.map(s => `<li>${esc(s)}</li>`).join('')}
              </ol>

              <div class="drill-card__cues">
                ${drill.cues.map(c => `<div class="drill-card__cue">${esc(c)}</div>`).join('')}
              </div>

              ${videos.length > 0 ? `
                <h4 style="margin-top:var(--sp-3);margin-bottom:var(--sp-2)">Videos</h4>
                <div class="drill-card__videos">
                  ${videos.map(v => `
                    <a href="${esc(v.url)}" target="_blank" rel="noopener" class="video-link">
                      <span class="video-link__icon">▶</span>
                      <div class="video-link__info">
                        <div class="video-link__title">${esc(v.title)}</div>
                        <div class="video-link__channel">${esc(v.channel)}${v.note ? ` — ${esc(v.note)}` : ''}</div>
                      </div>
                    </a>
                  `).join('')}
                </div>
              ` : ''}

              <div style="margin-top:var(--sp-3);display:flex;gap:var(--sp-2)">
                <button class="button button--primary button--small drill-timer-btn" data-drill-id="${drill.id}" data-minutes="${drill.defaultMinutes}">
                  ▶ Start Timer (${drill.defaultMinutes}m)
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Expand/collapse
  el.addEventListener('click', e => {
    const header = e.target.closest('.card--expandable .card__header');
    if (header) {
      header.closest('.card--expandable').classList.toggle('open');
      return;
    }
    // Timer button
    const timerBtn = e.target.closest('.drill-timer-btn');
    if (timerBtn) {
      const drill = drills.find(d => d.id === timerBtn.dataset.drillId);
      const mins = parseInt(timerBtn.dataset.minutes, 10);
      openTimer(mins * 60, drill?.title || 'Drill');
    }
  });
}
