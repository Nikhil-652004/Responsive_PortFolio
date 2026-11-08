// Renders SITE (site.js) into the page. No framework, no build step.
(() => {
  const S = SITE, I = S.identity, C = S.contact;
  const $ = (q, el = document) => el.querySelector(q);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  const ext = 'target="_blank" rel="noopener noreferrer"';
  const reveal = (html, d = 0) => `<div class="rv" style="--d:${d}">${html}</div>`;

  document.querySelectorAll('[data-bind="initials"]').forEach((el) => (el.textContent = I.initials));

  // ---------- Hero ----------
  $(".hero").innerHTML = `
    <p class="eyebrow rv">${esc(I.profession)}${I.company ? ` <span>@ ${esc(I.company)}</span>` : ""}
      ${I.availability ? `<em class="avail">${esc(I.availability)}</em>` : ""}</p>
    <div class="hero-stage">
      <h1 class="hero-name"><span class="n1">${esc(I.firstName)}</span><span class="n2">${esc(I.lastName)}</span></h1>
      ${I.portrait ? `<div class="portrait">
        <img src="${I.portrait}" alt="Portrait of ${esc(I.fullName)}" width="900" height="754" fetchpriority="high">
        ${I.character?.photos[1] ? `<img class="glance" src="${I.character.photos[1]}" alt="" width="900" height="754">` : ""}
      </div>` : ""}
    </div>
    <div class="hero-foot">
      ${reveal(`<p class="intro">${esc(I.intro)}</p>
        <ul class="chips">${I.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        <div class="ctas"><a class="btn" href="#work">View work</a><a class="btn btn-ghost" href="#contact">Contact</a>
        ${I.resume ? `<a class="btn btn-ghost" href="${I.resume}" download>Résumé</a>` : ""}</div>`, 1)}
      ${reveal(`<dl class="metrics">${S.metrics.map((m) => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div>`).join("")}</dl>
        ${I.location ? `<p class="loc">Based in ${esc(I.location)}</p>` : ""}`, 2)}
    </div>`;

  // ---------- Mini me: small cartoon that tags along through the page ----------
  const CH = I.character;
  if (CH) document.body.insertAdjacentHTML("beforeend", `
    <div class="buddy" hidden>
      <div class="buddy-view" role="img" aria-label="Mini cartoon of ${esc(I.fullName)}">${TOON_SVG}${WALKER_SVG}</div>
      <p class="bubble" aria-live="polite"></p>
    </div>`);

  // ---------- Work ----------
  const cats = ["All", ...new Set(S.projects.map((p) => p.category))];
  const ordered = [...S.projects].sort((a, b) => b.featured - a.featured);
  $("#work").innerHTML = `
    <div class="sec-head rv"><p class="kicker">01 — Selected work</p><h2>Things I've built</h2></div>
    <div class="work-tools rv">
      <div class="filters" role="group" aria-label="Filter by category">
        ${cats.map((c, i) => `<button type="button" aria-pressed="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}
      </div>
      <label class="search"><span class="sr">Search projects</span><input type="search" placeholder="Search projects…"></label>
    </div>
    <ul class="grid"></ul>
    <p class="empty" hidden>No projects match that — try another filter.</p>`;

  const cover = (p) => p.coverImage
    ? `<img src="${p.coverImage}" alt="" loading="lazy" width="1000" height="750">`
    : `<span class="type-cover" aria-hidden="true">${esc(p.title)}</span>`;

  let cat = "All", q = "";
  const renderGrid = () => {
    const list = ordered.filter((p) => (cat === "All" || p.category === cat) &&
      (p.title + p.summary + p.category + p.tools.join(" ")).toLowerCase().includes(q));
    $(".grid").innerHTML = list.map((p, i) => `
      <li class="card rv in ${p.featured ? "featured" : ""}" style="--d:${i}">
        <button type="button" class="card-btn" data-id="${p.id}" aria-haspopup="dialog">
          <span class="cover">${cover(p)}</span>
          <span class="meta"><span>${esc(p.category)}</span>${p.year ? `<span>${esc(p.year)}</span>` : ""}</span>
          <span class="card-title">${esc(p.title)}</span>
          <span class="card-sum">${esc(p.summary)}</span>
          <span class="more">View details →</span>
        </button>
      </li>`).join("");
    $(".empty").hidden = list.length > 0;
  };
  renderGrid();
  $(".filters").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    cat = b.dataset.cat;
    $(".filters").querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderGrid();
  });
  $(".search input").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); renderGrid(); });

  // Native <dialog>: Escape + focus trap for free; we only restore focus and handle backdrop.
  const dlg = $(".dialog");
  let opener = null;
  $(".grid").addEventListener("click", (e) => {
    const b = e.target.closest(".card-btn"); if (!b) return;
    const p = S.projects.find((x) => x.id === b.dataset.id);
    opener = b;
    dlg.innerHTML = `
      <div class="dlg-inner">
        <button type="button" class="dlg-close" aria-label="Close">✕</button>
        ${p.coverImage ? `<img src="${p.coverImage}" alt="${esc(p.title)} cover" width="1000" height="750">` : `<div class="type-cover big" aria-hidden="true">${esc(p.title)}</div>`}
        <p class="kicker">${esc(p.category)}${p.year ? ` · ${esc(p.year)}` : ""}</p>
        <h3 id="dlg-title">${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <dl class="dlg-facts">
          ${p.role ? `<div><dt>Role</dt><dd>${esc(p.role)}</dd></div>` : ""}
          ${p.tools.length ? `<div><dt>Stack</dt><dd>${p.tools.map(esc).join(" · ")}</dd></div>` : ""}
        </dl>
        <div class="ctas">
          ${p.liveUrl ? `<a class="btn" href="${p.liveUrl}" ${ext}>Live demo ↗</a>` : ""}
          ${p.sourceUrl ? `<a class="btn btn-ghost" href="${p.sourceUrl}" ${ext}>Source ↗</a>` : ""}
        </div>
      </div>`;
    dlg.showModal();
  });
  dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".dlg-close")) dlg.close(); });
  dlg.addEventListener("close", () => opener && opener.focus());

  // ---------- About + skills ----------
  $("#about").innerHTML = `
    <div class="sec-head rv"><p class="kicker">02 — About</p><h2>UI to data layer</h2></div>
    <div class="about-grid">
      ${reveal(`<div class="about-copy">${I.about.map((p) => `<p>${p}</p>`).join("")}
        <p class="hand">— ${esc(I.firstName)}</p></div>`)}
      ${reveal(`<div class="skills">${S.skills.map((g) => `
        <div class="skill-group"><h3>${esc(g.group)}</h3><ul>${g.items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>`).join("")}
        ${S.spokenLanguages.length ? `<div class="skill-group"><h3>Speaks</h3><ul>${S.spokenLanguages.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>` : ""}
      </div>`, 1)}
    </div>`;

  // ---------- Journey (native <details> = accessible expand/collapse) ----------
  $("#journey").innerHTML = `
    <div class="sec-head rv"><p class="kicker">03 — Journey</p><h2>Experience & education</h2></div>
    <ol class="timeline">${S.experience.map((x, i) => `
      <li class="rv" style="--d:${i}"><details ${i === 0 ? "open" : ""}>
        <summary><span class="dates">${esc(x.dates)}</span><span class="role">${esc(x.title)} <em>@ ${esc(x.org)}</em></span><span class="plus" aria-hidden="true"></span></summary>
        <div class="tl-body"><ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul><p class="place">${esc(x.place)}</p></div>
      </details></li>`).join("")}</ol>`;

  // ---------- Contact ----------
  const socials = [["LinkedIn", C.linkedin], ["GitHub", C.github], ["Instagram", C.instagram]].filter((s) => s[1]);
  const socialLinks = socials.map(([n, u]) => `<a href="${u}" ${ext}>${n} ↗</a>`).join("");
  $("#contact").innerHTML = `
    <div class="sec-head rv"><p class="kicker">04 — Contact</p><h2>Let's build something<br><span class="accent">together.</span></h2></div>
    <div class="contact-grid">
      ${reveal(`<a class="big-mail" href="mailto:${C.email}">${esc(C.email)}</a><div class="socials">${socialLinks}</div>`)}
      ${reveal(`<form class="form" novalidate>
        <label>Name<input name="name" required autocomplete="name"></label>
        <label>Email<input name="email" type="email" required autocomplete="email"></label>
        <label>Message<textarea name="message" rows="4" required></textarea></label>
        <button class="btn" type="submit">Open in email app</button>
        <p class="form-note" role="status">Opens your email client with the message prefilled — nothing is sent from this site.</p>
      </form>`, 1)}
    </div>`;
  $(".form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const d = Object.fromEntries(new FormData(f));
    location.href = `mailto:${C.email}?subject=${encodeURIComponent(`Hello from ${d.name}`)}&body=${encodeURIComponent(`${d.message}\n\n— ${d.name} (${d.email})`)}`;
  });

  // ---------- Footer ----------
  $(".footer").innerHTML = `
    <p class="foot-name">${esc(I.fullName)}</p>
    <div class="socials">${socialLinks}</div>
    <p class="foot-small">© ${new Date().getFullYear()} ${esc(I.fullName)} · <a href="#top">Back to top ↑</a></p>
    <p class="foot-small">Motion effect: <a href="https://github.com/imperfec-t/swarm-Antigravity" ${ext}>Swarm Rebuild</a>, after <a href="https://califa.github.io/swarm-site/" ${ext}>Swarm</a> by Joel Califa</p>`;

  // ---------- Mobile menu ----------
  const menuBtn = $(".menu-toggle"), nav = $("#nav");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  nav.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); }
  });

  // ---------- Active section ----------
  const links = [...nav.querySelectorAll("a")];
  const so = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((a) => a.hash === "#" + en.target.id ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"));
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section").forEach((s) => so.observe(s));

  // ---------- Motion: OS preference + persisted toggle ----------
  const KEY = "nikhil-gokarakonda.motion";
  const mBtn = $(".motion-toggle");
  let stored = null;
  try { stored = localStorage.getItem(KEY); } catch {}
  const setMotion = (on, save) => {
    document.documentElement.classList.toggle("no-motion", !on);
    mBtn.setAttribute("aria-pressed", on);
    mBtn.lastElementChild.textContent = on ? "on" : "off";
    if (save) try { localStorage.setItem(KEY, on ? "on" : "off"); } catch {}
  };
  setMotion(stored ? stored === "on" : !matchMedia("(prefers-reduced-motion: reduce)").matches);
  mBtn.addEventListener("click", () => setMotion(mBtn.getAttribute("aria-pressed") !== "true", true));

  // ---------- Mini me ----------
  // Takes over from the hero photo, then lives on the page: he stands on something you can see (a heading,
  // a card, a list), walks along it towards your cursor, and when it scrolls away he hops - or climbs down -
  // to the next thing in view. Motion is time-based with weight: anticipation crouch, gravity arcs, landing
  // squash, lean into walking. Idle, he breathes, blinks, looks around, stretches, waves. He reacts to what
  // you hover, click and type, and you can pick him up and drop him.
  const buddy = $(".buddy"), bubble = $(".buddy .bubble");
  if (CH && buddy) {
    const box = $(".buddy-view"), toons = [...buddy.querySelectorAll(".toon")];
    const bust = $(".bust", buddy), walker = $(".walker", buddy);
    const heads = toons.map((sv) => { const h = $(".t-head", sv); return { el: h, pv: h.dataset.pivot, small: sv === walker }; });
    const pupils = [...buddy.querySelectorAll(".pupil")].map((el) => ({ el, r: el.dataset.range.split(" ").map(Number), small: !!el.closest(".walker") }));
    const hero = $(".hero"), photo = $(".hero .portrait"), T = CH.talk;
    const still = () => document.documentElement.classList.contains("no-motion");
    const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
    const lerp = (a, b, k) => a + (b - a) * k;
    const PERCHES = ".hero .chips, .hero .metrics, .sec-head h2, .work-tools, .card, .about-copy p, .skill-group h3, .timeline > li, .big-mail, .socials, .form label, .footer .foot-name";
    const VISITS = ".card-btn, .big-mail, .btn, .skill-group li, .timeline summary, .filters button";

    // doc = page coordinates (so standing on an element survives scrolling); feet are the bottom-centre point
    let feet = null, vx = 0, mode = "bust", perch = null, act = null, queue = [], flip = false, section = "top";
    let visit = null, dragging = null, dragMoved = false, idleAt = performance.now() + 5000, wanderX = null;
    let target = { x: 0, y: 0 }, cur = { x: 0, y: 0 }, moodUntil = 0, lastMove = -1e9, mouse = null, nextWander = 0;
    let nextBlink = performance.now() + 2500, blinkUntil = 0, last = performance.now();

    const say = (text, ms = 1900) => {
      if (!text) return;
      bubble.replaceChildren(Object.assign(document.createElement("span"), { textContent: text })); // the printed tile on the brick wall
      bubble.classList.remove("on"); void bubble.offsetWidth; bubble.classList.add("on");
      clearTimeout(say.t); say.t = setTimeout(() => bubble.classList.remove("on"), ms);
    };
    const setMood = (m) => toons.forEach((sv) => sv.dataset.mood !== m && (sv.dataset.mood = m));
    const react = (m, ms = 1400, line = CH.lines[m]) => {
      if (still() || buddy.hidden) return;
      setMood(m); moodUntil = performance.now() + ms; say(line, ms + 300);
    };
    const pose = (name, ms) => { buddy.classList.add(name); clearTimeout(pose[name]); pose[name] = setTimeout(() => buddy.classList.remove(name), ms); };
    const vb = walker.viewBox.baseVal, aspect = vb.width / vb.height; // the walker drawing's proportions
    const size = () => (innerWidth <= 800 ? { h: 104, w: 104 * aspect } : { h: 150, w: 150 * aspect });

    // ---- where can he stand? ----
    const roomTop = (h) => $(".header").offsetHeight + h + 20; // room for all of him below the sticky header
    const spot = (el, w, nearX) => { // a standing point on el (doc coords): its top edge, or its face if the top is scrolled away
      const r = el.getBoundingClientRect(), pad = Math.min(w * 0.6, r.width / 2), m = roomTop(size().h);
      const sy = r.top >= m ? r.top : Math.min(r.bottom - 12, Math.max(m, innerHeight * 0.6));
      return { x: clamp(nearX ?? r.left + r.width / 2, r.left + pad, r.right - pad), y: sy + scrollY };
    };
    const usable = (el, h, loose) => {
      const r = el.getBoundingClientRect(), top = roomTop(h);
      if (r.width <= 40 || r.height <= 0) return false;
      return loose ? r.bottom > top + 30 && r.top < innerHeight - 10 // still has a visible part he can stand on
                   : r.top > top + 40 && r.top < innerHeight - 30;   // its top edge is comfortably in view
    };
    const bestPerch = (h) => {
      let best = null, score = 1e9;
      for (const el of document.querySelectorAll(PERCHES)) {
        if (!usable(el, h)) continue;
        const d = Math.abs(el.getBoundingClientRect().top - innerHeight * 0.6);
        if (d < score) { score = d; best = el; }
      }
      if (best) return best;
      for (const el of document.querySelectorAll(PERCHES)) { // nothing's top edge in view (e.g. one tall card): stand on its face
        const r = el.getBoundingClientRect();
        if (r.width > 40 && r.top < innerHeight * 0.6 && r.bottom > innerHeight * 0.6) return el;
      }
      return null;
    };

    // ---- moves: a small queue of walk / climb / jump steps, each time-based ----
    const go = (to, w) => { // plan how to get from feet to `to` (doc coords)
      queue = [];
      const dy = to.y - feet.y;
      if (dy > 220) { // long way down: step off the edge and parachute
        if (perch && dy < 2000) {
          const r = perch.getBoundingClientRect(), edge = Math.abs(feet.x - r.left) < Math.abs(feet.x - r.right) ? r.left + w * 0.3 : r.right - w * 0.3;
          queue.push({ type: "walk", x: edge });
        }
        queue.push({ type: "chute", ...to });
      } else queue.push({ type: "jump", ...to });
      act = null;
    };
    const startNext = (t) => {
      const m = queue.shift();
      if (!m) return (act = null);
      if (m.type === "jump") {
        const dist = Math.hypot(m.x - feet.x, m.y - feet.y);
        act = { ...m, t0: t + 130, dur: clamp(320 + dist * 0.55, 380, 900), from: { ...feet }, arc: 30 + Math.max(0, feet.y - m.y) * 0.5 + dist * 0.08 };
        pose("crouch", 130); // anticipation
      } else if (m.type === "chute") { // canopy pops, then a slow swaying float down (always time-based)
        act = { ...m, t0: t + 220, dur: clamp(Math.abs(m.y - feet.y) / 0.42, 900, 2400), from: { ...feet } };
      } else if (m.type === "climb") act = { ...m, t0: t, dur: clamp(Math.abs(m.y - feet.y) / 0.7, 300, 1400), from: { ...feet } };
      else act = { ...m }; // walk: handled by the walking spring
    };

    // ---- hand-off: photos first, then he takes the photo's place ----
    const show = () => {
      if (!buddy.hidden || still()) return;
      buddy.hidden = false;
      requestAnimationFrame(() => { buddy.classList.add("on"); photo.classList.add("handed-off"); });
      setTimeout(() => say(CH.hello, 2600), 900);
    };
    setTimeout(show, CH.photoMs);
    const early = () => scrollY > 40 && (removeEventListener("scroll", early), show()); // a real scroll, not a #hash jump
    addEventListener("scroll", early, { passive: true });

    function aim(px, py) {
      const r = heads[mode === "bust" ? 0 : 1].el.getBoundingClientRect(), ex = r.left + r.width / 2, ey = r.top + r.height * 0.55;
      target = { x: clamp((px - ex) / (innerWidth * 0.35), -1, 1), y: clamp((py - ey) / (innerHeight * 0.35), -1, 1) };
    }
    addEventListener("pointermove", (e) => {
      if (e.pointerType === "mouse") { aim(e.clientX, e.clientY); lastMove = performance.now(); mouse = { x: e.clientX, y: e.clientY }; }
      if (dragging) { dragMoved = true; feet = { x: e.clientX - dragging.dx, y: e.clientY - dragging.dy + scrollY }; }
    }, { passive: true });

    const tick = (t) => {
      requestAnimationFrame(tick);
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      if (still()) {
        if (!buddy.hidden) { buddy.hidden = true; buddy.classList.remove("on"); photo.classList.remove("handed-off"); }
        return;
      }
      if (buddy.hidden) { if (t > CH.photoMs) show(); return; } // e.g. animations switched back on
      if (document.documentElement.classList.contains("swarm-on")) return; // stepped aside while the swarm runs
      const { w, h } = size(), sr = photo.getBoundingClientRect();
      const p = clamp(scrollY / Math.max(1, hero.offsetHeight * 0.45), 0, 1);
      let state = "stand";

      if (p < 1) { // ---- stepping out of the hero: the photo-sized bust shrinks into the walker ----
        mode = "bust"; perch = null; act = null; queue = []; visit = null;
        const land = bestPerch(h) || $(".hero .chips");
        const end = spot(land, w, sr.left + sr.width / 2), e = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
        const bw = lerp(sr.width, w, e), bh = lerp(sr.height, h, e);
        const bx = lerp(sr.left, end.x - w / 2, e), by = lerp(sr.top, end.y - scrollY - h, e);
        feet = { x: bx + bw / 2, y: by + bh + scrollY };
        if (e > 0.98) perch = land;
        Object.assign(buddy.style, { transform: `translate(${bx.toFixed(1)}px, ${by.toFixed(1)}px)`, width: bw + "px", height: bh + "px" });
        buddy.style.setProperty("--fade", 72 + 28 * e + "%");
        bust.style.opacity = clamp((0.6 - e) / 0.3, 0, 1); walker.style.opacity = clamp((e - 0.3) / 0.3, 0, 1);
      } else { // ---- living on the page ----
        mode = "walker";
        bust.style.opacity = 0; walker.style.opacity = 1; buddy.style.setProperty("--fade", "100%");
        if (!perch) perch = bestPerch(h);
        const headerH = $(".header").offsetHeight;
        if (!feet) feet = { x: perch ? spot(perch, w).x : innerWidth - w, y: scrollY + headerH + h * 1.45 }; // skipped the hero (e.g. deep link): start under the header
        const screenY = feet.y - scrollY;
        // scrolled out of view (or tucked behind the header) between moves: parachute in from just under the header
        if (!dragging && !act && !queue.length && (screenY < headerH + h * 0.6 || screenY > innerHeight + h) && !(perch && usable(perch, h, true))) {
          const next = bestPerch(h);
          if (next) { perch = next; const s2 = { ...spot(next, w, feet.x), el: next }; feet = { x: s2.x, y: scrollY + headerH + h * 1.45 }; queue = [{ type: "chute", ...s2 }]; act = null; } // start under the header so the canopy shows
        }
        if (visit && (!usable(visit.el, h, true) || t > visit.until)) visit = null;
        // need a new place to stand?
        if (!dragging && !act && !queue.length) {
          const want = visit?.el || (perch && usable(perch, h, true) ? perch : bestPerch(h));
          if (want && want !== perch) { const to = { ...spot(want, w, feet.x), el: want }; go(to, w); perch = want; }
          else if (want) { const s2 = spot(want, w, feet.x); if (Math.abs(s2.y - feet.y) > 2) feet.y = lerp(feet.y, s2.y, 0.25); }
          const sec = perch?.closest("section, footer")?.id;
          if (sec && sec !== section) { section = sec; if (CH.sections[sec]) say(CH.sections[sec]); }
        }
        if (!act && queue.length) startNext(t);

        // mid-air and his landing spot scrolled away (e.g. smooth-scrolling to a far section): pick a new one
        if ((act?.type === "chute" || act?.type === "jump") && act.el && !usable(act.el, h, true)) {
          const next = bestPerch(h);
          if (next) { const s2 = spot(next, w, feet.x); perch = next; act = { ...act, ...s2, el: next, from: { ...feet }, t0: t, dur: clamp(Math.abs(s2.y - feet.y) / 0.42, 700, 2000) }; }
        }
        if (dragging) { state = "dangle"; vx = 0; }
        else if (act?.type === "jump") {
          const u = clamp((t - act.t0) / act.dur, 0, 1);
          if (t >= act.t0) {
            feet = { x: lerp(act.from.x, act.x, u), y: lerp(act.from.y, act.y, u) - act.arc * 4 * u * (1 - u) };
            state = "jump"; vx = (act.x - act.from.x) / (act.dur / 1000); flip = vx < 0;
          } else state = "crouch";
          if (u >= 1) { feet = { x: act.x, y: act.y }; act = null; pose("land", 260); }
        } else if (act?.type === "chute") {
          const u = clamp((t - act.t0) / act.dur, 0, 1), e = 1 - (1 - u) ** 1.6; // quick drop as it opens, then floaty
          const ex = u * u * (3 - 2 * u); // drift towards the landing spot (no side-to-side rocking)
          feet = { x: lerp(act.from.x, act.x, ex), y: lerp(act.from.y, act.y, e) };
          walker.style.setProperty("--tilt", `${clamp((act.x - feet.x) * 0.08, -12, 12).toFixed(2)}deg`); // lean into the drift, level out on arrival
          const minY = scrollY + headerH + h * 1.45; // the page scrolls past faster than he falls: ride down with the screen
          if (feet.y < minY && act.y > minY) { feet.y = minY; act.from = { ...feet }; act.t0 = t; act.dur = clamp((act.y - minY) / 0.42, 600, 2000); }
          state = "chute"; vx = 0;
          if (u >= 1) { feet = { x: act.x, y: act.y }; act = null; pose("land", 300); if (Math.random() < 0.35) say(T.landed); }
        } else if (act?.type === "climb") {
          const u = clamp((t - act.t0) / act.dur, 0, 1), e = u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2;
          feet = { x: act.x, y: lerp(act.from.y, act.y, e) }; state = "climb"; vx = 0;
          if (u >= 1) act = null;
        } else { // walking (to an edge, towards your cursor, or just wandering) with a spring and a speed cap
          let goal = act?.type === "walk" ? act.x : feet.x;
          if (!act && perch) {
            const r = perch.getBoundingClientRect(), pad = Math.min(w * 0.6, r.width / 2);
            if (mouse && t - lastMove < 2500 && Math.abs(mouse.y - (feet.y - scrollY)) < innerHeight * 0.45) goal = mouse.x;
            else { if (t > nextWander) { wanderX = Math.random() < 0.5 ? null : r.left + pad + Math.random() * (r.width - 2 * pad); nextWander = t + 3500 + Math.random() * 4000; } if (wanderX !== null) goal = wanderX; }
            goal = clamp(goal, r.left + pad, r.right - pad);
          }
          const want = clamp((goal - feet.x) * 5, -150, 150); // px/s
          vx += (want - vx) * Math.min(1, dt * 8); // inertia
          feet.x += vx * dt;
          if (Math.abs(vx) > 12) { state = "walk"; flip = vx < 0; }
          if (act?.type === "walk" && Math.abs(goal - feet.x) < 3) act = null;
          if (Math.abs(goal - feet.x) < 2 && Math.abs(vx) < 12) vx = 0;
        }
        Object.assign(buddy.style, { transform: `translate(${(feet.x - w / 2).toFixed(1)}px, ${(feet.y - scrollY - h).toFixed(1)}px)`, width: w + "px", height: h + "px" });
        walker.style.setProperty("--lean", `${clamp(vx / 30, -5, 5).toFixed(2)}deg`); // lean into the walk
      }

      // poses
      for (const c of ["walking", "climbing", "jumping", "dangling", "parachuting"]) buddy.classList.toggle(c, false);
      if (mode === "walker") buddy.classList.add({ walk: "walking", climb: "climbing", jump: "jumping", dangle: "dangling", chute: "parachuting" }[state] || "standing");
      buddy.classList.toggle("is-walker", mode === "walker");
      buddy.classList.toggle("standing", mode === "walker" && state === "stand");
      buddy.classList.toggle("face-left", mode === "walker" && flip && (state === "walk" || state === "jump"));
      if (mode === "bust") { // big hero version: the bubble pops out beside his face, not the drawing's corner
        const hr = heads[0].el.getBoundingClientRect(), br = buddy.getBoundingClientRect();
        Object.assign(bubble.style, { left: hr.right - br.left - hr.width * 0.12 + "px", bottom: br.bottom - hr.top - hr.height * 0.18 + "px", right: "auto" });
        buddy.classList.remove("left");
      } else {
        bubble.style.cssText = "";
        buddy.classList.toggle("left", feet.x > innerWidth * 0.66); // bubble opens towards the page
      }
      if (mode === "walker" && state === "stand" && !act && !queue.length && t > idleAt && t > moodUntil) { // idle life
        const pick = ["stretch", "waving", "hop", "look", "tap"][Math.floor(Math.random() * 5)];
        if (pick === "look") { target = { x: Math.random() < 0.5 ? -0.9 : 0.9, y: -0.3 }; nextWander = t + 1800; }
        else pose(pick, pick === "stretch" ? 1500 : 1200);
        idleAt = t + 4500 + Math.random() * 4500;
      }

      // face: eyes + head follow the cursor (or what he's visiting), blink, moods
      if (visit) { const er = visit.el.getBoundingClientRect(); aim(er.left + er.width / 2, er.top + er.height / 2); }
      else if (t - lastMove > 4000 && t > nextWander) {
        target = Math.random() < 0.45 ? { x: 0, y: 0 } : { x: Math.random() * 1.6 - 0.8, y: Math.random() - 0.5 };
        nextWander = t + 2200 + Math.random() * 2600;
      }
      const k = 1 - Math.exp(-dt * 9); // frame-rate independent smoothing
      cur.x += (target.x - cur.x) * k; cur.y += (target.y - cur.y) * k;
      const fx = buddy.classList.contains("face-left") ? -1 : 1; // the walker is mirrored while heading left
      pupils.forEach(({ el, r, small }) => el.setAttribute("transform", `translate(${(cur.x * r[0] * (small ? fx : 1)).toFixed(2)} ${(cur.y * r[1]).toFixed(2)})`));
      heads.forEach(({ el, pv, small }) => {
        const x = cur.x * (small ? fx : 1), s3 = small ? 0.3 : 1;
        el.setAttribute("transform", `rotate(${(x * 5).toFixed(2)} ${pv}) translate(${(x * 6 * s3).toFixed(2)} ${(cur.y * 4 * s3).toFixed(2)})`);
      });
      if (t > nextBlink) { blinkUntil = t + 140; nextBlink = t + 2400 + Math.random() * 3800; }
      if (t < moodUntil) return;
      setMood(t < blinkUntil ? "blink" : "");
    };
    requestAnimationFrame(tick);

    // ---- playing with him ----
    box.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && !dragging) { react("happy", 1700); pose("waving", 1600); } });
    box.addEventListener("click", () => { if (!dragMoved) { react("laugh", 1600); pose("hop", 700); } });
    box.addEventListener("dblclick", () => react("wink", 1600));
    box.addEventListener("pointerdown", (e) => { // pick him up
      if (mode !== "walker" || e.button !== 0) return;
      e.preventDefault(); box.setPointerCapture(e.pointerId);
      dragging = { dx: e.clientX - feet.x, dy: e.clientY - (feet.y - scrollY) }; dragMoved = false; visit = null; act = null; queue = [];
      react("surprised", 1e6, T.drag);
    });
    const drop = () => {
      if (!dragging) return;
      dragging = null;
      if (!dragMoved) { moodUntil = 0; return; }
      react("laugh", 1400, T.drop);
      const { h, w } = size(), below = [...document.querySelectorAll(PERCHES)].filter((el) => usable(el, h, true))
        .map((el) => ({ el, s: spot(el, w, feet.x) })).filter((o) => o.s.y >= feet.y - 4).sort((a, b) => a.s.y - b.s.y)[0] || { el: bestPerch(h) };
      if (below.el) { perch = below.el; const s2 = { ...spot(below.el, w, feet.x), el: below.el }; queue = [{ type: "jump", ...s2 }]; act = null; } // gravity: fall onto what's below
    };
    box.addEventListener("pointerup", drop); box.addEventListener("pointercancel", drop);

    // ---- reacting to the page itself ----
    const visitFor = (el) => {
      if (el.closest(".card-btn")) return { mood: "curious", line: `ooh, ${$(".card-title", el.closest(".card-btn")).textContent}!` };
      if (el.closest(".big-mail")) return { mood: "wink", line: T.mail };
      if (el.closest(".btn")) return { mood: "happy", line: T.button };
      if (el.closest(".skill-group li")) return { mood: "happy", line: `${el.closest("li").textContent}? love it` };
      if (el.closest(".timeline summary")) return { mood: "happy", line: T.timeline };
      if (el.closest(".filters button")) return { mood: "curious", line: T.filter };
      return null;
    };
    let hoverT;
    document.addEventListener("pointerover", (e) => {
      if (e.pointerType !== "mouse" || dragging || mode !== "walker" || box.contains(e.target)) return;
      const v = visitFor(e.target);
      if (!v) return;
      const el = e.target.closest(VISITS);
      if (visit?.el === el) { visit.until = performance.now() + 2500; return; }
      clearTimeout(hoverT);
      hoverT = setTimeout(() => { visit = { el, until: performance.now() + 2500 }; react(v.mood, 1600, v.line); }, 220);
    });
    document.addEventListener("pointerout", (e) => { if (e.target.closest?.(VISITS)) clearTimeout(hoverT); });
    document.addEventListener("click", (e) => {
      if (mode !== "walker" || box.contains(e.target)) return;
      if (e.target.closest(".timeline summary")) { react("happy", 1200, T.timeline); pose("hop", 700); }
      else if (e.target.closest(".filters button")) react("curious", 1200, `${e.target.closest("button").textContent} it is!`);
    });
    let typingT;
    $(".search input")?.addEventListener("input", (e) => {
      clearTimeout(typingT);
      typingT = setTimeout(() => e.target.value.trim() && react("curious", 1500, `searching "${e.target.value.trim()}"… 🔍`), 350);
    });
    $(".form")?.addEventListener("submit", () => { react("laugh", 2000, T.sent); pose("hop", 700); });
    let lastY = scrollY, lastT = performance.now();
    addEventListener("scroll", () => {
      const t = performance.now(), v = Math.abs(scrollY - lastY) / Math.max(16, t - lastT);
      lastY = scrollY; lastT = t;
      if (v > 5 && t > moodUntil) react("surprised", 900); // px/ms: a hard flick
    }, { passive: true });
  }

  // Swarm (vendor/swarm.js): loading it starts the effect; afterwards toggle via its global.
  // While it runs, mini-me steps aside and the real hero photo is shown, so the swarm's snapshot of the page
  // doesn't freeze him into a giant static figure; he comes back when the swarm exits.
  const swarmOn = (on) => document.documentElement.classList.toggle("swarm-on", on);
  const watchSwarm = () => {
    clearInterval(watchSwarm.t);
    watchSwarm.t = setInterval(() => { if (!window.__swarmRebuild?.app) { swarmOn(false); clearInterval(watchSwarm.t); } }, 400);
  };
  $(".swarm-btn").addEventListener("click", () => {
    swarmOn(true);
    if (window.__swarmRebuild) { window.__swarmRebuild.toggle(); return watchSwarm(); }
    document.querySelectorAll(".rv").forEach((el) => el.classList.add("in")); // so the snapshot sees every section
    document.body.append(Object.assign(document.createElement("script"), { src: "vendor/swarm.js", onload: watchSwarm }));
  });

  // Reveal on scroll
  const ro = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".rv:not(.in)").forEach((el) => ro.observe(el));

  // Scroll progress (one rAF-throttled listener)
  const bar = $(".progress"), header = $(".header");
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      header.classList.toggle("scrolled", y > 20);
      ticking = false;
    });
  }, { passive: true });
})();
