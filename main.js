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
      ${I.portrait ? `<img class="portrait" src="${I.portrait}" alt="Portrait of ${esc(I.fullName)}" width="900" height="876" fetchpriority="high">` : ""}
    </div>
    <div class="hero-foot">
      ${reveal(`<p class="intro">${esc(I.intro)}</p>
        <ul class="chips">${I.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        <div class="ctas"><a class="btn" href="#work">View work</a><a class="btn btn-ghost" href="#contact">Contact</a>
        ${I.resume ? `<a class="btn btn-ghost" href="${I.resume}" download>Résumé</a>` : ""}</div>`, 1)}
      ${reveal(`<dl class="metrics">${S.metrics.map((m) => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div>`).join("")}</dl>
        ${I.location ? `<p class="loc">Based in ${esc(I.location)}</p>` : ""}`, 2)}
    </div>`;

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

  // Swarm (vendor/swarm.js): loading it starts the effect; afterwards toggle via its global.
  $(".swarm-btn").addEventListener("click", () => {
    if (window.__swarmRebuild) return window.__swarmRebuild.toggle();
    document.querySelectorAll(".rv").forEach((el) => el.classList.add("in")); // so the snapshot sees every section
    document.body.append(Object.assign(document.createElement("script"), { src: "vendor/swarm.js" }));
  });

  // Reveal on scroll
  const ro = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".rv:not(.in)").forEach((el) => ro.observe(el));

  // Scroll progress + gentle hero parallax (one rAF-throttled listener)
  const bar = $(".progress"), portrait = $(".portrait"), header = $(".header");
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      header.classList.toggle("scrolled", y > 20);
      if (portrait && !document.documentElement.classList.contains("no-motion") && y < innerHeight)
        portrait.style.transform = `translateY(${y * 0.12}px)`;
      ticking = false;
    });
  }, { passive: true });
})();
