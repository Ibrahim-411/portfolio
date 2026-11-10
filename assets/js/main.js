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
      return `
      <article class="reveal card card-hover flex flex-col" style="--d:${(i % 2) * 90}ms">
        <div class="flex items-start justify-between gap-4">
          <div class="grid size-14 shrink-0 place-items-center rounded-2xl font-display text-xl font-extrabold ${a.tile}" aria-hidden="true">${String(i + 1).padStart(2, "0")}</div>
          <span class="rounded-full ${a.glow} px-3 py-1 text-xs font-bold ${a.label}">${esc(p.type)}</span>
        </div>
        <h3 class="mt-6 text-2xl font-extrabold sm:text-3xl">${esc(p.name)}</h3>
        <dl class="mt-5 space-y-4 text-[0.95rem] leading-relaxed">
          <div><dt class="text-xs font-bold uppercase tracking-[0.14em] text-muted">Problem</dt><dd class="mt-1 text-slate-700">${esc(p.problem)}</dd></div>
          <div><dt class="text-xs font-bold uppercase tracking-[0.14em] text-muted">What I did</dt><dd class="mt-1 text-slate-700">${esc(p.did)}</dd></div>
          <div><dt class="text-xs font-bold uppercase tracking-[0.14em] text-muted">Result</dt><dd class="mt-1">${result}</dd></div>
        </dl>
        <div class="mt-6 flex flex-wrap gap-2">${(p.tools || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
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

  /* ---------- Boot ---------- */
  renderProjects();
  initNav();
  initForm();
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  initReveal();
  initCounters();
})();
