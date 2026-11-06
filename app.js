(function () {
  'use strict';
  const T = window.TASKS, FIXES = window.FIXES, EXAMS = window.EXAMS, STICKERS = window.STICKERS;
  const app = document.getElementById('app');

  /* ---------- progress (saved on this device when possible) ---------- */
  const mem = {};
  const store = {
    get(k, d) { try { const v = window['local' + 'Storage'].getItem('snw_' + k); return v ? JSON.parse(v) : d; } catch (e) { return k in mem ? mem[k] : d; } },
    set(k, v) { mem[k] = v; try { window['local' + 'Storage'].setItem('snw_' + k, JSON.stringify(v)); } catch (e) {} }
  };
  let earned = store.get('stickers', []);
  let plans = store.get('plans', {});
  const savePlans = () => store.set('plans', plans);

  /* ---------- helpers ---------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  function toast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2200); }

  /* ---------- voice: female native-English voice where available ---------- */
  let voice = null;
  const PREF = ['Serena', 'Kate', 'Martha', 'Stephanie', 'Google UK English Female', 'Microsoft Libby', 'Microsoft Sonia', 'Microsoft Maisie', 'Samantha', 'Karen', 'Moira', 'Tessa', 'Microsoft Aria', 'Microsoft Jenny', 'Google US English'];
  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
    for (const p of PREF) { const v = vs.find(x => x.name.indexOf(p) === 0); if (v) { voice = v; return; } }
    voice = vs.find(v => /female/i.test(v.name)) || vs.find(v => /en-GB/i.test(v.lang)) || vs[0] || null;
  }
  if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text, el) {
    if (!('speechSynthesis' in window)) { toast('Sound is not available on this device.'); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/___/g, 'blank'));
    if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-GB';
    u.rate = 0.88; u.pitch = 1.1;
    if (el) { el.classList.add('speaking'); u.onend = u.onerror = () => el.classList.remove('speaking'); }
    speechSynthesis.speak(u);
  }
  const speakBtn = (text, label) => `<button class="say" data-say="${esc(text)}" aria-label="${esc(label || 'Listen')}">${ICON.sound}</button>`;

  /* ---------- icons ---------- */
  const ICON = {
    sound: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    back: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  const SIC = {
    book: '<path d="M10 16c6-3 12-3 22 0v26c-10-3-16-3-22 0zM54 16c-6-3-12-3-22 0v26c10-3 16-3 22 0z" fill="#fff" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/>',
    blocks: '<rect x="12" y="34" width="16" height="16" rx="3" fill="#fff" stroke="#3a2e4a" stroke-width="3"/><rect x="34" y="34" width="16" height="16" rx="3" fill="#fff" stroke="#3a2e4a" stroke-width="3"/><rect x="23" y="16" width="16" height="16" rx="3" fill="#fff" stroke="#3a2e4a" stroke-width="3"/><text x="31" y="29" font-size="11" text-anchor="middle" font-family="Fredoka" fill="#3a2e4a">1</text><text x="20" y="47" font-size="11" text-anchor="middle" font-family="Fredoka" fill="#3a2e4a">2</text><text x="42" y="47" font-size="11" text-anchor="middle" font-family="Fredoka" fill="#3a2e4a">3</text>',
    school: '<path d="M12 28l20-12 20 12v22H12z" fill="#fff" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/><rect x="27" y="36" width="10" height="14" fill="#ffd166" stroke="#3a2e4a" stroke-width="2.5"/><circle cx="32" cy="27" r="4" fill="#ffd166" stroke="#3a2e4a" stroke-width="2.5"/>',
    boat: '<path d="M10 38h44l-6 10H16z" fill="#fff" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/><path d="M30 12v24M30 14l14 18H30z" fill="#ffd166" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/><path d="M8 54c4-3 8-3 12 0s8 3 12 0 8-3 12 0 8 3 12 0" fill="none" stroke="#3a2e4a" stroke-width="2.5" stroke-linecap="round"/>',
    star: '<path d="M32 10l6.5 14 15 1.6-11.3 10 3.3 15L32 43l-13.5 7.6 3.3-15L10.5 25.6l15-1.6z" fill="#fff" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/>',
    heart: '<path d="M32 52S10 39 10 24a11 11 0 0122-3 11 11 0 0122 3c0 15-22 28-22 28z" fill="#fff" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/>',
    arrow: '<rect x="12" y="20" width="22" height="22" rx="4" fill="#fff" stroke="#3a2e4a" stroke-width="3"/><path d="M38 31h14M46 24l7 7-7 7" fill="none" stroke="#3a2e4a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    pencil: '<path d="M14 50l4-12 24-24 8 8-24 24z" fill="#fff" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/><path d="M36 20l8 8" stroke="#3a2e4a" stroke-width="3"/><path d="M14 50l4-12 8 8z" fill="#ffd166" stroke="#3a2e4a" stroke-width="2.5" stroke-linejoin="round"/>',
    shield: '<path d="M32 10l18 6v14c0 12-8 20-18 24-10-4-18-12-18-24V16z" fill="#fff" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/><path d="M24 32l6 6 11-12" fill="none" stroke="#3a2e4a" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>',
    leaf: '<path d="M14 50C14 26 28 14 52 12c-2 24-14 38-38 38z" fill="#fff" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/><path d="M14 50l24-24" stroke="#3a2e4a" stroke-width="3" stroke-linecap="round"/>',
    sun: '<circle cx="32" cy="32" r="10" fill="#fff" stroke="#3a2e4a" stroke-width="3"/><g stroke="#3a2e4a" stroke-width="3" stroke-linecap="round"><path d="M32 10v6M32 48v6M10 32h6M48 32h6M16.5 16.5l4 4M43.5 43.5l4 4M16.5 47.5l4-4M43.5 20.5l4-4"/></g>',
    lantern: '<path d="M32 8v6" stroke="#3a2e4a" stroke-width="3" stroke-linecap="round"/><rect x="24" y="14" width="16" height="5" rx="2" fill="#fff" stroke="#3a2e4a" stroke-width="2.5"/><ellipse cx="32" cy="33" rx="15" ry="14" fill="#fff" stroke="#3a2e4a" stroke-width="3"/><path d="M32 19v28M24 21c-4 8-4 16 0 24M40 21c4 8 4 16 0 24" fill="none" stroke="#3a2e4a" stroke-width="2"/><path d="M32 47v8" stroke="#3a2e4a" stroke-width="3" stroke-linecap="round"/>',
    para: '<rect x="12" y="10" width="40" height="44" rx="4" fill="#fff" stroke="#3a2e4a" stroke-width="3"/><path d="M22 20h22M18 26h26M22 35h22M18 41h20" stroke="#3a2e4a" stroke-width="2.6" stroke-linecap="round"/>',
    news: '<rect x="10" y="12" width="44" height="40" rx="4" fill="#fff" stroke="#3a2e4a" stroke-width="3"/><rect x="16" y="18" width="14" height="12" fill="#ffd166" stroke="#3a2e4a" stroke-width="2"/><path d="M35 20h13M35 27h13M16 37h32M16 44h26" stroke="#3a2e4a" stroke-width="2.6" stroke-linecap="round"/>',
    wand: '<path d="M14 50l26-26" stroke="#3a2e4a" stroke-width="5" stroke-linecap="round"/><path d="M44 10l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#fff" stroke="#3a2e4a" stroke-width="2.4" stroke-linejoin="round"/><circle cx="52" cy="34" r="3" fill="#fff" stroke="#3a2e4a" stroke-width="2"/>',
    trophy: '<path d="M20 12h24v12a12 12 0 01-24 0z" fill="#fff" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/><path d="M20 16h-7c0 8 4 11 8 11M44 16h7c0 8-4 11-8 11" fill="none" stroke="#3a2e4a" stroke-width="3"/><path d="M32 36v8M22 52h20l-3-8H25z" fill="#ffd166" stroke="#3a2e4a" stroke-width="3" stroke-linejoin="round"/>'
  };
  const stickerSVG = (s, locked) => `<svg viewBox="0 0 64 64" class="stk-svg" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="${locked ? '#ece6f2' : s.col}" stroke="#fff" stroke-width="3"/>${locked ? '<text x="32" y="40" font-size="22" text-anchor="middle" font-family="Fredoka" fill="#b9aec8">?</text>' : SIC[s.icon]}</svg>`;

  function award(id) {
    const s = STICKERS.find(x => x.id === id); if (!s) return;
    updateCount();
    if (earned.includes(id)) { celebrate(null, 'Well done! You already have this sticker.'); return; }
    earned.push(id); store.set('stickers', earned); updateCount();
    celebrate(s);
  }
  function updateCount() { document.getElementById('stickerCount').textContent = earned.length; }

  function celebrate(s, msg) {
    const c = document.getElementById('celebrate');
    const conf = Array.from({ length: 26 }, (_, i) => `<i style="left:${Math.random() * 100}%;animation-delay:${Math.random() * .6}s;background:${['#ff6b81', '#9b7fd1', '#ffd166', '#5ec4a7', '#4fb3d9'][i % 5]}"></i>`).join('');
    c.innerHTML = `<div class="confetti">${conf}</div><div class="cel-card" role="dialog" aria-label="Well done">
      <img src="img/pair-jump.webp" alt="Susu and Neko jumping for joy" width="200" height="200">
      ${s ? `<p class="cel-k">New sticker</p>${stickerSVG(s)}<h3>${esc(s.name)}</h3><p>Great work! Susu and Neko are so proud of you.</p>` : `<h3>Super!</h3><p>${esc(msg || 'Keep going!')}</p>`}
      <button class="btn primary" data-close>Yay! Continue</button></div>`;
    c.hidden = false;
    speak(s ? 'Hooray! You got a new sticker: ' + s.name + '!' : (msg || 'Super!'));
    $('[data-close]', c).onclick = () => { c.hidden = true; c.innerHTML = ''; };
  }

  /* ---------- routing (in-memory) ---------- */
  let view = { name: 'home' };
  function go(name, opts) {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    clearInterval(timerInt);
    view = Object.assign({ name }, opts || {});
    render();
    window.scrollTo({ top: 0 });
    $$('.topnav button').forEach(b => b.classList.toggle('on', b.dataset.go === name));
  }
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-go]'); if (g) { go(g.dataset.go, g.dataset.task ? { task: g.dataset.task, tab: g.dataset.tab || 'learn' } : null); return; }
    const s = e.target.closest('[data-say]'); if (s) { speak(s.dataset.say, s); }
  });

  function render() {
    const r = { home, task: taskView, fix: fixView, exam: examView, stickers: stickerView }[view.name] || home;
    r();
  }

  /* ---------- HOME ---------- */
  function home() {
    const cards = ['place', 'rules', 'season'].map(id => {
      const t = T[id]; const got = STICKERS.filter(s => s.task === id && earned.includes(s.id)).length; const tot = STICKERS.filter(s => s.task === id).length;
      return `<button class="task-card t-${t.color}" data-go="task" data-task="${id}">
        <span class="tc-num">Writing ${t.num}</span>
        <span class="tc-title">${esc(t.short || t.title)}</span>
        <span class="tc-mod">${esc(t.module)}</span>
        <span class="tc-prog"><span style="width:${(got / tot) * 100}%"></span></span>
        <span class="tc-meta">${got} / ${tot} stickers</span>
      </button>`;
    }).join('');
    app.innerHTML = `
    <section class="hero">
      <div class="hero-txt">
        <p class="eyebrow">P.2 English · Writing revision</p>
        <h1>Hello Clarice! Let’s get ready for the writing exam.</h1>
        <p class="lead">Read the models, play the games, plan your writing, then write it on paper and check it with Susu and Neko.</p>
        <div class="hero-btns">
          <button class="btn primary" data-go="task" data-task="place">Start with Writing 1</button>
          <button class="btn ghost" data-go="exam">Try an exam practice</button>
        </div>
      </div>
      <div class="hero-art"><img src="img/pair-wave.webp" alt="Susu in a red dress and Neko in a white cat top waving hello" width="368" height="520"></div>
    </section>
    <section class="steps-strip" aria-label="How to revise">
      ${['Read the model', 'Play the games', 'Plan your ideas', 'Write on paper', 'Check and fix'].map((s, i) => `<div class="stp"><b>${i + 1}</b><span>${s}</span></div>`).join('')}
    </section>
    <h2 class="sec-h">Choose a writing task</h2>
    <section class="task-grid">${cards}</section>
    <section class="extra-grid">
      <button class="extra fix" data-go="fix"><img src="img/pair-think.webp" alt="" width="120" height="170"><span><b>Fix-it Lab</b>Correct the mistakes your teacher marked in red.</span></button>
      <button class="extra exam" data-go="exam"><img src="img/neko-pencil.webp" alt="" width="120" height="170"><span><b>Exam Practice</b>Plan, write on paper with a timer, then self-check.</span></button>
      <button class="extra stkc" data-go="stickers"><img src="img/susu-wave.webp" alt="" width="120" height="170"><span><b>Sticker Book</b>${earned.length} of ${STICKERS.length} stickers collected.</span></button>
    </section>`;
  }

  /* ---------- TASK VIEW ---------- */
  function taskView() {
    const t = T[view.task]; const tab = view.tab || 'learn';
    const tabs = [['learn', 'Read & learn'], ['games', 'Games'], ['plan', 'Plan & write'], ['tips', 'Teacher’s tips']];
    const guideImg = t.guide === 'susu' ? 'susu-wave' : t.guide === 'neko' ? 'neko-pencil' : 'pair-think';
    app.innerHTML = `
      <div class="task-head t-${t.color}">
        <button class="back" data-go="home">${ICON.back} Home</button>
        <div class="th-txt"><p class="eyebrow">${esc(t.module)}</p><h1>${esc(t.title)}</h1><p>${esc(t.intro)} ${speakBtn(t.intro, 'Listen to the task')}</p></div>
        <img src="img/${guideImg}.webp" alt="" class="th-img" width="130" height="180">
      </div>
      <div class="tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" aria-selected="${k === tab}" class="${k === tab ? 'on' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>
      <div id="pane"></div>`;
    $$('.tabs button').forEach(b => b.onclick = () => { view.tab = b.dataset.tab; taskView(); });
    const pane = $('#pane');
    ({ learn: learnPane, games: gamesPane, plan: planPane, tips: tipsPane })[tab](pane, t);
  }

  /* ----- model writing card ----- */
  function modelCard(t, m, id) {
    const legend = Object.entries(t.tags).filter(([k]) => m.paragraphs.flat().some(s => s.tag === k)).map(([k, v]) => `<span class="lg ${v.c}">${v.label}</span>`).join('');
    const body = m.paragraphs.map(p => `<p class="mp">${p.map(s => `<span class="ms ${t.tags[s.tag].c}" data-say="${esc(s.t)}" tabindex="0">${esc(s.t)}</span>`).join(' ')}</p>`).join('');
    const all = m.paragraphs.flat().map(s => s.t).join(' ');
    return `<article class="paper model" id="${id}">
      <div class="paper-top"><span class="by">${esc(m.by)}</span>${speakBtn(m.heading + '. ' + all, 'Listen to the whole writing')}</div>
      <h3 class="paper-title">${esc(m.heading)}</h3>
      <div class="paper-body show-parts">${body}</div>
      <div class="legend">${legend}</div>
    </article>`;
  }

  function learnPane(pane, t) {
    if (t.id === 'rules') return learnRules(pane, t);
    pane.innerHTML = `
      <div class="hint-row"><img src="img/neko-pencil.webp" alt="" width="60" height="85"><p>Tap any sentence to hear it. The colours show the <b>parts</b> of good writing.${t.id === 'season' ? ' A magazine article has a <b>title</b> and <b>three paragraphs</b>.' : ' Your paragraph needs <b>at least six sentences</b>.'}</p></div>
      <div class="two-col">${modelCard(t, t.model, 'm1')}${modelCard(t, t.star, 'm2')}</div>
      <div class="center"><label class="switch"><input type="checkbox" id="partsT" checked> Show colours</label></div>
      <div class="center"><button class="btn primary" id="doneLearn">I have read both. Give me a sticker!</button></div>`;
    $('#partsT').onchange = e => $$('.paper-body', pane).forEach(p => p.classList.toggle('show-parts', e.target.checked));
    $$('.ms', pane).forEach(s => s.onkeydown = e => { if (e.key === 'Enter') speak(s.dataset.say, s); });
    $('#doneLearn').onclick = () => award(t.id + '-model');
  }

  function learnRules(pane, t) {
    pane.innerHTML = `
      <div class="card">
        <h3>Part A & B: The story <i>Home is Where the Heart is</i></h3>
        <p class="muted">A young man leaves home to study abroad. Answer the questions about the story and what the pictures mean.</p>
        <div id="storyQ"></div>
      </div>
      <div class="card">
        <h3>Model rules: places like home ${speakBtn('Every rule needs a reason. For example: We must wait for our turns to go on the slide. It is fair for everyone to get a chance to play.')}</h3>
        <p class="muted">Each rule uses <b class="k-must">must</b> or <b class="k-mustnt">mustn’t</b>. Each rule has a <b>reason</b>. Tap to listen.</p>
        <div class="rule-table">${t.places.map(p => `<div class="rt-row"><div class="rt-place">${esc(cap(p.place))}</div><div class="rt-rules">${p.rules.map(r => `
          <div class="rt-pair" data-say="${esc(r.r + ' ' + r.why)}"><span class="rt-r">${hlMust(r.r)}</span><span class="rt-tag">rule</span><span class="rt-w">${esc(r.why)}</span><span class="rt-tag w">reason</span></div>`).join('')}</div></div>`).join('')}</div>
      </div>`;
    quiz($('#storyQ'), t.story.map(s => ({ q: s.q, opts: s.opts, a: s.a, say: s.say })), { sticker: 'rules-story', pass: 0.75 });
  }
  const hlMust = s => esc(s).replace(/\b(mustn’t|must)\b/, m => `<b class="${m === 'must' ? 'k-must' : 'k-mustnt'}">${m}</b>`);

  /* ----- generic multiple choice quiz ----- */
  function quiz(box, items, o) {
    let i = 0, score = 0, tries = 0;
    items = o.noShuffle ? items : items;
    function show() {
      if (i >= items.length) {
        const pct = score / items.length;
        box.innerHTML = `<div class="done"><p class="big">${score} / ${items.length}</p><p>${pct >= (o.pass || .8) ? 'Fantastic work!' : 'Good try! Play again to get a sticker.'}</p><button class="btn ghost" data-again>Play again</button></div>`;
        $('[data-again]', box).onclick = () => { i = 0; score = 0; show(); };
        if (pct >= (o.pass || .8)) award(o.sticker);
        return;
      }
      const it = items[i]; tries = 0;
      const order = shuffle(it.opts.map((x, k) => k));
      box.innerHTML = `<div class="q">
        <div class="q-top"><span class="q-n">Question ${i + 1} of ${items.length}</span><span class="q-s">Score ${score}</span></div>
        ${it.wrong ? `<p class="wrong-s"><span>Fix this:</span> ${esc(it.wrong)}</p>` : ''}
        <p class="q-q">${esc(it.q)} ${speakBtn(it.q)}</p>
        <div class="opts">${order.map(k => `<button class="opt" data-k="${k}">${esc(it.opts[k])}</button>`).join('')}</div>
        <p class="fb" aria-live="polite"></p></div>`;
      $$('.opt', box).forEach(b => b.onclick = () => {
        const k = +b.dataset.k;
        if (k === it.a) {
          b.classList.add('right'); if (tries === 0) score++;
          $$('.opt', box).forEach(x => x.disabled = true);
          $('.fb', box).innerHTML = `<b>Correct!</b> ${esc(it.why || it.say || '')}`;
          speak('Correct! ' + (it.say || it.opts[it.a]));
          const nx = document.createElement('button'); nx.className = 'btn primary next'; nx.textContent = i + 1 < items.length ? 'Next' : 'See my score';
          nx.onclick = () => { i++; show(); }; $('.q', box).appendChild(nx);
        } else {
          tries++; b.classList.add('wrongpick'); b.disabled = true;
          $('.fb', box).innerHTML = `Not quite. ${it.why ? esc(it.why) + ' ' : ''}Try again.`;
          speak('Not quite. Try again.');
        }
      });
    }
    show();
  }

  /* ----- sort game: one card, choose category ----- */
  function sortGame(box, items, cats, o) {
    items = shuffle(items); let i = 0, score = 0, miss = false;
    function show() {
      if (i >= items.length) { const ok = score / items.length >= (o.pass || .8); box.innerHTML = `<div class="done"><p class="big">${score} / ${items.length}</p><p>${ok ? 'Brilliant sorting!' : 'Good try! Play again to get a sticker.'}</p><button class="btn ghost" data-again>Play again</button></div>`; $('[data-again]', box).onclick = () => { items = shuffle(items); i = 0; score = 0; show(); }; if (ok) award(o.sticker); return; }
      const it = items[i]; miss = false;
      box.innerHTML = `<div class="sort">
        <div class="q-top"><span class="q-n">${i + 1} of ${items.length}</span><span class="q-s">Score ${score}</span></div>
        <p class="sort-prompt">${o.prefix ? `<span class="muted">${esc(o.prefix)}</span> ` : ''}<span class="sort-card">${esc(it.text)}</span> ${speakBtn(it.text)}</p>
        <div class="sort-cats">${cats.map(c => `<button class="cat ${c.cls || ''}" data-c="${esc(c.v)}">${esc(c.label)}</button>`).join('')}</div>
        <p class="fb" aria-live="polite"></p></div>`;
      $$('.cat', box).forEach(b => b.onclick = () => {
        const ok = (it.ok || [it.v]).includes(b.dataset.c);
        if (ok) {
          if (!miss) score++; b.classList.add('right'); $$('.cat', box).forEach(x => x.disabled = true);
          const full = o.sayFull ? o.sayFull(it, b.dataset.c) : it.text; $('.fb', box).innerHTML = `<b>Yes!</b> ${esc(full)}`; speak(full);
          setTimeout(() => { i++; show(); }, 1500);
        } else { miss = true; b.classList.add('wrongpick'); b.disabled = true; $('.fb', box).textContent = o.hint ? o.hint(it) : 'Try again.'; }
      });
    }
    show();
  }

  /* ----- match game: tap left then right ----- */
  function matchGame(box, pairs, o) {
    let sel = null, done = 0, errs = 0;
    const L = shuffle(pairs.map((p, k) => ({ k, t: p.l }))), R = shuffle(pairs.map((p, k) => ({ k, t: p.r })));
    box.innerHTML = `<p class="muted">Tap a card on the left, then tap its partner on the right.</p>
      <div class="match"><div class="mcol">${L.map(x => `<button class="mc l" data-k="${x.k}">${esc(x.t)}</button>`).join('')}</div>
      <div class="mcol">${R.map(x => `<button class="mc r" data-k="${x.k}">${esc(x.t)}</button>`).join('')}</div></div><p class="fb" aria-live="polite"></p>`;
    $$('.mc.l', box).forEach(b => b.onclick = () => { $$('.mc.l', box).forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sel = b; speak(b.textContent); });
    $$('.mc.r', box).forEach(b => b.onclick = () => {
      if (!sel) { $('.fb', box).textContent = 'Tap a card on the left first.'; return; }
      if (sel.dataset.k === b.dataset.k) {
        const n = done % 6; sel.classList.add('paired', 'p' + n); b.classList.add('paired', 'p' + n); sel.disabled = b.disabled = true;
        speak(sel.textContent + ' ' + b.textContent); sel = null; done++;
        $('.fb', box).innerHTML = '<b>Great match!</b>';
        if (done === pairs.length) { $('.fb', box).innerHTML = `<b>All matched!</b> ${errs === 0 ? 'No mistakes!' : ''}`; if (errs <= 2) setTimeout(() => award(o.sticker), 900); else box.insertAdjacentHTML('beforeend', '<p class="muted">Try again with 2 or fewer mistakes to get a sticker.</p><button class="btn ghost" data-again>Play again</button>'), $('[data-again]', box).onclick = () => matchGame(box, pairs, o); }
      } else { errs++; b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 450); $('.fb', box).textContent = 'Not a match. Try another one.'; }
    });
  }

  /* ----- order game ----- */
  function orderGame(box, sentences, o) {
    let next = 0, errs = 0; const pool = shuffle(sentences.map((s, k) => ({ s, k })));
    box.innerHTML = `<p class="muted">Tap the sentences in the right order to build the paragraph.</p>
      <div class="built paper"><h3 class="paper-title">${esc(o.title)}</h3><p class="mp" id="builtP"></p></div>
      <div class="pool">${pool.map(x => `<button class="pc" data-k="${x.k}">${esc(x.s)}</button>`).join('')}</div><p class="fb" aria-live="polite"></p>`;
    $$('.pc', box).forEach(b => b.onclick = () => {
      if (+b.dataset.k === next) {
        b.classList.add('used'); b.disabled = true; $('#builtP', box).insertAdjacentHTML('beforeend', `<span class="ms in">${esc(sentences[next])}</span> `); speak(sentences[next]); next++;
        $('.fb', box).textContent = '';
        if (next === sentences.length) { $('.fb', box).innerHTML = '<b>Perfect paragraph!</b>'; if (errs <= 3) setTimeout(() => award(o.sticker), 1200); else { box.insertAdjacentHTML('beforeend', '<p class="muted">Try again with 3 or fewer mistakes to get a sticker.</p><button class="btn ghost" data-again>Play again</button>'); $('[data-again]', box).onclick = () => orderGame(box, sentences, o); } }
      } else { errs++; b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 450); $('.fb', box).textContent = o.hints[next] || 'Not yet. Think about what comes next.'; }
    });
  }

  /* ----- spelling game ----- */
  function spellGame(box, words, o) {
    words = shuffle(words); let i = 0, score = 0, tries = 0;
    function show() {
      if (i >= words.length) { const ok = score / words.length >= .8; box.innerHTML = `<div class="done"><p class="big">${score} / ${words.length}</p><p>${ok ? 'Super speller!' : 'Good try! Play again to get a sticker.'}</p><button class="btn ghost" data-again>Play again</button></div>`; $('[data-again]', box).onclick = () => { words = shuffle(words); i = 0; score = 0; show(); }; if (ok) award(o.sticker); return; }
      const w = words[i]; tries = 0;
      box.innerHTML = `<div class="spell">
        <div class="q-top"><span class="q-n">Word ${i + 1} of ${words.length}</span><span class="q-s">Score ${score}</span></div>
        <button class="btn big-say" data-say="${esc(w)}">${ICON.sound} Listen to the word</button>
        <p class="sp-hint">${w.length} letters · starts with <b>${w[0]}</b></p>
        <input class="sp-in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Type the word">
        <div class="row"><button class="btn primary" data-chk>Check</button><button class="btn ghost" data-show>Show me</button></div>
        <p class="fb" aria-live="polite"></p></div>`;
      const inp = $('.sp-in', box); setTimeout(() => speak(w), 300);
      const check = () => {
        const v = inp.value.trim().toLowerCase();
        if (!v) return;
        if (v === w) { if (tries === 0) score++; inp.classList.add('ok'); $('.fb', box).innerHTML = `<b>Correct!</b> ${w.split('').join(' - ')}`; speak('Correct! ' + w); setTimeout(() => { i++; show(); }, 1400); }
        else { tries++; inp.classList.add('no'); setTimeout(() => inp.classList.remove('no'), 450); $('.fb', box).innerHTML = `Not quite. ${diffHint(v, w)}`; }
      };
      $('[data-chk]', box).onclick = check; inp.onkeydown = e => { if (e.key === 'Enter') check(); };
      $('[data-show]', box).onclick = () => { tries++; $('.fb', box).innerHTML = `The word is <b>${w}</b>: ${w.split('').join(' - ')}. Type it once more.`; speak(w); };
    }
    show();
  }
  function diffHint(v, w) { let k = 0; while (k < v.length && v[k] === w[k]) k++; return k > 0 ? `The first ${k} letter${k > 1 ? 's are' : ' is'} right: <b>${w.slice(0, k)}</b>…` : 'Listen again and try.'; }

  /* ---------- GAMES PANE ---------- */
  function gamesPane(pane, t) {
    const games = {
      place: [
        ['order', 'Paragraph builder', 'Put the sentences in order.', 'place-order'],
        ['fix', 'Fix my sentences', 'Correct the red-pen mistakes.', null]
      ],
      rules: [
        ['sort', 'Must or mustn’t?', 'Sort the actions.', 'rules-sort'],
        ['match', 'Rule and reason', 'Match each rule to its reason.', 'rules-match'],
        ['prep', 'Preposition pick', 'in, on or behind?', 'rules-prep'],
        ['spell', 'Spelling bee', 'Listen and spell.', 'rules-spell'],
        ['fix', 'Fix my sentences', 'Correct the red-pen mistakes.', null]
      ],
      season: [
        ['vocab', 'Season sort', 'Which season is it?', 'season-vocab'],
        ['fest', 'Festival match', 'How do we celebrate?', 'season-fest'],
        ['para', 'Paragraph sort', 'Which paragraph does it go in?', 'season-para'],
        ['fix', 'Fix my sentences', 'Correct the red-pen mistakes.', null]
      ]
    }[t.id];
    const cur = view.game || games[0][0];
    pane.innerHTML = `<div class="game-pick">${games.map(([k, n, d, st]) => `<button class="gp ${k === cur ? 'on' : ''}" data-g="${k}"><b>${n}</b><span>${d}</span>${st && earned.includes(st) ? '<em class="got">' + ICON.check + '</em>' : ''}</button>`).join('')}</div><div class="card game-box" id="gbox"></div>`;
    $$('.gp', pane).forEach(b => b.onclick = () => { view.game = b.dataset.g; gamesPane(pane, t); });
    const box = $('#gbox');
    const fixItems = FIXES.filter(f => f.task === t.id).map(f => ({ wrong: f.wrong, q: 'Which one is correct?', opts: f.opts, a: f.a, why: f.why, say: f.opts[f.a] }));
    if (cur === 'fix') return quiz(box, shuffle(fixItems), { sticker: 'fixit' });
    if (t.id === 'place') {
      orderGame(box, t.order, { title: 'My Favourite Place at School', sticker: 'place-order', hints: ['Start with: My favourite place at school is…', 'Next: where is it?', 'Next: what does it look like?', 'Next: what do you and your classmates do?', 'Next: what else do you do? (We also…)', 'Next: what do your teachers do?', 'Next: why do you like it?', 'Last: how do you feel?'] });
    } else if (t.id === 'rules') {
      if (cur === 'sort') sortGame(box, t.sort.map(x => ({ text: x.s, v: x.a })), [{ v: 'must', label: 'We must', cls: 'must' }, { v: 'mustn’t', label: 'We mustn’t', cls: 'mustnt' }], { sticker: 'rules-sort', prefix: 'We ___', sayFull: (it, c) => 'We ' + c + ' ' + it.text + '.', hint: it => it.v === 'must' ? 'This is a good thing to do. Try again.' : 'This is not a good thing to do. Try again.' });
      if (cur === 'match') matchGame(box, t.match.map(m => ({ l: m.r, r: m.why })), { sticker: 'rules-match' });
      if (cur === 'prep') quiz(box, shuffle(t.preps).map(p => ({ q: p.s, opts: t.prepOpts, a: t.prepOpts.indexOf(p.a), say: p.s.replace('___', p.a) })), { sticker: 'rules-prep' });
      if (cur === 'spell') spellGame(box, t.spell, { sticker: 'rules-spell' });
    } else {
      if (cur === 'vocab') sortGame(box, t.vocab.map(v => ({ text: v.w, v: v.s })), ['spring', 'summer', 'autumn', 'winter'].map(s => ({ v: s, label: cap(s), cls: 's-' + s })), { sticker: 'season-vocab', sayFull: (it, c) => 'In ' + c + ', I ' + it.text + '.', hint: () => 'Think about the weather. Try again.' });
      if (cur === 'fest') matchGame(box, t.festMatch.map(m => ({ l: m.f, r: m.a })), { sticker: 'season-fest' });
      if (cur === 'para') sortGame(box, t.paraSort.map(p => ({ text: p.s, v: String(p.p) })), [1, 2, 3].map(n => ({ v: String(n), label: t.paraNames[n], cls: 'para' })), { sticker: 'season-para', pass: .75, hint: it => it.p === 1 ? 'Paragraph 1 tells us which season.' : it.p === 2 ? 'This is a detail about the season.' : 'This tells why or how you feel.' });
    }
  }

  /* ---------- TIPS PANE ---------- */
  function tipsPane(pane, t) {
    pane.innerHTML = `<div class="hint-row"><img src="img/susu-wave.webp" alt="" width="60" height="85"><p>These tips come from your teacher’s red-pen comments. Use them to get full marks!</p></div>
      <div class="tips">${t.tips.map((x, k) => `<div class="tip"><span class="tip-n">${k + 1}</span><div><h4>${esc(x.tip)} ${speakBtn(x.tip + ' For example: ' + x.eg.replace('\u2192', ' becomes '))}</h4><p class="tip-eg">${esc(x.eg)}</p><p class="tip-from">${esc(x.from)}</p></div></div>`).join('')}</div>
      <div class="card"><h3>Marking scheme</h3><div class="rubric"><div><b>Content</b><span>Ideas, details, reasons</span></div><div><b>Language</b><span>Grammar, spelling, words</span></div><div><b>Organisation</b><span>Order and paragraphs</span></div><div><b>Format</b><span>Title, indent, neat writing</span></div></div></div>`;
  }

  /* ---------- PLAN & WRITE ---------- */
  let timerInt = null;
  function paperPanel(text, t, html) {
    return `<div class="card write-card">
      <div class="wc-head"><img src="img/neko-pencil.webp" alt="" width="70" height="100"><div><h3>Now write it on paper</h3><p class="muted">Copy your plan onto writing paper in your best handwriting. Then tick the checklist.</p></div></div>
      ${timerHTML()}
      <h4>Checklist</h4>
      <ul class="checklist">${t.checklist.map((c, k) => `<li><label><input type="checkbox" data-ck="${k}"><span>${esc(c)}</span></label></li>`).join('')}</ul>
      <button class="btn primary" id="ckDone" disabled>I checked my writing</button>
    </div>`;
  }
  function timerHTML() {
    return `<div class="timer"><div class="t-set">${[10, 15, 20, 25].map(m => `<button class="chip ${m === 15 ? 'on' : ''}" data-min="${m}">${m} min</button>`).join('')}</div>
      <div class="t-face" id="tFace">15:00</div><div class="row"><button class="btn primary" id="tGo">Start timer</button><button class="btn ghost" id="tReset">Reset</button></div></div>`;
  }
  function wireTimer(root) {
    let total = 15 * 60, left = total, run = false; const face = $('#tFace', root);
    const draw = () => { face.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`; face.classList.toggle('low', left <= 120 && left > 0); };
    $$('[data-min]', root).forEach(b => b.onclick = () => { if (run) return; $$('[data-min]', root).forEach(x => x.classList.remove('on')); b.classList.add('on'); total = left = +b.dataset.min * 60; draw(); });
    $('#tGo', root).onclick = () => {
      if (run) { clearInterval(timerInt); run = false; $('#tGo', root).textContent = 'Continue'; return; }
      run = true; $('#tGo', root).textContent = 'Pause';
      clearInterval(timerInt);
      timerInt = setInterval(() => { left--; draw(); if (left === 120) speak('Two minutes left. Check your full stops and capital letters.'); if (left <= 0) { clearInterval(timerInt); run = false; face.textContent = 'Time’s up!'; speak('Time is up! Put down your pencil and check your writing.'); } }, 1000);
    };
    $('#tReset', root).onclick = () => { clearInterval(timerInt); run = false; left = total; draw(); $('#tGo', root).textContent = 'Start timer'; };
  }
  function wireChecklist(root, sticker) {
    const boxes = $$('[data-ck]', root), btn = $('#ckDone', root);
    boxes.forEach(b => b.onchange = () => { btn.disabled = !boxes.every(x => x.checked); });
    btn.onclick = () => award(sticker);
  }

  function planPane(pane, t) {
    if (t.id === 'place') return planPlace(pane, t);
    if (t.id === 'rules') return planRules(pane, t);
    return planSeason(pane, t);
  }

  function chipStep(q, chips, val, key, num) {
    return `<div class="pstep" data-key="${key}">
      <p class="pq"><span class="pnum">${num}</span>${esc(q)} ${speakBtn(q)}</p>
      <div class="chips">${chips.map(c => `<button class="chip ${c === val ? 'on' : ''}" data-v="${esc(c)}">${esc(c)}</button>`).join('')}</div>
      <input class="own" placeholder="…or type your own idea" value="${val && !chips.includes(val) ? esc(val) : ''}" autocapitalize="off" aria-label="Your own idea">
    </div>`;
  }
  function wireChips(root, onPick) {
    $$('.pstep', root).forEach(st => {
      const key = st.dataset.key;
      $$('.chip', st).forEach(c => c.onclick = () => { $$('.chip', st).forEach(x => x.classList.remove('on')); c.classList.add('on'); $('.own', st).value = ''; onPick(key, c.dataset.v); });
      $('.own', st).oninput = e => { $$('.chip', st).forEach(x => x.classList.remove('on')); onPick(key, e.target.value.trim()); };
    });
  }

  function planPlace(pane, t) {
    const p = plans.place = plans.place || {};
    pane.innerHTML = `<div class="plan-grid">
      <div class="card"><h3>Plan your ideas</h3><p class="muted">Answer each question. Tap an idea or type your own.</p>
        ${t.plan.map((s, k) => chipStep(s.q, s.chips, p[s.key], s.key, k + 1)).join('')}</div>
      <div class="sticky"><div class="paper preview"><div class="paper-top"><span class="by">My paragraph</span><span id="sayMine"></span></div><h3 class="paper-title">My Favourite Place at School</h3><p class="mp indent" id="prev"></p><p class="count" id="cnt"></p></div></div>
    </div><div id="paperBox"></div>`;
    const build = () => {
      const out = t.plan.filter(s => p[s.key]).map(s => cap(s.frame.replace('{a}', p[s.key]).replace('{place}', p.place || 'this place')));
      $('#prev').innerHTML = out.length ? out.map(s => `<span class="ms in">${esc(s)}</span>`).join(' ') : '<span class="muted">Your sentences will appear here as you plan.</span>';
      $('#cnt').innerHTML = `${out.length} sentence${out.length === 1 ? '' : 's'} ${out.length >= 6 ? '<b class="okc">· at least six!</b>' : '<span class="muted">· aim for at least six</span>'}`;
      $('#sayMine').innerHTML = out.length ? speakBtn('My Favourite Place at School. ' + out.join(' '), 'Listen to my paragraph') : '';
      return out;
    };
    wireChips(pane, (k, v) => { p[k] = v; savePlans(); build(); });
    build();
    $('#paperBox').innerHTML = paperPanel('', t); wireTimer($('#paperBox')); wireChecklist($('#paperBox'), 'place-plan');
  }

  function planRules(pane, t) {
    const p = plans.rules = plans.rules || { places: [], picks: {} };
    function draw() {
      pane.innerHTML = `<div class="card"><h3>Step 1: Choose three places you see as ‘home’</h3>
        <div class="chips">${t.buildPlaces.map(pl => `<button class="chip ${p.places.includes(pl) ? 'on' : ''}" data-pl="${esc(pl)}">${esc(cap(pl))}</button>`).join('')}</div>
        <p class="muted small">${p.places.length} of 3 chosen</p></div>
        ${p.places.map((pl, n) => `<div class="card"><h3>Place ${n + 1}: ${esc(cap(pl))}</h3><p class="muted">Pick TWO rules. Then check the reason.</p>
          <div class="rule-opts">${t.ruleBank[pl].map((r, k) => { const on = (p.picks[pl] || []).includes(k); return `<button class="ropt ${on ? 'on' : ''}" data-pl="${esc(pl)}" data-k="${k}"><span>${hlMust(r.r)}</span><em>Reason: ${esc(r.why)}</em></button>`; }).join('')}</div></div>`).join('')}
        ${p.places.length === 3 ? `<div class="paper preview wide"><div class="paper-top"><span class="by">My rules table</span>${speakBtn(tableText(), 'Listen to my rules')}</div>
          <table class="rtbl"><thead><tr><th>Places like home</th><th>Rules and reasons</th></tr></thead><tbody>${p.places.map(pl => `<tr><td>${esc(cap(pl))}</td><td>${(p.picks[pl] || []).map(k => { const r = t.ruleBank[pl][k]; return `<p><span class="dot"></span>${hlMust(r.r)} <small>(rule)</small><br>${esc(r.why)} <small>(reason)</small></p>`; }).join('') || '<span class="muted">Pick two rules above.</span>'}</td></tr>`).join('')}</tbody></table></div><div id="paperBox"></div>` : ''}`;
      $$('[data-pl]:not([data-k])', pane).forEach(b => b.onclick = () => {
        const pl = b.dataset.pl; const i = p.places.indexOf(pl);
        if (i >= 0) { p.places.splice(i, 1); delete p.picks[pl]; } else if (p.places.length < 3) p.places.push(pl); else { toast('You already chose three places. Tap one to remove it.'); return; }
        savePlans(); draw();
      });
      $$('.ropt', pane).forEach(b => b.onclick = () => {
        const pl = b.dataset.pl, k = +b.dataset.k; const a = p.picks[pl] = p.picks[pl] || []; const i = a.indexOf(k);
        if (i >= 0) a.splice(i, 1); else { if (a.length >= 2) a.shift(); a.push(k); }
        const r = t.ruleBank[pl][k]; speak(r.r + ' ' + r.why); savePlans(); draw();
      });
      if ($('#paperBox')) { $('#paperBox').innerHTML = paperPanel('', t); wireTimer($('#paperBox')); wireChecklist($('#paperBox'), 'rules-plan'); }
    }
    function tableText() { return p.places.map(pl => (p.picks[pl] || []).map(k => t.ruleBank[pl][k].r + ' ' + t.ruleBank[pl][k].why).join(' ')).join(' '); }
    draw();
  }

  function planSeason(pane, t) {
    const p = plans.season = plans.season || {};
    function draw() {
      const S = p.season ? t.seasons[p.season] : null;
      const festActs = p.fest && t.festivals[p.fest] ? t.festivals[p.fest] : ['have fun with my family'];
      const steps = S ? [
        ['weather', 'What is the weather like in this season?', S.weather],
        ['eat', 'What do you usually eat in this season?', S.eat],
        ['do1', 'What do you usually do? (Activity 1)', S.act],
        ['do2', 'What else do you do? (Activity 2)', S.act],
        ['wear1', 'What do you usually wear? (Item 1)', S.wear],
        ['wear2', 'What else do you wear? (Item 2)', S.wear],
        ['fest', 'Which festival do you celebrate in this season?', S.fest],
        ['fa1', 'How do you celebrate this festival? (Activity 1)', festActs],
        ['fa2', 'How else do you celebrate it? (Activity 2)', festActs],
        ['why', 'Why do you like this season?', ['the weather is ' + S.weather[0], 'I can ' + S.act[0] + ' with my friends', 'I can spend time with my family', 'it makes me smile']],
        ['feel', 'How do you feel when the season is here?', ['happy', 'excited', 'very happy', 'cheerful']]
      ] : [];
      pane.innerHTML = `<div class="plan-grid">
        <div class="card"><h3>Plan your article</h3>
          <div class="pstep0"><p class="pq"><span class="pnum">1</span>Which season do you like most? ${speakBtn('Which season do you like most?')}</p>
          <div class="chips">${Object.keys(t.seasons).map(s => `<button class="chip season s-${s} ${p.season === s ? 'on' : ''}" data-season="${s}">${cap(s)}</button>`).join('')}</div></div>
          ${S ? steps.map(([k, q, ch], n) => chipStep(q, ch, p[k], k, n + 2)).join('') : '<p class="muted">Choose a season to see word ideas.</p>'}
        </div>
        <div class="sticky"><div class="paper preview"><div class="paper-top"><span class="by">My magazine article</span><span id="sayMine"></span></div><h3 class="paper-title">My Favourite Season</h3><div id="prev"></div></div></div>
      </div><div id="paperBox"></div>`;
      $$('[data-season]', pane).forEach(b => b.onclick = () => { const keep = p.season === b.dataset.season; if (!keep) { for (const k in p) delete p[k]; p.season = b.dataset.season; } savePlans(); draw(); });
      wireChips(pane, (k, v) => { p[k] = v; if (k === 'fest') { delete p.fa1; delete p.fa2; savePlans(); draw(); return; } savePlans(); build(); });
      build();
      $('#paperBox').innerHTML = paperPanel('', t); wireTimer($('#paperBox')); wireChecklist($('#paperBox'), 'season-plan');
    }
    function build() {
      const s = p.season; const prev = $('#prev');
      if (!s) { prev.innerHTML = '<p class="muted">Your article will appear here.</p>'; $('#sayMine').innerHTML = ''; return; }
      const p1 = [`My favourite season is ${s}.`, `${cap(s)} is a wonderful season.`];
      const p2 = [];
      if (p.weather) p2.push(`In ${s}, it is ${p.weather}.`);
      if (p.eat) p2.push(`I usually eat ${p.eat}.`);
      if (p.do1 && p.do2) p2.push(`My friends and I usually ${p.do1} and ${p.do2}.`); else if (p.do1) p2.push(`My friends and I usually ${p.do1}.`);
      if (p.wear1 && p.wear2) p2.push(`I usually wear ${p.wear1} and ${p.wear2}.`); else if (p.wear1) p2.push(`I usually wear ${p.wear1}.`);
      if (p.fest) p2.push(`During ${s}, we celebrate ${p.fest}.`);
      if (p.fa1 && p.fa2) p2.push(`We ${p.fa1} and ${p.fa2}.`); else if (p.fa1) p2.push(`We ${p.fa1}.`);
      const p3 = [];
      if (p.why) p3.push(`I like ${s} very much because ${p.why}.`);
      if (p.feel) p3.push(`I feel ${p.feel} when this season is here!`);
      const paras = [p1, p2, p3].filter(x => x.length);
      prev.innerHTML = paras.map((x, n) => `<p class="mp indent"><span class="pmark">P${n + 1}</span>${x.map(z => `<span class="ms in">${esc(z)}</span>`).join(' ')}</p>`).join('');
      $('#sayMine').innerHTML = speakBtn('My Favourite Season. ' + paras.flat().join(' '), 'Listen to my article');
    }
    draw();
  }

  /* ---------- FIX-IT LAB ---------- */
  function fixView() {
    app.innerHTML = `<div class="task-head t-mint"><button class="back" data-go="home">${ICON.back} Home</button>
      <div class="th-txt"><p class="eyebrow">All three tasks</p><h1>Fix-it Lab</h1><p>These mistakes come from your teacher’s red pen. Choose the correct sentence. Score 80% to win a sticker.</p></div>
      <img src="img/pair-think.webp" alt="" class="th-img" width="130" height="180"></div>
      <div class="card game-box" id="fbox"></div>`;
    quiz($('#fbox'), shuffle(FIXES).map(f => ({ wrong: f.wrong, q: 'Which one is correct?', opts: f.opts, a: f.a, why: f.why, say: f.opts[f.a] })), { sticker: 'fixit' });
  }

  /* ---------- EXAM PRACTICE ---------- */
  function examView() {
    const e = view.exam != null ? EXAMS[view.exam] : null;
    if (!e) {
      app.innerHTML = `<div class="task-head t-blue"><button class="back" data-go="home">${ICON.back} Home</button>
        <div class="th-txt"><p class="eyebrow">Practise like the real exam</p><h1>Exam Practice</h1><p>Pick a question, plan for 3 minutes, write on paper with the timer, then check and score yourself.</p></div>
        <img src="img/neko-pencil.webp" alt="" class="th-img" width="130" height="180"></div>
        <div class="exam-list">${EXAMS.map((x, k) => `<button class="exam-card t-${T[x.task].color}" data-ex="${k}"><span class="tc-num">Question ${k + 1}</span><span class="tc-title">${esc(x.title)}</span><span class="tc-mod">${esc(x.prompt)}</span></button>`).join('')}
        <button class="exam-card t-mint" data-ex="r"><span class="tc-num">Surprise me</span><span class="tc-title">Random question</span><span class="tc-mod">Susu and Neko choose a question for you.</span></button></div>`;
      $$('[data-ex]').forEach(b => b.onclick = () => { const v = b.dataset.ex; view.exam = v === 'r' ? Math.floor(Math.random() * EXAMS.length) : +v; view.step = 1; examView(); });
      return;
    }
    const t = T[e.task]; const step = view.step || 1;
    const stepsBar = ['Read', 'Plan', 'Write', 'Check'].map((s, k) => `<span class="${k + 1 === step ? 'on' : k + 1 < step ? 'done' : ''}">${k + 1}. ${s}</span>`).join('');
    let body = '';
    if (step === 1) body = `<div class="paper exam-q"><p class="eyebrow">Writing question</p><h2>${esc(e.title)}</h2><p class="lead">${esc(e.prompt)} ${speakBtn(e.title + '. ' + e.prompt)}</p><h4>Think about:</h4><ul class="guide">${e.guide.map(g => `<li>${esc(g)}</li>`).join('')}</ul></div><div class="center"><button class="btn primary" data-step="2">I understand. Start planning</button></div>`;
    if (step === 2) body = `<div class="card"><h3>Quick plan (3 minutes)</h3><p class="muted">Write short notes for each point. Notes are just for you.</p><div class="mini-timer" id="pt">3:00</div>
      <div class="notes">${e.guide.map((g, k) => `<label class="note"><span>${esc(g)}</span><input data-n="${k}" autocapitalize="off" placeholder="my idea…"></label>`).join('')}</div></div>
      <div class="center"><button class="btn primary" data-step="3">My plan is ready. Start writing</button></div>`;
    if (step === 3) body = `<div class="card write-card"><div class="wc-head"><img src="img/neko-pencil.webp" alt="" width="70" height="100"><div><h3>Write on paper now</h3><p class="muted">Write the title. ${e.task === 'season' ? 'Write three paragraphs.' : e.task === 'place' ? 'Write at least six sentences.' : 'Write three places with two rules and reasons each.'} Leave 2 minutes to check.</p></div></div>${timerHTML()}</div>
      <div class="center"><button class="btn primary" data-step="4">I finished writing</button></div>`;
    if (step === 4) body = `<div class="card"><h3>Check your writing</h3><ul class="checklist">${t.checklist.map((c, k) => `<li><label><input type="checkbox" data-ck="${k}"><span>${esc(c)}</span></label></li>`).join('')}</ul></div>
      <div class="card"><h3>Score yourself</h3><p class="muted">Ask a grown-up to help you mark. Tap the stars.</p>
      <div class="selfscore">${['Content', 'Language', 'Organisation', 'Format'].map(r => `<div class="ss"><b>${r}</b><div class="stars" data-r="${r}">${[1, 2, 3, 4, 5].map(n => `<button aria-label="${n} stars" data-s="${n}">★</button>`).join('')}</div></div>`).join('')}</div>
      <p class="ss-total">Total: <b id="ssT">0</b> / 20 stars</p><button class="btn primary" id="ckDone" disabled>Finish exam practice</button></div>`;
    app.innerHTML = `<div class="task-head t-blue slim"><button class="back" id="exBack">${ICON.back} All questions</button><div class="th-txt"><h1>${esc(e.title)}</h1></div></div>
      <div class="ex-steps">${stepsBar}</div>${body}`;
    $('#exBack').onclick = () => { clearInterval(timerInt); view.exam = null; examView(); };
    $$('[data-step]').forEach(b => b.onclick = () => { clearInterval(timerInt); view.step = +b.dataset.step; examView(); window.scrollTo({ top: 0 }); });
    if (step === 2) { let left = 180; const f = $('#pt'); clearInterval(timerInt); timerInt = setInterval(() => { left--; f.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`; if (left <= 0) { clearInterval(timerInt); f.textContent = 'Time to write!'; speak('Planning time is over. Time to write!'); } }, 1000); }
    if (step === 3) wireTimer(app);
    if (step === 4) {
      $$('.stars').forEach(st => $$('button', st).forEach(b => b.onclick = () => { const n = +b.dataset.s; $$('button', st).forEach(x => x.classList.toggle('on', +x.dataset.s <= n)); $('#ssT').textContent = $$('.stars button.on').length; }));
      wireChecklist(app, 'exam');
    }
  }

  /* ---------- STICKER BOOK ---------- */
  function stickerView() {
    app.innerHTML = `<div class="task-head t-pink"><button class="back" data-go="home">${ICON.back} Home</button>
      <div class="th-txt"><p class="eyebrow">${earned.length} of ${STICKERS.length} collected</p><h1>My Sticker Book</h1><p>Finish games and writing practice to fill your book.</p></div>
      <img src="img/pair-jump.webp" alt="" class="th-img" width="130" height="180"></div>
      <div class="sbook">${STICKERS.map(s => { const got = earned.includes(s.id); return `<div class="stk ${got ? 'got' : ''}">${stickerSVG(s, !got)}<b>${esc(s.name)}</b><span>${s.task === 'fix' ? 'Fix-it Lab' : s.task === 'exam' ? 'Exam Practice' : 'Writing ' + T[s.task].num}</span></div>`; }).join('')}</div>
      <div class="center"><button class="btn ghost small" id="resetAll">Start the sticker book again</button></div>`;
    $('#resetAll').onclick = () => {
      const b = $('#resetAll');
      if (b.dataset.sure) { earned = []; plans = {}; store.set('stickers', earned); savePlans(); updateCount(); stickerView(); toast('Sticker book cleared.'); }
      else { b.dataset.sure = 1; b.textContent = 'Tap again to clear all stickers'; }
    };
  }

  updateCount();
  go('home');
})();
