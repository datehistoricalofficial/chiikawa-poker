// ===========================
//  吉依卡娃德州撲克 - game.js
// ===========================

// ── 牌組 ──────────────────────────────────────────
const SUITS  = ['♠','♥','♦','♣'];
const RANKS  = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const RANK_V = { '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':14 };

function makeDeck() {
  const d = [];
  for (const s of SUITS) for (const r of RANKS) d.push({ suit: s, rank: r, value: RANK_V[r] });
  return d;
}
function shuffle(d) {
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

// ── 遊戲狀態 ──────────────────────────────────────
const SMALL_BLIND = 10, BIG_BLIND = 20;

let state = {
  deck: [], community: [],
  pot: 0, currentBet: 0, roundBet: 0,
  stage: 'idle',   // idle | preflop | flop | turn | river | showdown
  player: { name: 'チイカワ', chips: 800, hand: [], bet: 0, folded: false, allIn: false },
  opponents: [
    { id: 'hachiware', name: 'ハチワレ', avatar: '🐱', chips: 800, hand: [], bet: 0, folded: false, allIn: false },
    { id: 'usagi',     name: 'うさぎ',   avatar: '🐰', chips: 800, hand: [], bet: 0, folded: false, allIn: false },
    { id: 'momonga',   name: 'モモンガ', avatar: '🐿️', chips: 800, hand: [], bet: 0, folded: false, allIn: false },
  ],
  dealerIdx: 0,
  activeOppIdx: 0,
  playerActed: false,
};

// ── DOM 輔助 ──────────────────────────────────────
const $ = id => document.getElementById(id);
const msg = text => $('game-message').textContent = text;

function cardHTML(card, delay = 0) {
  const isRed = card.suit === '♥' || card.suit === '♦';
  const cls = isRed ? 'red-card' : 'black-card';
  const el = document.createElement('div');
  el.className = `card ${cls} dealt`;
  el.style.animationDelay = `${delay}ms`;
  el.textContent = `${card.rank}\n${card.suit}`;
  return el;
}

function setButtons(deal, check, call, raise, fold) {
  $('btn-deal').disabled  = !deal;
  $('btn-check').disabled = !check;
  $('btn-call').disabled  = !call;
  $('btn-raise').disabled = !raise;
  $('raise-slider').disabled = !raise;
  $('btn-fold').disabled  = !fold;
}

function updateChipsDisplay() {
  $('player-chips').textContent = `💰 ${state.player.chips}`;
  $('player-bet').textContent   = state.player.bet > 0 ? `베팅: ${state.player.bet}` : '';
  for (const opp of state.opponents) {
    $(`opp-${opp.id}-chips`).textContent = `💰 ${opp.chips}`;
    $(`opp-${opp.id}-bet`).textContent   = opp.bet > 0 ? `베팅: ${opp.bet}` : '';
  }
  $('pot-amount').textContent = state.pot;
}

function updateRaiseDisplay(v) {
  $('raise-amount').textContent = v;
}

function resetBetDisplays() {
  $('player-bet').textContent = '';
  for (const opp of state.opponents) $(`opp-${opp.id}-bet`).textContent = '';
}

// ── 開始遊戲 ──────────────────────────────────────
function startGame() {
  // 重置
  state.deck = shuffle(makeDeck());
  state.community = [];
  state.pot = 0;
  state.currentBet = BIG_BLIND;
  state.stage = 'preflop';

  const all = [state.player, ...state.opponents];
  for (const p of all) { p.hand = []; p.bet = 0; p.folded = false; p.allIn = false; }

  // 清空公共牌顯示
  for (let i = 0; i < 5; i++) {
    const el = $(`cc-${i}`);
    el.className = 'card placeholder';
    el.textContent = '?';
  }
  // 清空玩家手牌
  for (let i = 0; i < 2; i++) {
    const el = $(`pc-${i}`);
    el.className = 'card placeholder';
    el.textContent = '?';
  }
  // 清空對手手牌
  for (const opp of state.opponents) {
    const hand = $(`opp-${opp.id}-hand`);
    hand.innerHTML = '<div class="card back">🌸</div><div class="card back">🌸</div>';
  }
  // 移除對手高亮
  for (const opp of state.opponents) {
    $(`opp-${opp.id}`).classList.remove('active-turn','folded');
  }

  // 發手牌
  for (const p of all) {
    p.hand.push(state.deck.pop(), state.deck.pop());
  }

  // 發牌閃光
  triggerFlash();

  // 顯示玩家手牌
  setTimeout(() => {
    $('pc-0').replaceWith(cardHTML(state.player.hand[0], 0));
    $('pc-1').replaceWith(cardHTML(state.player.hand[1], 150));
  }, 100);

  // 盲注
  const sbPlayer = state.opponents[state.dealerIdx % state.opponents.length];
  const bbPlayer = state.opponents[(state.dealerIdx + 1) % state.opponents.length];
  collectBet(sbPlayer, SMALL_BLIND);
  collectBet(bbPlayer, BIG_BLIND);

  state.pot = SMALL_BLIND + BIG_BLIND;
  state.currentBet = BIG_BLIND;

  updateChipsDisplay();
  setButtons(false, false, true, true, true);
  $('raise-slider').max = state.player.chips;
  $('raise-slider').value = BIG_BLIND * 2;
  $('raise-amount').textContent = BIG_BLIND * 2;

  msg(`🌸 已發牌！小盲 ${sbPlayer.name}: ${SMALL_BLIND}，大盲 ${bbPlayer.name}: ${BIG_BLIND}`);
}

function collectBet(player, amount) {
  const actual = Math.min(amount, player.chips);
  player.chips -= actual;
  player.bet   += actual;
  if (player.chips === 0) player.allIn = true;
  return actual;
}

// ── 玩家動作 ──────────────────────────────────────
function playerCheck() {
  if (state.currentBet > state.player.bet) return;
  msg('你選擇了 Check 過牌 ✅');
  state.playerActed = true;
  nextStage();
}

function playerCall() {
  const toCall = state.currentBet - state.player.bet;
  if (toCall <= 0) { playerCheck(); return; }
  const paid = collectBet(state.player, toCall);
  state.pot += paid;
  msg(`你跟注了 ${paid} 籌碼 💰`);
  state.playerActed = true;
  updateChipsDisplay();
  nextStage();
}

function playerRaise() {
  const raiseTotal = parseInt($('raise-slider').value);
  if (raiseTotal <= state.currentBet) { msg('加注金額必須大於當前注！'); return; }
  const toAdd = raiseTotal - state.player.bet;
  if (toAdd > state.player.chips) { msg('籌碼不足！'); return; }
  const paid = collectBet(state.player, toAdd);
  state.pot += paid;
  state.currentBet = raiseTotal;
  msg(`你加注至 ${raiseTotal} 籌碼 🔥`);
  state.playerActed = true;
  triggerCameraShake();
  triggerFlash();
  for (const opp of state.opponents) {
    if (!opp.folded) setTimeout(() => addReactionBubble(opp.id, 'shock'), Math.random() * 300 | 0);
  }
  updateChipsDisplay();
  nextStage();
}

function playerFold() {
  state.player.folded = true;
  msg('你棄牌了… 🥺');
  setButtons(false, false, false, false, false);
  state.playerActed = true;
  triggerCameraShake();
  for (const opp of state.opponents) {
    if (!opp.folded) setTimeout(() => addReactionBubble(opp.id, 'win'), (Math.random() * 400 | 0) + 100);
  }
  setTimeout(() => oppWinsAll(), 800);
}

function oppWinsAll() {
  const active = state.opponents.filter(o => !o.folded);
  if (active.length === 0) return;
  const winner = active[Math.floor(Math.random() * active.length)];
  winner.chips += state.pot;
  state.pot = 0;
  updateChipsDisplay();
  showResult([winner], false);
}

// ── 推進階段 ──────────────────────────────────────
function nextStage() {
  setButtons(false, false, false, false, false);

  // 對手輪流行動
  setTimeout(() => {
    opponentsAct();
  }, 600);
}

function opponentsAct() {
  let delay = 0;
  for (const opp of state.opponents) {
    if (opp.folded || opp.allIn) continue;
    delay += 800;
    setTimeout(() => oppAction(opp), delay);
  }
  setTimeout(() => advanceStage(), delay + 600);
}

function oppAction(opp) {
  $(`opp-${opp.id}`).classList.add('active-turn');
  setTimeout(() => $(`opp-${opp.id}`).classList.remove('active-turn'), 600);

  // 簡單 AI：依手牌強度決策
  const strength = estimateHandStrength(opp.hand, state.community);
  const toCall = state.currentBet - opp.bet;

  if (toCall === 0) {
    // 可以 check 或 raise
    if (strength > 0.65 && Math.random() < 0.5) {
      const raiseAmt = Math.min(opp.chips, state.currentBet + BIG_BLIND * 2);
      const paid = collectBet(opp, raiseAmt - opp.bet);
      state.pot += paid;
      state.currentBet = raiseAmt;
      msg(`${opp.name} 加注了！🔥`);
      triggerCameraShake();
      addReactionBubble(opp.id, 'raise');
    } else {
      msg(`${opp.name} 過牌 ✅`);
    }
  } else {
    if (strength < 0.3 && Math.random() < 0.55) {
      opp.folded = true;
      $(`opp-${opp.id}`).classList.add('folded');
      msg(`${opp.name} 棄牌了 🥺`);
      addReactionBubble(opp.id, 'fold');
    } else {
      const paid = collectBet(opp, toCall);
      state.pot += paid;
      msg(`${opp.name} 跟注 💰`);
    }
  }
  updateChipsDisplay();
}

function advanceStage() {
  // 重置本輪下注
  const all = [state.player, ...state.opponents];
  for (const p of all) p.bet = 0;
  state.currentBet = 0;
  resetBetDisplays();

  switch (state.stage) {
    case 'preflop':
      state.stage = 'flop';
      dealCommunity(3);
      break;
    case 'flop':
      state.stage = 'turn';
      dealCommunity(1);
      break;
    case 'turn':
      state.stage = 'river';
      dealCommunity(1);
      break;
    case 'river':
      state.stage = 'showdown';
      doShowdown();
      return;
  }

  const stageNames = { flop: '翻牌 Flop', turn: '轉牌 Turn', river: '河牌 River' };
  msg(`✨ ${stageNames[state.stage] || ''} — 你的行動！`);

  if (!state.player.folded) {
    const canCheck = state.currentBet <= state.player.bet;
    setButtons(false, canCheck, !canCheck, true, true);
    $('raise-slider').max = state.player.chips;
    const minRaise = Math.max(BIG_BLIND * 2, state.currentBet * 2);
    $('raise-slider').value = Math.min(minRaise, state.player.chips);
    $('raise-amount').textContent = $('raise-slider').value;
  }
}

function dealCommunity(count) {
  const start = state.community.length;
  for (let i = 0; i < count; i++) {
    const card = state.deck.pop();
    state.community.push(card);
    const el = $(`cc-${start + i}`);
    const newEl = cardHTML(card, i * 150);
    el.replaceWith(newEl);
    newEl.id = `cc-${start + i}`;
  }
}

// ── 攤牌 ──────────────────────────────────────────
function doShowdown() {
  triggerFlash();

  // 翻開對手手牌
  for (const opp of state.opponents) {
    if (opp.folded) continue;
    const hand = $(`opp-${opp.id}-hand`);
    hand.innerHTML = '';
    hand.appendChild(cardHTML(opp.hand[0], 0));
    hand.appendChild(cardHTML(opp.hand[1], 150));
  }

  const activePlayers = [state.player, ...state.opponents].filter(p => !p.folded);
  const scores = activePlayers.map(p => ({
    player: p,
    score: evalHand([...p.hand, ...state.community]),
  }));
  scores.sort((a, b) => b.score.rank - a.score.rank);

  const winners = scores.filter(s => s.score.rank === scores[0].score.rank);
  const share = Math.floor(state.pot / winners.length);
  for (const w of winners) {
    w.player.chips += share;
  }
  state.pot = 0;
  updateChipsDisplay();
  state.dealerIdx = (state.dealerIdx + 1) % state.opponents.length;

  // 勝者聚光燈
  setTimeout(() => {
    for (const w of winners) {
      const el = w.player === state.player
        ? $('player-area')
        : $(`opp-${w.player.id}`);
      if (el) showSpotlightOn(el);
      if (w.player !== state.player) addReactionBubble(w.player.id, 'win');
    }
  }, 400);

  showResult(winners.map(w => w.player), true, scores);
}

// ── 結果彈窗 ──────────────────────────────────────
function showResult(winners, isShowdown, scores = []) {
  const modal = $('result-modal');
  const isPlayerWinner = winners.some(w => w === state.player);

  $('result-emoji').textContent = isPlayerWinner ? '🎉' : '🥺';
  $('result-title').textContent = isPlayerWinner ? '你贏了！' : `${winners[0].name} 贏了！`;

  if (isShowdown && scores.length > 0) {
    $('result-desc').textContent = `最佳牌型：${scores[0].score.name}`;
    const container = $('showdown-hands');
    container.innerHTML = '';
    for (const s of scores) {
      const row = document.createElement('div');
      const isWinner = winners.some(w => w === s.player);
      row.className = 'showdown-row' + (isWinner ? ' winner' : '');
      const handStr = s.player.hand.map(c => `${c.rank}${c.suit}`).join(' ');
      row.innerHTML = `<strong>${s.player === state.player ? '🐹 你' : s.player.name}</strong>：${handStr} → ${s.score.name}${isWinner ? ' 🏆' : ''}`;
      container.appendChild(row);
    }
  } else {
    $('result-desc').textContent = '對手都棄牌了！';
    $('showdown-hands').innerHTML = '';
  }

  modal.classList.remove('hidden');
}

function closeModal() {
  $('result-modal').classList.add('hidden');
  // 檢查是否有玩家破產
  const all = [state.player, ...state.opponents];
  for (const p of all) {
    if (p.chips <= 0) {
      p.chips = 500;
      msg(`${p === state.player ? '你' : p.name} 籌碼不足，補充 500 籌碼 🌸`);
    }
  }
  state.stage = 'idle';
  setButtons(true, false, false, false, false);
  updateChipsDisplay();
}

// ── 手牌評估 ──────────────────────────────────────
function evalHand(cards) {
  // 選最佳 5 張
  const combos = combinations(cards, 5);
  let best = null;
  for (const combo of combos) {
    const s = scoreHand5(combo);
    if (!best || s.rank > best.rank || (s.rank === best.rank && s.tiebreak > best.tiebreak)) {
      best = s;
    }
  }
  return best;
}

function combinations(arr, k) {
  if (k === 0) return [[]];
  if (arr.length === 0) return [];
  const [first, ...rest] = arr;
  const withFirst = combinations(rest, k - 1).map(c => [first, ...c]);
  const withoutFirst = combinations(rest, k);
  return [...withFirst, ...withoutFirst];
}

function scoreHand5(cards) {
  const suits  = cards.map(c => c.suit);
  const values = cards.map(c => c.value).sort((a,b) => b - a);
  const flush  = suits.every(s => s === suits[0]);

  // A-5 Straight
  let straight = false;
  let straightHigh = values[0];
  if (values[0]-values[4] === 4 && new Set(values).size === 5) straight = true;
  if (!straight && JSON.stringify(values) === JSON.stringify([14,5,4,3,2])) {
    straight = true; straightHigh = 5;
  }

  const counts = {};
  for (const v of values) counts[v] = (counts[v] || 0) + 1;
  const groups = Object.entries(counts).sort((a,b) => b[1]-a[1] || b[0]-a[0]);
  const freq   = groups.map(g => g[1]);
  const topVal = groups.map(g => parseInt(g[0]));

  let rank, name, tiebreak;

  if (flush && straight) {
    rank = straightHigh === 14 ? 9 : 8;
    name = straightHigh === 14 ? '皇家同花順 👑' : '同花順 🌈';
    tiebreak = straightHigh;
  } else if (freq[0] === 4) {
    rank = 7; name = '四條 🎯'; tiebreak = topVal[0] * 100 + topVal[1];
  } else if (freq[0] === 3 && freq[1] === 2) {
    rank = 6; name = '葫蘆 🏠'; tiebreak = topVal[0] * 100 + topVal[1];
  } else if (flush) {
    rank = 5; name = '同花 🌸'; tiebreak = values.reduce((a,v,i) => a + v * Math.pow(15, 4-i), 0);
  } else if (straight) {
    rank = 4; name = '順子 ➡️'; tiebreak = straightHigh;
  } else if (freq[0] === 3) {
    rank = 3; name = '三條 🎲'; tiebreak = topVal[0] * 10000;
  } else if (freq[0] === 2 && freq[1] === 2) {
    rank = 2; name = '兩對 ✌️'; tiebreak = topVal[0] * 1000 + topVal[1] * 10 + topVal[2];
  } else if (freq[0] === 2) {
    rank = 1; name = '一對 👫'; tiebreak = topVal[0] * 10000;
  } else {
    rank = 0; name = '高牌 🃏'; tiebreak = values.reduce((a,v,i) => a + v * Math.pow(15, 4-i), 0);
  }

  return { rank, name, tiebreak };
}

// ── 簡易手牌強度估算（對手 AI 用）──────────────────
function estimateHandStrength(hand, community) {
  const cards = [...hand, ...community];
  if (cards.length >= 5) {
    const s = evalHand(cards);
    return Math.min(1, s.rank / 8 + s.tiebreak / 1000000);
  }
  // Preflop：依牌面值估算
  const v1 = hand[0].value, v2 = hand[1].value;
  const paired = v1 === v2;
  const highVal = Math.max(v1, v2);
  return paired ? 0.55 + highVal / 100 : highVal / 28;
}

// ── 實境秀攝影效果 Reality Show Camera Effects ────────────────

function triggerCameraShake() {
  const el = $('game-container');
  el.classList.remove('camera-shake');
  void el.offsetWidth; // force reflow
  el.classList.add('camera-shake');
  el.addEventListener('animationend', () => el.classList.remove('camera-shake'), { once: true });
}

function triggerFlash() {
  const flash = $('flash-overlay');
  if (!flash) return;
  flash.classList.remove('flash');
  void flash.offsetWidth;
  flash.classList.add('flash');
}

function showSpotlightOn(el) {
  const overlay = $('spotlight-overlay');
  if (!overlay || !el) return;
  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  overlay.style.background = `radial-gradient(ellipse 380px 280px at ${x}px ${y}px, rgba(255,220,100,0.22) 0%, transparent 65%)`;
  overlay.classList.add('active');
  setTimeout(() => overlay.classList.remove('active'), 2500);
}

const REACTIONS = {
  raise: ['！！！', '💢', '😤', '🔥'],
  fold:  ['😅', '🙈', '諾...', 'やめて'],
  win:   ['🎉', '😸', '✨', '最高！'],
  shock: ['!?', '😱', '嗚...', 'え！？'],
};

function addReactionBubble(oppId, type) {
  const card = $(`opp-${oppId}`);
  if (!card) return;
  const old = card.querySelector('.reaction-bubble');
  if (old) old.remove();
  const arr = REACTIONS[type] || REACTIONS.shock;
  const text = arr[Math.floor(Math.random() * arr.length)];
  const bubble = document.createElement('div');
  bubble.className = 'reaction-bubble';
  bubble.textContent = text;
  card.appendChild(bubble);
  setTimeout(() => { if (bubble.parentNode) bubble.remove(); }, 2100);
}

// ── 初始化 ──────────────────────────────────────
setButtons(true, false, false, false, false);
updateChipsDisplay();
