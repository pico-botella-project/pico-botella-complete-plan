/**
 * index.js - Pagina Principal Pico Botella
 * ----------------------------------------
 * Renderiza la pantalla de inicio a partir de INDEX_DATA (index_data.js).
 * No contiene strings de contenido: toda la informacion reside en el
 * modulo de datos, siguiendo el principio de separacion de preocupaciones
 * (Pressman & Maxim, Software Engineering: A Practitioner Approach, cap. 8.2).
 *
 * @module index
 */

"use strict";

// ============================================================
// Estado
// ============================================================
const indexState = {
  currentTheme: "light",
};

// ============================================================
// Utilidades DOM
// ============================================================

function idxEl(id) {
  return document.getElementById(id);
}

function idxEsc(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================
// Renderizado - Cabecera
// ============================================================

function renderHeader() {
  const logoImg = idxEl("header-logo");
  const title = idxEl("header-title");
  const sub = idxEl("header-subtitle");
  if (!logoImg || !title || !sub) return;
  const headerConfig =
    typeof PROJECT_CONFIG !== "undefined" ? PROJECT_CONFIG : INDEX_DATA.header;
  logoImg.src = idxEsc(headerConfig.logoSrc || "pico-botella-icon.svg");
  logoImg.alt = idxEsc(headerConfig.logoAlt || "Pico Botella");
  title.textContent = headerConfig.title || headerConfig.shortName || headerConfig.projectName || "Pico Botella";
  sub.textContent = headerConfig.subtitle || "Plantilla de planeación para proyecto de software";
}

// ============================================================
// Renderizado - Bienvenida
// ============================================================

function renderWelcome() {
  const titleEl = idxEl("welcome-title");
  const descEl = idxEl("welcome-description");
  if (!titleEl || !descEl) return;
  titleEl.textContent = INDEX_DATA.welcome.title;
  descEl.textContent = INDEX_DATA.welcome.description;
}

// ============================================================
// Renderizado - Cuadricula de navegacion
// ============================================================

function buildNavCard(card) {
  return (
    '<a href="' +
    idxEsc(card.href) +
    '" class="nav-card" aria-label="' +
    idxEsc(card.title) +
    '">' +
    '<div class="nav-card-header">' +
    '<div class="nav-card-icon ' +
    idxEsc(card.icon) +
    '" aria-hidden="true"></div>' +
    '<h3 class="nav-card-title">' +
    idxEsc(card.title) +
    "</h3>" +
    "</div>" +
    '<p class="nav-card-description">' +
    idxEsc(card.description) +
    "</p>" +
    '<span class="nav-card-arrow" aria-hidden="true">&#8594;</span>' +
    "</a>"
  );
}

function renderNavGrid() {
  const grid = idxEl("navigation-grid");
  if (!grid) return;
  grid.innerHTML = INDEX_DATA.navCards.map(buildNavCard).join("");
}

// ============================================================
// Renderizado - Pie de pagina
// ============================================================

function renderFooter() {
  const footer = document.querySelector(".footer");
  if (!footer) return;
  const c = footer.querySelector(".container") || footer;
  c.innerHTML = INDEX_DATA.footer.lines
    .map(function (line) {
      return "<p>" + idxEsc(line) + "</p>";
    })
    .join("");
}

// ============================================================
// Gestion de tema
// ============================================================

function indexLoadTheme() {
  const saved = localStorage.getItem("picobotella-theme") || "light";
  indexState.currentTheme = saved;
  document.documentElement.setAttribute("data-theme", saved);
  indexUpdateThemeBtn();
}

function indexToggleTheme() {
  indexState.currentTheme =
    indexState.currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", indexState.currentTheme);
  localStorage.setItem("picobotella-theme", indexState.currentTheme);
  indexUpdateThemeBtn();
}

function indexUpdateThemeBtn() {
  const icon = document.querySelector("#theme-toggle .theme-icon");
  if (icon)
    icon.textContent = indexState.currentTheme === "light" ? "Oscuro" : "Claro";
}

// ============================================================
// Inicializacion
// ============================================================

function indexInit() {
  if (typeof INDEX_DATA === "undefined") {
    console.error(
      "[index] INDEX_DATA no encontrado. Verifica que index_data.js se cargo antes que index.js.",
    );
    return;
  }
  try {
    indexLoadTheme();
    renderHeader();
    renderWelcome();
    renderNavGrid();
    renderFooter();
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", indexToggleTheme);
  } catch (err) {
    console.error("[index] Error en la inicializacion:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", indexInit);
} else {
  indexInit();
}
