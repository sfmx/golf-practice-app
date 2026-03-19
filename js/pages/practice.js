/* ============================================================
   PRACTICE — Practice hub tab (today's plan, builder, weekly)
   ============================================================ */
import { weeklyPlan, drills } from '../data.js';
import { loadWeek, saveWeek, esc } from '../storage.js';
import { initSessionBuilder } from '../components/session-builder.js';
import { openTimer } from '../components/timer.js';

export function initPractice() {
  renderTodaysPlan();
  initSessionBuilder(document.getElementById('session-builder-root'));
  renderWeeklyPlan();
}

/* ── Today's Plan ───────────────────────────────────────── */
function renderTodaysPlan() {
  const el = document.getElementById('todays-plan');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  const plan = weeklyPlan.find(p => p.day === today);

  if (!plan) return;

  const planDrills = plan.drills
    .map(id => drills.find(d => d.id === id))
    .filter(Boolean);

  el.innerHTML = `
    <div class="today-card">
      <h3>Today · ${plan.shortDay}</h3>
      <h2>${esc(plan.focus)}</h2>
      <p>${esc(plan.location)} · ${plan.minutes} min</p>
      <div class="today-card__actions">
        ${planDrills.map(d => `
          <button class="button button--primary button--small" data-drill-id="${d.id}" data-minutes="${d.defaultMinutes}">
            ${esc(d.title)} (${d.defaultMinutes}m)
          </button>
        `).join('')}
      </div>
    </div>
  `;

  el.addEventListener('click', e => {
    const btn = e.target.closest('button[data-drill-id]');
    if (!btn) return;
    const drill = drills.find(d => d.id === btn.dataset.drillId);
    const mins = parseInt(btn.dataset.minutes, 10);
    openTimer(mins * 60, drill?.title || 'Drill');
  });
}

/* ── Weekly Plan ────────────────────────────────────────── */
function renderWeeklyPlan() {
  const el = document.getElementById('weekly-plan-root');
  const weekState = loadWeek();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = days[new Date().getDay()];

  el.innerHTML = `
    <div class="card" style="margin-top:var(--sp-4)">
      <div class="section-header">
        <div class="eyebrow">This Week</div>
        <h2>Weekly Plan</h2>
        <p class="section-copy">Tap a day to mark it complete. Stay consistent!</p>
      </div>
      <div class="week-grid" id="week-grid">
        ${weeklyPlan.map(day => {
          const done = weekState[day.day] || false;
          const isToday = day.day === todayName;
          return `
            <div class="week-day ${done ? 'completed' : ''} ${isToday ? 'today' : ''}" data-day="${day.day}">
              <div class="week-day__short">${day.shortDay}</div>
              <div class="week-day__check">${done ? '✅' : '○'}</div>
              <span class="week-day__focus">${esc(day.focus)}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  el.querySelector('#week-grid').addEventListener('click', e => {
    const dayEl = e.target.closest('.week-day');
    if (!dayEl) return;
    const dayName = dayEl.dataset.day;
    const state = loadWeek();
    state[dayName] = !state[dayName];
    saveWeek(state);
    renderWeeklyPlan();
  });
}
