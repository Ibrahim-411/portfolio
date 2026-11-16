(() => {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

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
  initNav();
  initForm();
  initMotion();
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  initReveal();
  initCounters();
})();
