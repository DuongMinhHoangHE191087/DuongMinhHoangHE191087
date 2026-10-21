(() => {
  "use strict";

  const P = window.PORTFOLIO;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (v = "") =>
    String(v).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  /* ================= THEME ================= */
  const themeBtn = $("#theme-toggle");
  const applyTheme = (t) => {
    root.dataset.theme = t;
    themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
  };
  applyTheme(localStorage.getItem("theme") || root.dataset.theme || "dark");
  themeBtn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  /* ================= PROFILE ================= */
  const avatar = $("#avatar");
  avatar.src = P.avatar || `https://github.com/${P.username}.png`;
  avatar.onerror = () => (avatar.style.display = "none");
  $("#name").textContent = P.name;
  $("#bio").textContent = P.bio;
  $("#gh-link").href = `https://github.com/${P.username}`;
  $("#year").textContent = new Date().getFullYear();
  document.title = `${P.name} · Portfolio`;

  /* ================= TYPING EFFECT ================= */
  function typeLoop(words) {
    const el = $("#typed");
    if (reduceMotion) {
      el.textContent = words[0];
      return;
    }
    let w = 0, c = 0, deleting = false;
    const tick = () => {
      const word = words[w];
      el.textContent = word.slice(0, c);
      if (!deleting) {
        if (c < word.length) { c++; return setTimeout(tick, 90); }
        deleting = true;
        return setTimeout(tick, 1600);
      }
      if (c > 0) { c--; return setTimeout(tick, 40); }
      deleting = false;
      w = (w + 1) % words.length;
      return setTimeout(tick, 300);
    };
    tick();
  }

  /* ================= REVEAL ON SCROLL ================= */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  const observeReveal = (scope = document) =>
    $$(".reveal:not(.in)", scope).forEach((el) => io.observe(el));

  /* ================= PROJECTS ================= */
  const grid = $("#projects-grid");
  const filters = $("#filters");
  const ALL = "Tất cả";
  let activeTag = ALL;
  const allTags = [ALL, ...new Set(P.projects.flatMap((p) => p.tags))];

  function renderFilters() {
    filters.innerHTML = allTags
      .map((t) => `<button class="chip ${t === activeTag ? "active" : ""}" data-tag="${esc(t)}">${esc(t)}</button>`)
      .join("");
  }

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tag]");
    if (!btn) return;
    activeTag = btn.dataset.tag;
    renderFilters();
    renderProjects();
  });

  function renderProjects() {
    const list = P.projects.filter((p) => activeTag === ALL || p.tags.includes(activeTag));
    grid.innerHTML = list
      .map((p) => `
        <article class="card reveal">
          <div class="card-inner">
            ${p.featured ? '<span class="badge">Nổi bật</span>' : ""}
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.description)}</p>
            ${p.metrics ? `<p class="metric">📈 ${esc(p.metrics)}</p>` : ""}
            <div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
            <div class="links">
              ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Source ↗</a>` : ""}
              ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">Demo ↗</a>` : ""}
            </div>
          </div>
        </article>`)
      .join("");
    bindTilt();
    observeReveal(grid);
  }

  function bindTilt() {
    if (reduceMotion) return;
    $$(".card", grid).forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const rx = (y / r.height - 0.5) * -10;
        const ry = (x / r.width - 0.5) * 10;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        card.style.setProperty("--mx", x + "px");
        card.style.setProperty("--my", y + "px");
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ================= EXPERIENCE ================= */
  function renderExperience() {
    $("#timeline").innerHTML = P.experience
      .map((x) => `
        <div class="tl-item reveal">
          <span class="dot"></span>
          <div class="tl-card">
            <div class="tl-head">
              <h3>${esc(x.role)} <span class="muted">@ ${esc(x.company)}</span></h3>
              <span class="period">${esc(x.period)}</span>
            </div>
            ${x.location ? `<p class="muted small">${esc(x.location)}</p>` : ""}
            <ul>${x.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
          </div>
        </div>`)
      .join("");
  }

  /* ================= SKILLS ================= */
  function renderSkills() {
    $("#skills-wrap").innerHTML = P.skills
      .map((g) => `
        <div class="skill-group reveal">
          <h3>${esc(g.group)}</h3>
          ${g.items.map((s) => `
            <div class="skill">
              <div class="skill-top"><span>${esc(s.name)}</span><span>${s.level}%</span></div>
              <div class="bar"><div class="fill" style="--w:${Number(s.level)}%"></div></div>
            </div>`).join("")}
        </div>`)
      .join("");
  }

  /* ================= CONTACT ================= */
  function renderContact() {
    const links = [
      P.email && { label: "Email", href: `mailto:${P.email}` },
      P.linkedin && { label: "LinkedIn", href: P.linkedin },
      P.website && { label: "Website", href: P.website },
      { label: "GitHub", href: `https://github.com/${P.username}` },
    ].filter(Boolean);

    $("#contact-links").innerHTML = links
      .map((l) => `<a class="btn" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
      .join("");
  }

  /* ================= STATS & COUNTERS ================= */
  const counters = $$(".num");
  let countersPlayed = false;

  function animateCount(el, target) {
    if (reduceMotion) {
      el.textContent = target;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsIO = new IntersectionObserver(
    (entries, obs) => {
      if (!entries[0].isIntersecting) return;
      countersPlayed = true;
      counters.forEach((el) => animateCount(el, Number(el.dataset.target) || 0));
      obs.disconnect();
    },
    { threshold: 0.3 }
  );
  statsIO.observe($("#stats"));

  async function loadStats() {
    const fb = P.fallbackStats || {};
    const stats = {
      repos: fb.repos ?? 0,
      stars: fb.stars ?? 0,
      followers: fb.followers ?? 0,
      projects: P.projects.length,
    };

    const setTargets = () => {
      $("#stat-repos").dataset.target = stats.repos;
      $("#stat-stars").dataset.target = stats.stars;
      $("#stat-followers").dataset.target = stats.followers;
      $("#stat-projects").dataset.target = stats.projects;
    };
    setTargets();

    try {
      const get = (url) =>
        fetch(url, { headers: { Accept: "application/vnd.github+json" } }).then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        });

      const [user, repos] = await Promise.all([
        get(`https://api.github.com/users/${P.username}`),
        get(`https://api.github.com/users/${P.username}/repos?per_page=100&sort=updated`),
      ]);

      stats.repos = user.public_repos;
      stats.followers = user.followers;
      // Tổng sao của tối đa 100 repo gần nhất
      stats.stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
      setTargets();

      if (countersPlayed) {
        counters.forEach((el) => (el.textContent = el.dataset.target));
      }
    } catch (err) {
      console.warn("Không tải được GitHub API, dùng số liệu dự phòng.", err);
    }
  }

  /* ================= HEADER SHADOW ON SCROLL ================= */
  const header = $(".nav");
  addEventListener(
    "scroll",
    () => header.classList.toggle("scrolled", scrollY > 20),
    { passive: true }
  );

  /* ================= CURSOR GLOW & PARTICLES ================= */
  const glow = $("#cursor-glow");
  const mouse = { x: -9999, y: -9999 };

  addEventListener(
    "pointermove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    },
    { passive: true }
  );
  root.addEventListener("mouseleave", () => {
    mouse.x = mouse.y = -9999;
  });

  const canvas = $("#bg-canvas");
  const ctx = canvas.getContext("2d");
  let pts = [];

  function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const n = Math.min(90, Math.floor((innerWidth * innerHeight) / 18000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
  }

  function drawFrame() {
    const color = getComputedStyle(root).getPropertyValue("--particle").trim() || "#7aa2ff";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;

    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
    }

    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.globalAlpha = (1 - d / 120) * 0.35;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < 160) {
        ctx.globalAlpha = (1 - dm / 160) * 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(drawFrame);
  }

  /* ================= INIT ================= */
  renderFilters();
  renderProjects();
  renderExperience();
  renderSkills();
  renderContact();
  observeReveal();
  typeLoop(P.roles && P.roles.length ? P.roles : [P.name]);
  loadStats();

  if (reduceMotion) {
    canvas.style.display = "none";
  } else {
    resizeCanvas();
    addEventListener("resize", resizeCanvas);
    drawFrame();
  }
})();
