(() => {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Projects (rendered from window.PROJECTS) ---------- */
  // Class names are written out in full so Tailwind can see them.
  const ACCENTS = {
    blue:   { tile: "bg-brand text-white",       glow: "bg-brand-soft",  label: "text-brand" },
    orange: { tile: "bg-ember text-ink",         glow: "bg-ember-soft",  label: "text-ember-ink" },
    yellow: { tile: "bg-sun text-ink",           glow: "bg-sun-soft",    label: "text-ink" },
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isPlaceholder = (s) => /^\[.*\]$/.test(String(s).trim());

  function renderProjects() {
    const grid = $("#project-grid");
    const data = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
    if (!grid || !data.length) return;
    grid.innerHTML = data.map((p, i) => {
      const a = ACCENTS[p.accent] || ACCENTS.blue;
      const result = isPlaceholder(p.result)
        ? `<span class="inline-block rounded-lg bg-sun px-2.5 py-1 text-sm font-bold text-ink">${esc(p.result)}</span>`
        : `<span class="font-bold text-ink">${esc(p.result)}</span>`;
      const links = (p.links || []).map((l) =>
        `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">${esc(l.label)}<span aria-hidden="true">↗</span></a>`
      ).join("");
      const host = p.url ? new URL(p.url).hostname.replace(/^www\./, "") : "";
      const preview = p.image && p.url ? `
        <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" class="shot-link group/shot -mx-2 -mt-2 mb-6 block rounded-2xl bg-paper p-2 ring-1 ring-line" aria-label="Open ${esc(p.name)} live site (${esc(host)}) in a new tab">
          <div class="overflow-hidden rounded-xl bg-white ring-1 ring-line">
            <div class="flex items-center gap-2 border-b border-line bg-paper px-3 py-2" aria-hidden="true">
              <span class="size-2.5 rounded-full bg-ember"></span><span class="size-2.5 rounded-full bg-sun"></span><span class="size-2.5 rounded-full bg-brand"></span>
              <span class="ml-2 min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-xs font-semibold text-muted ring-1 ring-line">${esc(host)}</span>
            </div>
            <div class="shot-frame relative overflow-hidden">
              <img src="${esc(p.image)}" alt="Screenshot of the ${esc(p.name)} website homepage" loading="lazy" decoding="async" width="900" class="shot block h-auto w-full">
              <span class="absolute bottom-3 right-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-bold text-white opacity-0 transition group-hover/shot:opacity-100">Scrolling preview ↓</span>
            </div>
          </div>
        </a>` : "";
      const actions = p.url ? `
        <div class="mt-auto flex flex-wrap gap-3 pt-6">
          <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary !px-5 !py-2.5">Visit live site<svg class="size-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-arrow"/></svg></a>
          ${p.embed ? `<button type="button" data-preview="${esc(p.url)}" data-title="${esc(p.name)}" class="btn btn-ghost !px-5 !py-2.5">Live preview</button>` : ""}
        </div>` : "";
      return `
      <article class="reveal card card-hover flex flex-col" style="--d:${(i % 2) * 90}ms">
        ${preview}
        <div class="flex items-start justify-between gap-4">
          <div class="grid size-14 shrink-0 place-items-center rounded-2xl font-display text-xl font-extrabold ${a.tile}" aria-hidden="true">${String(i + 1).padStart(2, "0")}</div>
          <div class="flex flex-wrap justify-end gap-2">
            ${p.badge ? `<span class="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">✦ ${esc(p.badge)}</span>` : ""}
            <span class="rounded-full ${a.glow} px-3 py-1 text-xs font-bold ${a.label}">${esc(p.type)}</span>
          </div>
        </div>
        <h3 class="mt-6 text-2xl font-extrabold sm:text-3xl">${esc(p.name)}</h3>
        <dl class="mt-5 space-y-4 text-[0.95rem] leading-relaxed">
          <div><dt class="text-xs font-bold uppercase tracking-[0.14em] text-muted">Problem</dt><dd class="mt-1 text-slate-700">${esc(p.problem)}</dd></div>
          <div><dt class="text-xs font-bold uppercase tracking-[0.14em] text-muted">What I did</dt><dd class="mt-1 text-slate-700">${esc(p.did)}</dd></div>
          <div><dt class="text-xs font-bold uppercase tracking-[0.14em] text-muted">Result</dt><dd class="mt-1">${result}</dd></div>
        </dl>
        <div class="mt-6 flex flex-wrap gap-2">${(p.tools || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        ${actions}
        ${links ? `<div class="mt-5 border-t border-line pt-4">${links}</div>` : ""}
      </article>`;
    }).join("");
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    const els = $$("[data-count]");
    const run = (el) => {
      const end = parseFloat(el.dataset.count);
      if (reduceMotion) { el.textContent = end; return; }
      const dur = 1400, t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) { els.forEach((e) => (e.textContent = e.dataset.count)); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.6 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Nav: shadow on scroll, active link, mobile menu ---------- */
  function initNav() {
    const header = $("#site-header");
    const onScroll = () => header.classList.toggle("shadow-soft", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const links = $$("[data-nav]");
    const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((l) => {
            const on = l.getAttribute("href") === "#" + en.target.id;
            l.classList.toggle("text-brand", on);
            if (on) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach((s) => io.observe(s));
    }

    const btn = $("#menu-btn"), menu = $("#mobile-menu");
    const setMenu = (open) => {
      btn.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
      $("#icon-open").classList.toggle("hidden", open);
      $("#icon-close").classList.toggle("hidden", !open);
    };
    btn.addEventListener("click", () => setMenu(menu.hidden));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { setMenu(false); btn.focus(); } });
  }

  /* ---------- Contact form -> opens the visitor's email app (no backend needed) ---------- */
  function initForm() {
    const form = $("#contact-form");
    if (!form) return;
    const note = $("#form-note");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const name = String(d.get("name") || "").trim();
      const email = String(d.get("email") || "").trim();
      const msg = String(d.get("message") || "").trim();
      const subject = `Portfolio enquiry from ${name}`;
      const body = `${msg}\n\n— ${name}\n${email}`;
      window.location.href = `mailto:ibrahim19062005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      note.textContent = "Opening your email app… if nothing happens, email me directly at ibrahim19062005@gmail.com.";
    });
  }

  /* ---------- Live preview dialog ---------- */
  function initPreview() {
    const dlg = $("#preview-dialog");
    if (!dlg || typeof dlg.showModal !== "function") return;
    const frame = $("#preview-frame"), title = $("#preview-title"), open = $("#preview-open");
    const close = () => { if (dlg.open) dlg.close(); };
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-preview]");
      if (!btn) return;
      const url = btn.dataset.preview;
      title.textContent = `${btn.dataset.title} · live preview`;
      open.href = url;
      frame.src = url;
      dlg.showModal();
    });
    $("#preview-close").addEventListener("click", close);
    dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); }); // click on backdrop
    dlg.addEventListener("close", () => { frame.src = "about:blank"; });
  }

  /* ---------- Motion: scroll progress, hero tilt, card spotlight, timeline draw ---------- */
  function initMotion() {
    const bar = $("#progress");
    const spine = $(".spine");
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      if (spine && !reduceMotion) {
        const r = spine.getBoundingClientRect();
        const p = (window.innerHeight * 0.6 - r.top) / r.height;
        spine.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
      }
    };
    const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();

    if (reduceMotion) return;

    // Cursor spotlight on any .card
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest && e.target.closest(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - r.left}px`);
      card.style.setProperty("--y", `${e.clientY - r.top}px`);
    }, { passive: true });

    // Hero portrait: parallax + tilt follow the pointer (fine pointers only)
    const tilt = $("[data-tilt]");
    if (tilt && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const zone = $("#top");
      const set = (x, y, g) => { tilt.style.setProperty("--mx", x.toFixed(3)); tilt.style.setProperty("--my", y.toFixed(3)); tilt.style.setProperty("--glare", g); };
      zone.addEventListener("pointermove", (e) => {
        const r = tilt.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
        const y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
        set(x, y, 1);
      }, { passive: true });
      zone.addEventListener("pointerleave", () => set(0, 0, 0));
    }
  }

  /* ---------- Boot ---------- */
  renderProjects();
  initNav();
  initForm();
  initPreview();
  initMotion();
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  initReveal();
  initCounters();
})();
