/* Portfolio engine: renders content.js and runs the scroll effects, floating avatar, site tour and ⌘K menu. */
(() => {
  'use strict';
  const C = window.CONTENT;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const get = path => path.split('.').reduce((o, k) => (o == null ? o : o[k]), C);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  function wireImgs(root) {
    $$('img[data-fallback]', root).forEach(img => {
      const kill = () => img.remove();
      if (img.complete && img.naturalWidth === 0) kill();
      else img.addEventListener('error', kill, { once: true });
    });
  }
  const logoSlot = (src, mono, cls = '') =>
    `<span class="logo-slot ${cls}"><b>${esc(mono || '?')}</b>${src ? `<img data-fallback src="${esc(src)}" alt="" loading="lazy">` : ''}</span>`;

  const BUG_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="14" rx="5" ry="6.5" fill="var(--pop)"/><circle cx="12" cy="6.5" r="3" fill="currentColor"/><path d="M7 11 3 9M7 15H3M7 18l-3 2M17 11l4-2M17 15h4M17 18l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 8.5v12" stroke="currentColor" stroke-width="1" opacity=".55"/><circle cx="10" cy="12.5" r="1" fill="currentColor" opacity=".6"/><circle cx="14" cy="16" r="1" fill="currentColor" opacity=".6"/></svg>';

  /* ================= RENDER ================= */
  $$('[data-c]').forEach(el => { const v = get(el.dataset.c); if (v != null) el.textContent = v; });
  $$('[data-href]').forEach(el => {
    const v = get(el.dataset.href);
    if (!v) { el.hidden = true; return; }
    if (v === 'TODO') { el.href = '#'; el.dataset.todo = el.dataset.href.split('.').pop(); el.removeAttribute('target'); return; }
    el.href = v;
  });
  const mailHref = `mailto:${C.links.email}?subject=${encodeURIComponent('Hey ' + C.profile.first)}`;
  $('#mailLink').href = mailHref;
  $('#footMail').href = mailHref;

  /* Hero */
  $('#props').innerHTML = C.prd.props.map(p => `<div class="prop"><dt>${esc(p.k)}</dt><dd>${p.live ? '<span class="live-dot"></span>' : ''}${esc(p.v)}</dd></div>`).join('');
  const [h1a, h1b, h1c] = C.profile.headline;
  $('#headline').innerHTML = `${esc(h1a)}<br>${esc(h1b)} <span class="mark">${esc(h1c)}</span>`;
  $('#features').innerHTML = C.prd.features.map(f => `<span class="feature">${esc(f)}</span>`).join('');
  $('#metrics').innerHTML = C.prd.metrics.map(m => `<span class="metric"><b>${esc(m.v)}</b>${esc(m.k)}</span>`).join('');

  /* Trophy shelf */
  const tierFill = { gold: ['--gold', '--gold-d'], silver: ['--silver', '--silver-d'], bronze: ['--bronze', '--bronze-d'] };
  const awardSvg = (kind, tier) => {
    const [f, d] = tierFill[tier].map(v => `var(${v})`);
    if (kind === 'cup') return `<svg viewBox="0 0 46 52" aria-hidden="true"><path d="M12 6h22v10c0 7-5 12-11 12S12 23 12 16z" fill="${f}" stroke="${d}" stroke-width="1.5"/><path d="M12 9H6c0 7 3 10 7 10M34 9h6c0 7-3 10-7 10" fill="none" stroke="${d}" stroke-width="2"/><path d="M20 28h6v8h-6z" fill="${f}" stroke="${d}" stroke-width="1.5"/><rect x="13" y="36" width="20" height="5" rx="1" fill="${f}" stroke="${d}" stroke-width="1.5"/><rect x="10" y="41" width="26" height="8" rx="1.5" fill="var(--ink)"/><path d="M17 10v6" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".55"/></svg>`;
    if (kind === 'medal') return `<svg viewBox="0 0 46 52" aria-hidden="true"><path d="M13 2h8l5 16h-8zM33 2h-8l-5 16h8z" fill="var(--accent)" stroke="var(--edge)" stroke-width="1.2"/><circle cx="23" cy="33" r="13" fill="${f}" stroke="${d}" stroke-width="1.8"/><circle cx="23" cy="33" r="8.5" fill="none" stroke="${d}" stroke-width="1.2" opacity=".7"/><path d="M19 28a6 6 0 0 1 5-2" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/><rect x="11" y="48" width="24" height="3" rx="1" fill="var(--ink)" opacity=".0"/></svg>`;
    return `<svg viewBox="0 0 46 52" aria-hidden="true"><path d="M23 4l5.6 11.6 12.7 1.7-9.3 8.8 2.4 12.6L23 32.6l-11.4 6.1 2.4-12.6-9.3-8.8 12.7-1.7z" fill="${f}" stroke="${d}" stroke-width="1.6" stroke-linejoin="round"/><rect x="12" y="42" width="22" height="7" rx="1.5" fill="var(--ink)"/><text x="23" y="47.6" text-anchor="middle" font-size="5.5" font-family="monospace" fill="var(--bg)">COACH</text></svg>`;
  };
  const rows = [C.trophies.slice(0, 3), C.trophies.slice(3, 6)].filter(r => r.length);
  let tIdx = 0;
  $('#shelf').innerHTML = rows.map(r => `<div class="shelf-row">${r.map(t => `<button class="award" data-t="${tIdx++}" aria-label="${esc(t.label)}">${awardSvg(t.kind, t.tier)}<span>${esc(t.short)}</span></button>`).join('')}</div>`).join('');
  const shelfCap = $('#shelfCap'), shelfDefault = shelfCap.textContent;
  $$('.award').forEach(a => {
    const show = () => { $$('.award').forEach(x => x.classList.toggle('on', x === a)); shelfCap.textContent = C.trophies[+a.dataset.t].label; };
    a.addEventListener('mouseenter', show); a.addEventListener('focus', show); a.addEventListener('click', show);
  });
  $('#shelf').addEventListener('mouseleave', () => { if (!$('#shelf').contains(document.activeElement)) { $$('.award').forEach(x => x.classList.remove('on')); shelfCap.textContent = shelfDefault; } });

  /* Ticker */
  const tick = C.ticker.map(t => `<span>${esc(t)}</span>`).join('');
  $('#ticker').innerHTML = tick + tick.replace(/<span>/g, '<span aria-hidden="true">');

  /* Release notes */
  const pillName = { new: 'New', imp: 'Improved', fix: 'Fixed', ops: 'Ops' };
  $('#releaseList').innerHTML = C.releases.map((r, i) => `
    <details class="rel"${i === 0 ? ' open' : ''}>
      <summary>
        ${logoSlot(r.logo, r.mono)}
        <span class="head"><b><span class="ver">${esc(r.v)}</span>${esc(r.org)}${r.current ? '<span class="cur">Current</span>' : ''}</b><small>${esc(r.role)} · ${esc(r.place)}</small></span>
        <span class="when">${esc(r.when)}</span>
      </summary>
      <div class="body">
        <p class="about">${esc(r.about)}</p>
        <ul class="notes">${r.notes.map(([k, t]) => `<li><span class="pill ${k}">${pillName[k] || k}</span><span>${esc(t)}</span></li>`).join('')}</ul>
      </div>
    </details>`).join('');

  /* Shipped */
  $('#shippedCount').textContent = `Work · ${C.shipped.length} tickets closed`;
  $('#cases').innerHTML = C.shipped.map((s, i) => `
    <article class="case" style="--i:${i}">
      <div class="case-meta">
        <span class="status s-ship">Shipped</span>
        <dl><div><dt>Ticket</dt><dd>${esc(s.id)}</dd></div><div><dt>Type</dt><dd>${esc(s.type)}</dd></div><div><dt>Domain</dt><dd>${esc(s.domain)}</dd></div></dl>
      </div>
      <div class="case-body">
        <span class="case-co">${esc(s.org)}</span>
        <h3>${esc(s.title)}</h3>
        <p class="problem"><b>Problem:</b> ${esc(s.problem)}</p>
        <ul class="ac">${s.built.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      </div>
      <div class="case-metric">
        <div><div class="v">${esc(s.metric.v)}</div><p class="k">${esc(s.metric.k)}</p></div>
        ${s.link && s.link.url
          ? `<a class="link-arrow" data-case href="${esc(s.link.url)}" target="_blank" rel="noopener">${esc(s.link.label)} ↗</a>`
          : `<span class="link-soon">Write-up coming soon</span>`}
      </div>
    </article>`).join('');

  /* Archive */
  $('#archiveList').innerHTML = C.archive.map((a, i) => `
    <a class="arc" data-case href="${esc(a.url)}" target="_blank" rel="noopener">
      <span class="co"><span>${esc(a.org)}</span><span>CS-${String(i + 1).padStart(2, '0')} ↗</span></span>
      <b>${esc(a.t)}</b><span class="tag">${esc(a.tag)}</span>
    </a>`).join('');

  /* Backlog */
  const prioIcon = p => {
    const n = p === 'P0' ? 3 : p === 'P1' ? 2 : 1;
    return `<svg viewBox="0 0 14 14" aria-hidden="true">${[0, 1, 2].map(i => `<rect x="${i * 5}" y="${10 - i * 4}" width="4" height="${4 + i * 4}" rx="1" fill="currentColor" opacity="${i < n ? 1 : .25}"/>`).join('')}</svg>`;
  };
  $('#backlogRows').innerHTML = C.backlog.map(b => `
    <div class="bl-row">
      <span class="prio ${b.p.toLowerCase()}">${prioIcon(b.p)}${esc(b.p)}</span>
      <div><h3>${esc(b.t)}${b.bug ? ' <button class="bug" data-bug="2" aria-label="Squash bug"></button>' : ''}</h3><p class="why">${esc(b.why)}</p></div>
      <div class="tags">${b.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <span class="sp" title="Story points">${b.pts}</span>
    </div>`).join('');
  $('#toolbox').innerHTML = C.toolbox.map(t => `<div class="app"><span class="ic">${esc(t.mono)}${t.logo ? `<img data-fallback src="${esc(t.logo)}" alt="" loading="lazy">` : ''}</span><div><b>${esc(t.n)}</b><small>${esc(t.d)}</small></div><span class="on">● on</span></div>`).join('');

  /* Interviews */
  $('#ivList').innerHTML = C.testimonials.map(t => {
    const q = esc(t.quote).replace(esc(t.highlight), `<mark>${esc(t.highlight)}</mark>`);
    const tag = t.linkedin ? 'a' : 'div';
    const attr = t.linkedin ? ` href="${esc(t.linkedin)}" target="_blank" rel="noopener"` : '';
    return `<article class="iv">
      <div class="iv-top"><span class="tk-id">${esc(t.id)} · ${esc(t.context)}</span><span class="status s-ship">Sentiment: very positive</span></div>
      <blockquote>“${q}”</blockquote>
      <p class="summary"><b>Summary</b>${esc(t.summary)}</p>
      <div class="themes">${t.themes.map(x => `<span class="theme">${esc(x)}</span>`).join('')}</div>
      <${tag} class="person"${attr}><span class="av">${esc(t.initials)}${t.photo ? `<img data-fallback src="${esc(t.photo)}" alt="">` : ''}</span><div><b>${esc(t.name)}</b><small>${esc(t.title)}</small></div></${tag}>
    </article>`;
  }).join('');

  /* Launch checks */
  $('#checkList').innerHTML = C.checks.map(([a, b], i) => `<div class="check" style="--n:${i}"><span class="ok">✓</span><span>${esc(a)}</span><small>${esc(b)}</small></div>`).join('');

  /* Bugs + avatar */
  $$('.bug').forEach(b => { b.innerHTML = BUG_SVG; });
  $('#bugSample').innerHTML = BUG_SVG;
  $('#avFallback').textContent = C.profile.initials;
  if (C.profile.photo) $('#avatar').insertAdjacentHTML('beforeend', `<img data-fallback src="${esc(C.profile.photo)}" alt="">`);
  wireImgs(document);

  /* ================= TOAST ================= */
  let toastT;
  function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.remove('hide'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.add('hide'), 2600); }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-todo]');
    if (a) { e.preventDefault(); toast(`${a.dataset.todo === 'x' ? 'X' : a.dataset.todo} link coming soon`); }
  });

  /* ================= THEME (sun / moon) ================= */
  const root = document.documentElement, themeBtn = $('#themeBtn');
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => { const t = root.getAttribute('data-theme'); return t ? t === 'dark' : mq.matches; };
  const syncTheme = () => themeBtn.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
  syncTheme();
  mq.addEventListener?.('change', syncTheme);
  themeBtn.addEventListener('click', () => {
    const t = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', t); store.set('aru-theme', t); syncTheme();
    themeBtn.classList.toggle('spin');
    say(t === 'dark' ? 'Lights off 🌙 Dark mode shipped to 100% of you.' : 'Lights on ☀️ Clean rollback, no incident report needed.', true);
  });

  /* ================= FLOATING AVATAR ================= */
  const buddy = $('#buddy'), bubble = $('#bubble'), bt = $('#bubbleT'), avatar = $('#avatar');
  avatar.classList.add('avatar-bob');
  let sayTimer, current = '', muted = false, lastSaid = '';
  function say(html, force) {
    if (muted && !force) return;
    if (html === lastSaid && !force) return;
    lastSaid = html; muted = false;
    bubble.classList.remove('hide');
    clearTimeout(sayTimer);
    if (force && !reduce) { avatar.classList.remove('react'); void avatar.offsetWidth; avatar.classList.add('react'); setTimeout(() => avatar.classList.remove('react'), 650); }
    if (reduce) { bt.innerHTML = html; return; }
    bt.innerHTML = '<span class="typing" aria-hidden="true"><i></i><i></i><i></i></span>';
    sayTimer = setTimeout(() => { bt.innerHTML = html; kickBuddy(); }, 650);
    kickBuddy();
  }
  avatar.addEventListener('click', () => {
    muted = !bubble.classList.contains('hide');
    bubble.classList.toggle('hide', muted);
    if (!muted) { lastSaid = ''; say(C.buddy[current] || C.buddy.hero); }
  });

  /* Which side of the screen the avatar sits on, per section. It glides across when this changes. */
  const SIDE = { hero: 'right', roadmap: 'left', releases: 'right', shipped: 'left', archive: 'right', backlog: 'left', interviews: 'right', launch: 'left' };
  let side = 'right', bx = innerWidth - 120, by = innerHeight + 40, vel = 0, lastScroll = scrollY, running = false;
  function buddyTarget() {
    const mobile = innerWidth < 720;
    const w = buddy.offsetWidth, h = buddy.offsetHeight, g = 18;
    const s = mobile ? 'right' : side;   // phones: stay right, clear of the links pill
    const x = s === 'left' ? g : innerWidth - w - g;
    let y = mobile ? innerHeight - h - 82 : innerHeight * 0.7 - h / 2;
    y = Math.min(y, innerHeight - h - 80);
    if (!reduce) y += clamp(-vel * 5, -120, 120);   // lags behind when you scroll, then springs back
    return { x, y, s };
  }
  function buddyLoop() {
    vel *= 0.86;
    const t = buddyTarget();
    buddy.classList.toggle('right', t.s === 'right');
    const k = reduce ? 1 : 0.085;
    bx += (t.x - bx) * k; by += (t.y - by) * (reduce ? 1 : 0.11);
    buddy.style.transform = `translate3d(${bx.toFixed(1)}px,${by.toFixed(1)}px,0)`;
    avatar.style.setProperty('--tilt', (reduce ? 0 : clamp(vel * 0.9, -16, 16)).toFixed(1) + 'deg');
    aimArrow();
    if (Math.abs(t.x - bx) > 0.4 || Math.abs(t.y - by) > 0.4 || Math.abs(vel) > 0.05) requestAnimationFrame(buddyLoop);
    else running = false;
  }
  function kickBuddy() { if (!running) { running = true; requestAnimationFrame(buddyLoop); } }

  /* The hand-drawn arrow in the hero always points at the avatar */
  const arrow = $('#annotArrow');
  function aimArrow() {
    const r = arrow.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const ax = r.left + r.width * 0.08, ay = r.top + r.height * 0.65;
    const av = avatar.getBoundingClientRect();
    const ang = Math.atan2(av.top + av.height / 2 - ay, av.left + av.width / 2 - ax) * 180 / Math.PI;
    arrow.style.transform = `rotate(${ang.toFixed(1)}deg)`;
  }

  const sayEls = $$('[data-say]');
  const NAV = { roadmap: 'journey', releases: 'journey', shipped: 'shipped', archive: 'shipped', backlog: 'backlog', interviews: 'interviews' };
  function pickSection() {
    const mid = innerHeight * 0.45; let best = sayEls[0];
    sayEls.forEach(s => { if (s.getBoundingClientRect().top < mid) best = s; });
    const rm = $('#roadmap').getBoundingClientRect();
    if (rm.top < mid && rm.bottom > mid) best = $('#journey');
    const key = best.dataset.say;
    if (key !== current) {
      current = key; side = SIDE[key] || 'left'; say(C.buddy[key]); kickBuddy();
      $$('.nav-links a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + NAV[key]));
    }
  }

  /* ================= ROADMAP ================= */
  const R = C.roadmap;
  const mo = ([y, m]) => y * 12 + (m - 1);
  const M0 = mo(R.start), M1 = mo(R.end), TODAY = mo(R.today);
  const TW = 2900, PAD = 150, SCALE = (TW - PAD - 40) / (M1 - M0);
  const px = m => PAD + (m - M0) * SCALE;
  const LANE_TOP = [52, 142, 232, 340];
  const track = $('#rmTrack');
  track.style.width = TW + 'px';
  $('#rmLabels').innerHTML = R.lanes.map((l, i) => `<span style="top:${LANE_TOP[i] + (i === 3 ? 10 : 24)}px">${esc(l)}</span>`).join('');
  let h = '';
  for (let y = R.start[0]; y <= R.end[0]; y++) for (let q = 0; q < 4; q++) {
    const m = y * 12 + q * 3; if (m > M1) break;
    h += `<div class="rm-q ${q === 0 ? 'y' : ''}" style="left:${px(m)}px"><span>${q === 0 ? y : 'Q' + (q + 1)}</span></div>`;
  }
  h += `<div class="future" style="left:${px(TODAY)}px;width:${px(M1) - px(TODAY) + 40}px"></div><div class="today" style="left:${px(TODAY)}px"></div>`;
  R.bars.forEach((b, i) => {
    const w = Math.max(px(mo(b.e)) - px(mo(b.s)) - 6, 210);
    const cls = b.now ? 'now' : b.next ? 'next' : b.edu ? 'edu' : b.community ? 'community' : '';
    h += `<div class="bar ${cls}" data-bar="${i}" style="top:${LANE_TOP[b.lane]}px;left:${px(mo(b.s))}px;width:${w}px">${b.next ? '' : logoSlot(b.logo, b.mono, 'sm')}<span class="txt"><span>${esc(b.title)}</span><small>${esc(b.sub)}</small></span></div>`;
  });
  R.milestones.forEach(ms => { h += `<div class="ms" style="top:${LANE_TOP[3] + 16}px;left:${px(mo(ms.d)) - 7}px"><span>${esc(ms.t)}</span></div>`; });
  track.innerHTML = h;
  wireImgs(track);
  const barEls = $$('.bar', track);
  let rmDone = false, lastBar = null;
  function updRoadmap(p) {
    const fw = track.parentElement.clientWidth, max = Math.max(0, TW - fw), tx = -p * max;
    track.style.transform = `translate3d(${tx}px,0,0)`;
    const m = M0 + ((-tx + fw * 0.55) - PAD) / SCALE;
    let idx = -1;
    for (const lane of [0, 2, 1]) {
      idx = R.bars.findIndex(b => b.lane === lane && m >= mo(b.s) - 1 && m <= Math.max(mo(b.e), mo(b.s) + 210 / SCALE));
      if (idx > -1) break;
    }
    if (idx !== lastBar) {
      lastBar = idx;
      barEls.forEach(el => el.classList.toggle('active', +el.dataset.bar === idx));
      const yr = Math.floor(clamp(m, M0, M1 - 1) / 12);
      $('#rmRead').textContent = idx > -1 ? `${R.bars[idx].s[0]} · ${R.bars[idx].read}` : `${yr} · Between releases`;
    }
    $('#rmProg').style.width = (p * 100) + '%';
    if (p > 0.96 && !rmDone) { rmDone = true; complete('roadmap'); }
  }

  /* ================= SITE TOUR (gamification) ================= */
  const tasks = [
    { id: 'prd', t: 'Read the PRD', hint: 'Scroll past the intro', xp: 10 },
    { id: 'roadmap', t: 'Travel the whole roadmap', hint: 'Scroll the timeline to the end', xp: 15 },
    { id: 'case', t: 'Open a case study', hint: 'Any Work card or Notion link', xp: 15 },
    { id: 'interviews', t: 'Read the testimonials', hint: 'Spend a moment on the interviews', xp: 10 },
    { id: 'bugs', t: 'Squash 3 hidden bugs', hint: 'They look like the one on the sticky note', xp: 20 },
    { id: 'launch', t: 'Reach the launch review', hint: 'The very end of the page', xp: 10 }
  ];
  const LEVELS = [[0, 'New visitor'], [20, 'Curious explorer'], [45, 'Power user'], [80, 'Activated user 🏅']];
  const TOTAL = tasks.reduce((a, t) => a + t.xp, 0);
  $('#tourTotal').textContent = TOTAL;
  let saved = {};
  try { saved = JSON.parse(store.get('aru-tour') || '{}'); } catch (e) {}
  const done = new Set(saved.done || []);
  const squashed = new Set(saved.bugs || []);
  const xpNow = () => tasks.filter(t => done.has(t.id)).reduce((a, t) => a + t.xp, 0) + (done.has('bugs') ? 0 : squashed.size * 0);
  const persist = () => store.set('aru-tour', JSON.stringify({ done: [...done], bugs: [...squashed] }));
  function renderTour() {
    $('#taskList').innerHTML = tasks.map(t => {
      const isDone = done.has(t.id);
      const label = t.id === 'bugs' ? `${t.t} <span class="muted">(${squashed.size}/3)</span>` : t.t;
      return `<li class="quest ${isDone ? 'done' : ''}"><span class="chk">✓</span><span class="qt">${label}<span class="qh">${t.hint}</span></span><span class="xpchip">${isDone ? '✓ ' : '+'}${t.xp} XP</span></li>`;
    }).join('');
    const n = done.size, xp = xpNow();
    $('#tourCount').textContent = `${n}/${tasks.length}`;
    $('#tourXp').textContent = xp;
    $('#tourLevel').textContent = LEVELS.filter(([min]) => xp >= min).pop()[1];
    $('#ringFg').style.strokeDashoffset = 62.8 * (1 - n / tasks.length);
    $('#meter').style.width = (xp / TOTAL * 100) + '%';
    $('#tourHint').textContent = n === tasks.length ? 'You explored everything. Thanks for visiting!' : `${tasks.length - n} quest${tasks.length - n > 1 ? 's' : ''} left to reach activation.`;
  }
  function complete(id) {
    if (done.has(id)) return;
    done.add(id); persist(); renderTour();
    const pill = $('#tourBtn'); pill.classList.remove('bump'); void pill.offsetWidth; pill.classList.add('bump');
    const t = tasks.find(x => x.id === id);
    if (done.size === tasks.length) {
      toast('🏅 Badge unlocked: Activated user');
      setTimeout(() => { say("You hit activation 🎉 You've seen everything here. Most visitors don't. Want to grab 15 minutes?", true); confetti(); }, 700);
    } else toast(`✓ ${t.t}  +${t.xp} XP`);
  }
  const tourEl = $('#tour'), tourBtn = $('#tourBtn');
  const setTour = open => { tourEl.hidden = !open; tourBtn.setAttribute('aria-expanded', String(open)); };
  tourBtn.addEventListener('click', () => setTour(tourEl.hidden));
  document.addEventListener('click', e => { if (!tourEl.hidden && !tourEl.contains(e.target) && !tourBtn.contains(e.target)) setTour(false); });
  document.addEventListener('click', e => { if (e.target.closest('[data-case]')) complete('case'); });
  $('#tourReset').addEventListener('click', () => {
    done.clear(); squashed.clear(); persist(); rmDone = false;
    $$('.bug').forEach(b => { b.hidden = false; b.classList.remove('squashed'); });
    updateIssues(); renderTour(); toast('Tour reset. Happy hunting!');
  });

  function updateIssues() { $('#issues').textContent = squashed.has('3') ? 'none reported' : '1 open'; }
  $$('.bug').forEach(b => {
    if (squashed.has(b.dataset.bug)) b.hidden = true;
    b.addEventListener('click', () => {
      if (squashed.has(b.dataset.bug)) return;
      b.classList.add('squashed'); squashed.add(b.dataset.bug); persist(); renderTour(); updateIssues();
      const left = 3 - squashed.size;
      if (left <= 0) { complete('bugs'); say("All 3 bugs squashed. Zero open bugs in production. That's a first.", true); }
      else { say(`Nice catch! ${left} bug${left > 1 ? 's' : ''} left. I'd hire you as QA.`, true); toast(`🐞 Bug squashed (${squashed.size}/3)`); }
    });
  });
  updateIssues();
  renderTour();
  setTimeout(() => complete('prd'), 9000);

  function confetti() {
    if (reduce) return;
    const c = $('#confetti'), x = c.getContext('2d'); c.hidden = false;
    const dpr = devicePixelRatio || 1;
    c.width = innerWidth * dpr; c.height = innerHeight * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cs = getComputedStyle(root), cols = ['--accent', '--pop', '--sticky', '--blue', '--lilac'].map(v => cs.getPropertyValue(v).trim());
    const P = Array.from({ length: 180 }, () => ({ x: innerWidth / 2, y: innerHeight * .35, vx: (Math.random() - .5) * 15, vy: -Math.random() * 14 - 4, s: Math.random() * 7 + 4, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[Math.random() * cols.length | 0] }));
    let f = 0;
    (function loop() {
      x.clearRect(0, 0, innerWidth, innerHeight);
      P.forEach(p => { p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); });
      if (++f < 180) requestAnimationFrame(loop); else c.hidden = true;
    })();
  }

  /* ================= COPY EMAIL ================= */
  $('#copyMail').addEventListener('click', () => {
    const b = $('#copyMail');
    const ok = () => { toast('Email copied'); b.textContent = 'Copied'; setTimeout(() => { b.textContent = 'Copy'; }, 2000); };
    try { navigator.clipboard.writeText(C.links.email).then(ok, () => toast(C.links.email)); } catch (e) { toast(C.links.email); }
  });

  /* ================= ⌘K ================= */
  const live = u => u && u !== 'TODO';
  const cmds = [
    { t: 'Book a 15-min call', g: 'cal.com', url: C.links.cal },
    { t: 'Download resume', g: 'PDF', url: C.links.resume },
    { t: 'Copy email address', g: 'Contact', fn: () => $('#copyMail').click() },
    { t: 'Open LinkedIn', g: 'Social', url: C.links.linkedin },
    { t: 'Open GitHub', g: 'Social', url: C.links.github },
    { t: 'Open X', g: 'Social', url: C.links.x },
    ...C.shipped.map(s => live(s.link && s.link.url) ? { t: `Work: ${s.title}`, g: s.org, url: s.link.url, c: 1 } : { t: `Work: ${s.title}`, g: s.org, sec: '#shipped' }),
    ...C.archive.map(a => ({ t: `Case study: ${a.org}`, g: 'Notion', url: a.url, c: 1 })),
    { t: 'Go to: Journey (career + education)', g: 'Section', sec: '#journey' },
    { t: 'Go to: Experience in detail', g: 'Section', sec: '#releases' },
    { t: 'Go to: Skills', g: 'Section', sec: '#backlog' },
    { t: 'Go to: Testimonials', g: 'Section', sec: '#interviews' },
    { t: 'Go to: Contact', g: 'Section', sec: '#launch' },
    { t: 'Toggle light / dark mode', g: 'Theme', fn: () => themeBtn.click() },
    { t: 'Open site tour', g: 'Tour', fn: () => setTour(true) }
  ].filter(c => !('url' in c) || live(c.url));
  const ov = $('#overlay'), pin = $('#palIn'), pl = $('#palList');
  let sel = 0, shown = cmds, lastFocus = null;
  function openPal() { lastFocus = document.activeElement; ov.hidden = false; pin.value = ''; sel = 0; renderPal(); pin.focus(); }
  function closePal() { ov.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function renderPal() {
    const q = pin.value.toLowerCase().trim();
    shown = q ? cmds.filter(c => (c.t + ' ' + c.g).toLowerCase().includes(q)) : cmds;
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    pl.innerHTML = shown.length
      ? shown.map((c, i) => `<li role="option" id="po${i}" data-i="${i}" aria-selected="${i === sel}"><span>${esc(c.t)}</span><span class="g">${esc(c.g)}</span></li>`).join('')
      : '<li aria-disabled="true" class="muted">No results. Try “resume” or “case”.</li>';
    pin.setAttribute('aria-activedescendant', shown.length ? 'po' + sel : '');
  }
  function runCmd(i) {
    const c = shown[i]; if (!c) return; closePal();
    if (c.url) { window.open(c.url, '_blank', 'noopener'); if (c.c) complete('case'); }
    else if (c.sec) document.querySelector(c.sec).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    else if (c.fn) c.fn();
  }
  $('#openPal').addEventListener('click', openPal);
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); ov.hidden ? openPal() : closePal(); }
    else if (e.key === 'Escape') { if (!ov.hidden) closePal(); else if (!tourEl.hidden) setTour(false); }
  });
  pin.addEventListener('input', () => { sel = 0; renderPal(); });
  pin.addEventListener('keydown', e => {
    const n = Math.max(1, shown.length);
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % n; renderPal(); $('#po' + sel)?.scrollIntoView({ block: 'nearest' }); }
    if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + n) % n; renderPal(); $('#po' + sel)?.scrollIntoView({ block: 'nearest' }); }
    if (e.key === 'Enter') { e.preventDefault(); runCmd(sel); }
  });
  pl.addEventListener('click', e => { const li = e.target.closest('li[data-i]'); if (li) runCmd(+li.dataset.i); });
  ov.addEventListener('click', e => { if (e.target === ov) closePal(); });

  /* ================= IN-VIEW TRIGGERS ================= */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      if (e.target.id === 'ivList') setTimeout(() => complete('interviews'), 1500);
      if (e.target.id === 'launchCard') { complete('launch'); e.target.classList.add('play'); }
      io.unobserve(e.target);
    }), { threshold: 0.35 });
    io.observe($('#ivList')); io.observe($('#launchCard'));
  }

  /* ================= SCROLL LOOP ================= */
  const rmEl = $('#roadmap'), stage = $('.stage', rmEl), cases = $$('.case');
  let stageTop = 0, caseTops = [], stackOn = false;
  function measure() {
    stageTop = parseFloat(getComputedStyle(stage).top) || 0;
    stackOn = innerWidth > 900 && !reduce;
    caseTops = cases.map(c => parseFloat(getComputedStyle(c).top) || 0);
    if (!stackOn) cases.forEach(c => { c.style.transform = ''; c.style.setProperty('--dim', 0); });
  }
  let ticking = false;
  function frame() {
    ticking = false;
    const r = rmEl.getBoundingClientRect();
    updRoadmap(clamp((stageTop - r.top) / Math.max(1, r.height - stage.offsetHeight)));
    const d = document.documentElement;
    $('#sprint').style.width = (clamp(scrollY / Math.max(1, d.scrollHeight - innerHeight)) * 100) + '%';
    if (scrollY > innerHeight * 0.75) complete('prd');
    if (stackOn) {
      for (let i = 0; i < cases.length - 1; i++) {
        const nextTop = cases[i + 1].getBoundingClientRect().top;
        const p = clamp(1 - (nextTop - caseTops[i]) / cases[i].offsetHeight);
        cases[i].style.transform = `scale(${(1 - p * 0.05).toFixed(4)})`;
        cases[i].style.setProperty('--dim', (p * 0.45).toFixed(3));
      }
    }
    pickSection();
  }
  addEventListener('scroll', () => {
    const dy = scrollY - lastScroll; lastScroll = scrollY;
    vel = clamp(vel * 0.5 + dy * 0.5, -60, 60);
    kickBuddy();
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  addEventListener('resize', () => { measure(); frame(); kickBuddy(); });
  measure(); frame();
  bx = buddyTarget().x; kickBuddy();   // slides up into place on load
})();
