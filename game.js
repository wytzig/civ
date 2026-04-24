const HAND_SIZE = 4;
const TOTAL_ROUNDS = 10;
const WIN_SCORE = 60;
const THREAT_PER_ROUND = 2;

const RESOURCE_ICONS = {
  gold: '🪙', food: '🌾', faith: '✝', science: '🔬', culture: '🎭',
  defense: '🛡', threat: '⚔'
};

let state = {};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startGame() {
  state = {
    round: 1,
    resources: { gold: 5, food: 5, faith: 0, science: 0, culture: 0 },
    threat: 0,
    defense: 0,
    score: 0,
    deck: shuffle([...CARDS]),
    hand: [],
    discard: [],
    played: [],
    phase: 'play',
    pendingEvent: null,
    pendingCardEvent: null,
    log: [],
  };
  drawCards();
  render();
}

function drawCards() {
  while (state.hand.length < HAND_SIZE) {
    if (state.deck.length === 0) {
      if (state.discard.length === 0) break;
      state.deck = shuffle([...state.discard]);
      state.discard = [];
    }
    state.hand.push(state.deck.pop());
  }
}

function applyEffects(effects) {
  const parts = [];
  for (const e of effects) {
    if (e.resource === 'threat') {
      state.threat = Math.max(0, state.threat + e.amount);
      parts.push(`${e.amount > 0 ? '+' : ''}${e.amount} Threat`);
    } else if (e.resource === 'defense') {
      state.defense += e.amount;
      parts.push(`+${e.amount} Defense`);
    } else if (e.resource in state.resources) {
      state.resources[e.resource] = Math.max(0, state.resources[e.resource] + e.amount);
      if (e.amount > 0) state.score += e.amount;
      parts.push(`${e.amount > 0 ? '+' : ''}${e.amount} ${capitalize(e.resource)}`);
    }
  }
  return parts.join(', ');
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function addLog(msg) {
  state.log.unshift(msg);
  if (state.log.length > 6) state.log.pop();
}

function playCard(idx) {
  if (state.phase !== 'play') return;
  const card = state.hand.splice(idx, 1)[0];
  state.played.push(card);
  state.discard.push(card);

  if (card.type === 'event') {
    state.phase = 'card-event';
    state.pendingCardEvent = card;
    render();
  } else {
    const result = applyEffects(card.effects);
    addLog(`Played ${card.name}: ${result}`);
    render();
  }
}

function resolveCardEvent(choiceIdx) {
  const card = state.pendingCardEvent;
  const choice = card.choices[choiceIdx];
  const result = applyEffects(choice.effects);
  addLog(`${card.name} → ${choice.label}: ${result}`);
  state.pendingCardEvent = null;
  state.phase = 'play';
  render();
}

function endRound() {
  if (state.phase !== 'play') return;
  state.discard.push(...state.hand);
  state.hand = [];
  state.threat += THREAT_PER_ROUND;
  const overflow = Math.max(0, state.threat - state.defense);
  if (overflow > 0) {
    const penalty = Math.floor(overflow / 2);
    state.score = Math.max(0, state.score - penalty);
    state.resources.gold = Math.max(0, state.resources.gold - Math.ceil(overflow / 3));
    addLog(`⚔ Barbarians struck! Lost ${penalty} score (Threat ${state.threat} > Defense ${state.defense})`);
  }
  state.phase = 'event';
  state.pendingEvent = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
  render();
}

function resolveEvent(choiceIdx) {
  const ev = state.pendingEvent;
  const choice = ev.choices[choiceIdx];
  const result = applyEffects(choice.effects);
  addLog(`${ev.name} → ${choice.label}: ${result}`);
  state.pendingEvent = null;
  state.round++;
  if (state.round > TOTAL_ROUNDS) {
    state.phase = 'end';
    render();
    return;
  }
  state.phase = 'play';
  drawCards();
  render();
}

// ── Rendering ──────────────────────────────────────────────────────────────

function render() {
  renderResourceBar();
  renderHand();
  renderLog();

  const overlay = document.getElementById('overlay');
  const endScreen = document.getElementById('end-screen');

  if (state.phase === 'card-event') {
    overlay.innerHTML = buildCardEventHTML(state.pendingCardEvent);
    overlay.classList.remove('hidden');
    endScreen.classList.add('hidden');
  } else if (state.phase === 'event') {
    overlay.innerHTML = buildEventHTML(state.pendingEvent);
    overlay.classList.remove('hidden');
    endScreen.classList.add('hidden');
  } else if (state.phase === 'end') {
    overlay.classList.add('hidden');
    renderEndScreen();
    endScreen.classList.remove('hidden');
  } else {
    overlay.classList.add('hidden');
    endScreen.classList.add('hidden');
  }
}

function renderResourceBar() {
  const r = state.resources;
  document.getElementById('res-gold').textContent = r.gold;
  document.getElementById('res-food').textContent = r.food;
  document.getElementById('res-faith').textContent = r.faith;
  document.getElementById('res-science').textContent = r.science;
  document.getElementById('res-culture').textContent = r.culture;
  document.getElementById('res-defense').textContent = state.defense;
  document.getElementById('res-threat').textContent = state.threat;
  document.getElementById('res-score').textContent = state.score;
  document.getElementById('round-display').textContent = `Round ${state.round} / ${TOTAL_ROUNDS}`;

  const btn = document.getElementById('end-turn-btn');
  btn.disabled = state.phase !== 'play';
}

function cardTypeClass(type) {
  return { building: 'card-building', unit: 'card-unit', event: 'card-event' }[type] || '';
}

function renderHand() {
  const hand = document.getElementById('hand');
  hand.innerHTML = state.hand.map((card, i) => `
    <div class="card ${cardTypeClass(card.type)}" onclick="playCard(${i})">
      <img src="${encodeImagePath(card.image)}" alt="${card.name}">
      <div class="card-label">
        <span class="card-name">${card.name}</span>
        <span class="card-type">${card.type}</span>
        <span class="card-desc">${card.desc}</span>
      </div>
    </div>
  `).join('');

  const info = document.getElementById('hand-info');
  if (state.hand.length === 0 && state.phase === 'play') {
    info.textContent = 'Hand empty — end the round when ready.';
  } else if (state.phase === 'play') {
    info.textContent = 'Click a card to play it.';
  } else {
    info.textContent = '';
  }
}

function renderLog() {
  document.getElementById('log').innerHTML = state.log.map(l => `<div>${l}</div>`).join('');
}

function buildCardEventHTML(card) {
  return `
    <div class="event-box">
      <img src="${encodeImagePath(card.image)}" alt="${card.name}" class="event-img">
      <h2>${card.name}</h2>
      <p>${card.desc}</p>
      <div class="choices">
        ${card.choices.map((c, i) => `
          <button onclick="resolveCardEvent(${i})" class="choice-btn">
            ${c.label}
            <small>${effectSummary(c.effects)}</small>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function buildEventHTML(ev) {
  return `
    <div class="event-box">
      <img src="${encodeImagePath(ev.image)}" alt="${ev.name}" class="event-img">
      <h2>${ev.name}</h2>
      <p class="event-subhead">A world event has occurred — choose your response.</p>
      <div class="choices">
        ${ev.choices.map((c, i) => `
          <button onclick="resolveEvent(${i})" class="choice-btn">
            ${c.label}
            <small>${effectSummary(c.effects)}</small>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function effectSummary(effects) {
  return effects.map(e => {
    const sign = e.amount > 0 ? '+' : '';
    const icon = RESOURCE_ICONS[e.resource] || '';
    return `${sign}${e.amount} ${icon} ${capitalize(e.resource)}`;
  }).join(' · ');
}

function renderEndScreen() {
  const won = state.score >= WIN_SCORE;
  const title = won ? '🏆 Your Civilization Endures!' : '💀 Your Civilization Fell';
  const played = [...new Map(state.played.map(c => [c.id, c])).values()].slice(0, 8);

  document.getElementById('end-screen').innerHTML = `
    <div class="end-box">
      <h1>${title}</h1>
      <p class="end-score">Final Score: <strong>${state.score}</strong> (target: ${WIN_SCORE})</p>
      <div class="end-stats">
        <span>🪙 ${state.resources.gold}</span>
        <span>🌾 ${state.resources.food}</span>
        <span>✝ ${state.resources.faith}</span>
        <span>🔬 ${state.resources.science}</span>
        <span>🎭 ${state.resources.culture}</span>
        <span>🛡 ${state.defense}</span>
      </div>
      <h3>Your Legacy</h3>
      <div class="end-collage">
        ${played.map(c => `<img src="${encodeImagePath(c.image)}" title="${c.name}" alt="${c.name}">`).join('')}
      </div>
      <button onclick="startGame()" class="choice-btn">Play Again</button>
    </div>
  `;
}

// Encodes spaces in filenames for use as src attributes
function encodeImagePath(path) {
  return path.split('/').map(seg => encodeURIComponent(seg)).join('/');
}
