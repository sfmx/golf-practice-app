/* ============================================================
   GEAR — Equipment guide & backyard setup diagram
   ============================================================ */
import { gear } from '../data.js';
import { loadGearOwned, saveGearOwned, esc } from '../storage.js';

export function initGear() {
  renderGear();
  renderYardDiagram();
}

function renderGear() {
  const el = document.getElementById('gear-grid');
  const owned = loadGearOwned();

  el.innerHTML = `
    <div class="section-header">
      <div class="eyebrow">Training Aids</div>
      <h2>Gear Guide</h2>
      <p class="section-copy">Mark what you own — the Session Builder uses this to filter drills.</p>
    </div>
    <div class="gear-grid">
      ${gear.map(item => {
        const hasIt = owned.includes(item.id);
        return `
          <div class="card ${hasIt ? 'card--accent' : ''}">
            <div class="card__header">
              <div>
                <div class="card__title">${esc(item.name)}</div>
                <div class="gear-card__type">
                  <span class="tag ${item.type === 'Essential' ? '' : 'tag--orange'}">${item.type}</span>
                </div>
              </div>
            </div>
            <div class="gear-card__budget">${esc(item.budget)}</div>
            <p class="text-sm" style="margin-bottom:var(--sp-2)">${esc(item.summary)}</p>
            <ul class="gear-card__bullets card__body">
              ${item.bullets.map(b => `<li>${esc(b)}</li>`).join('')}
            </ul>
            <label class="gear-card__toggle">
              <input type="checkbox" ${hasIt ? 'checked' : ''} data-gear-id="${item.id}">
              I have this
            </label>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Toggle gear ownership
  el.addEventListener('change', e => {
    const cb = e.target.closest('input[data-gear-id]');
    if (!cb) return;
    const id = cb.dataset.gearId;
    let current = loadGearOwned();
    if (cb.checked) {
      if (!current.includes(id)) current.push(id);
    } else {
      current = current.filter(g => g !== id);
    }
    saveGearOwned(current);
    renderGear();
  });
}

function renderYardDiagram() {
  const el = document.getElementById('yard-diagram-root');
  el.innerHTML = `
    <div class="card" style="margin-top:var(--sp-4)">
      <div class="section-header">
        <div class="eyebrow">Home Setup</div>
        <h2>Backyard Layout</h2>
        <p class="section-copy">Suggested layout for a 6m &times; 10m backyard practice area.</p>
      </div>
      <div class="yard-diagram">
        <div class="yard-zone yard-zone--net">🥅 Practice Net / Cage<br><span class="text-xs">Full width · Back of space</span></div>
        <div class="yard-zone yard-zone--mat">🟫 Hitting Mat<br><span class="text-xs">3m in front of net</span></div>
        <div class="yard-zone yard-zone--sticks">📏 Alignment Sticks<br><span class="text-xs">Around mat area</span></div>
        <div class="yard-zone yard-zone--clear">✅ Clear Zone<br><span class="text-xs">5–7m ball flight to net · Safety buffer sides</span></div>
        <div class="yard-zone yard-zone--storage">📦 Gear Storage<br><span class="text-xs">Shed or covered area</span></div>
        <div class="yard-zone" style="background:#d5f5e3;color:#196f3d">🏑 Putting Strip<br><span class="text-xs">Along one side</span></div>
      </div>
      <div style="margin-top:var(--sp-3)">
        <h4 style="margin-bottom:var(--sp-1)">Setup Tips</h4>
        <ul class="card__body" style="font-size:.875rem">
          <li>Cage net is safest for full driver swings — mesh-only nets can let balls through</li>
          <li>Place the mat 3-5m from the net for realistic ball flight feedback</li>
          <li>Alignment sticks can be pushed into soft ground or held in place with weighted bases</li>
          <li>Keep at least 1m clearance on each side for full swing safety</li>
          <li>A putting mat or strip of artificial turf along one side adds short game options</li>
        </ul>
      </div>
    </div>
  `;
}
