// lineamientos.js
// Render de lineamientos para Pico Botella

(function () {
  "use strict";

  function el(id) {
    return document.getElementById(id);
  }

  function esc(value) {
    if (typeof value !== "string") return "";
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderHeader() {
    const data = typeof PROJECT_CONFIG !== "undefined" ? PROJECT_CONFIG : {};
    const title = el("header-title");
    const subtitle = el("header-subtitle");
    const logo = el("header-logo");
    if (title) title.textContent = data.title || data.shortName || "Pico Botella";
    if (subtitle) subtitle.textContent = data.subtitle || "Proyecto movil del curso Dispositivos Moviles";
    if (logo) {
      logo.src = data.logoSrc || "../pico-botella-icon.svg";
      logo.alt = data.logoAlt || "Pico Botella";
    }
  }

  function renderHero() {
    const hero = el("lineamientos-hero");
    if (!hero) return;
    hero.innerHTML = `
      <h1 class="lineamientos-title">${esc(LINEAMIENTOS_DATA.meta.title)}</h1>
      <p class="lineamientos-subtitle">${esc(LINEAMIENTOS_DATA.meta.subtitle)}</p>
      <p class="lineamientos-subtitle">Versión ${esc(LINEAMIENTOS_DATA.meta.version)}</p>
    `;
  }

  function renderSections() {
    const container = el("lineamientos-grid");
    if (!container) return;
    container.innerHTML = LINEAMIENTOS_DATA.sections
      .map((section) => {
        const items = section.items
          .map((item) => `<li>${esc(item)}</li>`)
          .join("");
        return `
          <article class="lineamientos-card">
            <h2>${esc(section.title)}</h2>
            <ul class="lineamientos-list">${items}</ul>
          </article>
        `;
      })
      .join("");
  }

  function renderNote() {
    const note = el("lineamientos-note");
    if (!note) return;
    note.textContent = LINEAMIENTOS_DATA.overview;
  }

  function init() {
    if (typeof LINEAMIENTOS_DATA === "undefined") return;
    renderHeader();
    renderHero();
    renderSections();
    renderNote();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
