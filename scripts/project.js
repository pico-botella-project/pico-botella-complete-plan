// ============================================================
// project.js — Lógica de renderizado de la página del proyecto
// Pico Botella | Dispositivos Moviles
// ============================================================

(function () {
  "use strict";

  const D = PROJECT_DATA;

  // ── Render Hero ──────────────────────────────────────────────
  function renderHero() {
    document.getElementById("hero-project-name").textContent = D.name;
    document.getElementById("hero-full-name").textContent = D.fullName;
    document.getElementById("hero-tagline").textContent = D.tagline;
    const badgeContainer = document.getElementById("hero-badges");
    const badges = [D.version, D.status, D.team];
    badgeContainer.innerHTML = badges
      .map((b) => `<span class="hero-badge">${b}</span>`)
      .join("");
  }

  // ── Render Description Cards ────────────────────────────────
  function renderDescription() {
    document.getElementById("project-description-text").textContent =
      D.description;
    document.getElementById("project-context-text").textContent = D.context;

    const scopeIn = document.getElementById("scope-in-list");
    if (scopeIn) {
      scopeIn.innerHTML = D.scope.inScope.map((s) => `<li>${s}</li>`).join("");
    }
    const scopeOut = document.getElementById("scope-out-list");
    if (scopeOut) {
      scopeOut.innerHTML = D.scope.outScope
        .map((s) => `<li>${s}</li>`)
        .join("");
    }
  }

  // ── Objectives Carousel ──────────────────────────────────────
  let currentSlide = 0;
  let allSlides = [];
  let autoInterval = null;

  function buildObjectiveSlides() {
    const slides = [
      {
        num: "Objetivo General",
        text: D.objectives.general,
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        className: "general",
      },
      ...D.objectives.specific.map((s, i) => ({
        num: `Objetivo Específico ${i + 1} / ${D.objectives.specific.length}`,
        text: s,
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
        className: "",
      })),
    ];
    return slides;
  }

  function renderCarousel() {
    allSlides = buildObjectiveSlides();
    const track = document.getElementById("carousel-track");
    const dotsContainer = document.getElementById("carousel-dots");
    if (!track || !dotsContainer) return;

    track.innerHTML = allSlides
      .map(
        (s) => `
      <div class="objective-card ${s.className}">
        <div class="objective-card-num">${s.num}</div>
        <div class="objective-card-text">${s.text}</div>
        <div class="objective-card-icon">${s.icon}</div>
      </div>`,
      )
      .join("");

    dotsContainer.innerHTML = allSlides
      .map(
        (_, i) =>
          `<div class="carousel-dot${i === 0 ? " active" : ""}" data-index="${i}"></div>`,
      )
      .join("");

    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot) => {
      dot.addEventListener("click", () =>
        goToSlide(parseInt(dot.dataset.index)),
      );
    });

    startAutoplay();
  }

  function goToSlide(index) {
    currentSlide = (index + allSlides.length) % allSlides.length;
    const track = document.getElementById("carousel-track");
    if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;

    document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function startAutoplay() {
    clearInterval(autoInterval);
    autoInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  window.carouselPrev = function () {
    clearInterval(autoInterval);
    goToSlide(currentSlide - 1);
    startAutoplay();
  };

  window.carouselNext = function () {
    clearInterval(autoInterval);
    goToSlide(currentSlide + 1);
    startAutoplay();
  };

  // ── Legal Framework Accordion ────────────────────────────────
  function renderLegal() {
    const container = document.getElementById("legal-accordion");
    if (!container) return;

    container.innerHTML = D.legalFramework
      .map(
        (item, i) => `
      <div class="legal-item" id="legal-item-${i}">
        <div class="legal-item-header" onclick="toggleLegal(${i})">
          <span class="legal-item-icon">${item.icon}</span>
          <span class="legal-item-title">${item.title}</span>
          <span class="legal-item-chevron">▼</span>
        </div>
        <div class="legal-item-body">
          <div class="legal-item-content">${item.content}</div>
        </div>
      </div>`,
      )
      .join("");

    // Open first by default
    setTimeout(() => toggleLegal(0), 50);
  }

  window.toggleLegal = function (index) {
    const item = document.getElementById(`legal-item-${index}`);
    if (!item) return;
    item.classList.toggle("open");
  };

  // ── Roles Grid ───────────────────────────────────────────────
  function renderRoles() {
    const container = document.getElementById("roles-grid");
    if (!container) return;

    container.innerHTML = D.roles
      .map(
        (role) => `
      <div class="role-card">
        <div class="role-card-header">
          <div class="role-card-avatar" style="background:${role.color}22; color:${role.color}">
            ${role.icon}
          </div>
          <div>
            <div class="role-card-name">${role.name}</div>
            <div class="role-card-desc">${role.description}</div>
          </div>
        </div>
        <div class="role-card-body">
          <ul class="role-list">
            ${role.functions.map((f) => `<li>${f}</li>`).join("")}
          </ul>
          <div class="role-restrictions-title">Restricciones</div>
          ${role.restrictions.map((r) => `<div class="role-restriction">${r}</div>`).join("")}
        </div>
      </div>`,
      )
      .join("");
  }

  // ── States Flow ──────────────────────────────────────────────
  function renderStates() {
    const container = document.getElementById("states-flow");
    if (!container) return;

    container.innerHTML = D.states
      .map(
        (s, i) => `
      <div class="state-card" style="border-color:${s.color}44">
        <div class="state-card-icon">${s.icon}</div>
        <div class="state-card-name" style="color:${s.color}">${s.name}</div>
        <div class="state-card-desc">${s.description}</div>
      </div>
      ${i < D.states.length - 1 ? '<div class="state-arrow">→</div>' : ""}`,
      )
      .join("");
  }

  // ── Architecture Section ─────────────────────────────────────
  function renderArchitecture() {
    const descEl = document.getElementById("arch-description");
    if (descEl) descEl.textContent = D.architecture.description;

    const principlesEl = document.getElementById("arch-principles");
    if (principlesEl) {
      principlesEl.innerHTML = D.architecture.principles
        .map((p) => `<li>${p}</li>`)
        .join("");
    }

    // Helper to build a row of service boxes from a boxes array
    function buildBoxesHTML(boxes) {
      return boxes
        .map(
          (b) => `
        <div class="arch-service-box" style="border-color:${b.color}44; text-align:center">
          <div class="arch-service-icon">${b.icon}</div>
          <div class="arch-service-name">${b.name}</div>
          <div class="arch-service-desc">${b.description}</div>
          <div class="arch-tech-tags">
            ${b.tech.map((t) => `<span class="arch-tech-tag">${t}</span>`).join("")}
          </div>
        </div>`,
        )
        .join("");
    }

    function buildConnectionRow(label) {
      return `<div class="arch-connection-row">
        <span class="arch-connection-arrow">&#8597;</span>
        <span>${label}</span>
        <span class="arch-connection-arrow">&#8597;</span>
      </div>`;
    }

    function buildLayer(label, boxesHTML) {
      return `<div class="arch-layer">
        <div class="arch-layer-label">${label}</div>
        <div class="arch-services-row">${boxesHTML}</div>
      </div>`;
    }

    // Build services HTML for microservices layer
    const servicesHTML = D.architecture.services
      .map(
        (s) => `
      <div class="arch-service-box" style="border-color:${s.color}44">
        <div class="arch-service-icon">${s.icon}</div>
        <div class="arch-service-name">${s.name}</div>
        <div class="arch-service-desc">${s.description}</div>
        <div class="arch-tech-tags">
          ${s.tech.map((t) => `<span class="arch-tech-tag">${t}</span>`).join("")}
        </div>
      </div>`,
      )
      .join("");

    const diagEl = document.getElementById("arch-diagram");
    if (diagEl) {
      const arch = D.architecture;
      diagEl.innerHTML = [
        buildLayer(arch.client.label, buildBoxesHTML(arch.client.boxes)),
        buildConnectionRow(arch.client.connectionLabel),
        buildLayer(arch.gateway.label, buildBoxesHTML(arch.gateway.boxes)),
        buildConnectionRow(arch.gateway.connectionLabel),
        buildLayer(arch.microservicesLabel, servicesHTML),
        buildConnectionRow(arch.microservicesConnectionLabel),
        buildLayer(arch.dataLayer.label, buildBoxesHTML(arch.dataLayer.boxes)),
      ].join("");
    }

    const infraContainer = document.getElementById("arch-infra");
    if (infraContainer) {
      infraContainer.innerHTML = D.architecture.infrastructure
        .map(
          (item) => `
        <div class="infra-card">
          <div class="infra-card-icon">${item.icon}</div>
          <div class="infra-card-name">${item.name}</div>
          <div class="infra-card-role">${item.role}</div>
        </div>`,
        )
        .join("");
    }
  }

  // ── Security Section ─────────────────────────────────────────
  function renderSecurity() {
    const container = document.getElementById("security-grid");
    if (!container) return;

    container.innerHTML = D.security
      .map(
        (item) => `
      <div class="security-card">
        <div class="security-card-icon">${item.icon}</div>
        <div>
          <div class="security-card-title">${item.measure}</div>
          <div class="security-card-desc">${item.description}</div>
        </div>
      </div>`,
      )
      .join("");
  }

  // ── Links Section ─────────────────────────────────────────────
  function renderLinks() {
    const container = document.getElementById("links-grid");
    if (!container) return;

    const links = [
      D.links.jira,
      D.links.figma,
      D.links.repoPlanning,
      D.links.repoWork,
      D.links.repoFrontend,
    ].filter(Boolean);

    if (Array.isArray(D.links.repoBackend)) {
      links.push(...D.links.repoBackend.filter(Boolean));
    }

    container.innerHTML = links
      .map(
        (link) => `
      <a class="link-card" href="${link.url}" target="_blank" rel="noopener noreferrer">
        <div class="link-card-icon">${link.icon}</div>
        <div class="link-card-label">${link.label}</div>
        <div class="link-card-desc">${link.description}</div>
        <div class="link-card-url">${link.url}</div>
      </a>`,
      )
      .join("");
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    renderHero();
    renderDescription();
    renderCarousel();
    renderLegal();
    renderRoles();
    renderStates();
    renderArchitecture();
    renderSecurity();
    renderLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
