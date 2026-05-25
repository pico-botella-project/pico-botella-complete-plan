/**
 * Visualizador de Mapa de Sitio - Finanz
 * @description Aplicación para visualizar la estructura del sitio
 */

// ==================== Estado de la aplicación ====================
const state = {
  currentTheme: "light",
  expandedZones: new Set(),
};

// ==================== Elementos del DOM ====================
const elements = {
  themeToggle: document.getElementById("theme-toggle"),
  badgeLegend: document.getElementById("badge-legend"),
  siteTreeContainer: document.getElementById("site-tree-container"),
  loading: document.getElementById("loading"),
  errorState: document.getElementById("error-state"),
  errorMessage: document.getElementById("error-message"),
  expandAll: document.getElementById("expandAll"),
  collapseAll: document.getElementById("collapseAll"),
  siteDescription: document.getElementById("site-description"),
};

// ==================== Inicialización ====================
/**
 * Inicializa la aplicación
 */
function init() {
  console.log("Iniciando aplicación de mapa de sitio...");
  try {
    loadTheme();
    setupEventListeners();
    loadSiteMap();
    console.log("Aplicación inicializada correctamente");
  } catch (error) {
    console.error("Error al inicializar:", error);
    showError("Error al inicializar la aplicación: " + error.message);
  }
}

/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
  console.log("Configurando event listeners...");

  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.expandAll.addEventListener("click", expandAllZones);
  elements.collapseAll.addEventListener("click", collapseAllZones);

  console.log("Event listeners configurados");
}

// ==================== Gestión de tema ====================
/**
 * Carga el tema guardado del localStorage
 */
function loadTheme() {
  const savedTheme = localStorage.getItem("picobotella-theme") || "light";
  state.currentTheme = savedTheme;
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon();
}

/**
 * Alterna entre tema claro y oscuro
 */
function toggleTheme() {
  state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", state.currentTheme);
  localStorage.setItem("picobotella-theme", state.currentTheme);
  updateThemeIcon();
}

/**
 * Actualiza el icono del botón de tema
 */
function updateThemeIcon() {
  const icon = elements.themeToggle.querySelector(".theme-icon");
  icon.textContent = state.currentTheme === "light" ? "Oscuro" : "Claro";
}

// ==================== Carga de datos ====================
/**
 * Carga el mapa de sitio
 */
function loadSiteMap() {
  console.log("Cargando mapa de sitio...");
  showLoading();

  try {
    // Verificar que SITE_MAP_DATA existe
    if (typeof SITE_MAP_DATA === "undefined") {
      throw new Error("No se encontraron los datos del mapa de sitio");
    }

    // Actualizar descripción
    if (elements.siteDescription && SITE_MAP_DATA.subtitle) {
      elements.siteDescription.textContent = SITE_MAP_DATA.subtitle;
    }

    // Renderizar badges
    renderBadges();

    // Renderizar árbol del sitio
    renderSiteTree();

    hideLoading();
    console.log("Mapa de sitio cargado correctamente");
  } catch (error) {
    showError(error.message);
    console.error("Error cargando mapa de sitio:", error);
  }
}

/**
 * Muestra el estado de carga
 */
function showLoading() {
  elements.loading.hidden = false;
  elements.errorState.hidden = true;
  elements.siteTreeContainer.innerHTML = "";
}

/**
 * Oculta el estado de carga
 */
function hideLoading() {
  elements.loading.hidden = true;
}

/**
 * Muestra un mensaje de error
 * @param {string} message - Mensaje de error
 */
function showError(message) {
  elements.loading.hidden = true;
  elements.errorState.hidden = false;
  elements.errorMessage.textContent = message;
}

// ==================== Renderizado ====================
/**
 * Renderiza los badges de leyenda
 */
function renderBadges() {
  if (!SITE_MAP_DATA.badges || !elements.badgeLegend) return;

  const badgesHTML = SITE_MAP_DATA.badges
    .map(
      (badge) => `
    <span class="badge badge-${badge.type}">${escapeHtml(badge.label)}</span>
  `
    )
    .join("");

  elements.badgeLegend.innerHTML = badgesHTML;
}

/**
 * Renderiza el árbol del mapa de sitio
 */
function renderSiteTree() {
  if (!SITE_MAP_DATA.zones) return;

  const treeHTML = SITE_MAP_DATA.zones
    .map((zone, index) => createZoneHTML(zone, index))
    .join("");

  elements.siteTreeContainer.innerHTML = `<div class="tree-root">${treeHTML}</div>`;

  // Agregar event listeners a los toggles
  document.querySelectorAll(".zone-toggle").forEach((toggle) => {
    toggle.addEventListener("click", handleZoneToggle);
  });
}

/**
 * Crea el HTML de una zona
 * @param {Object} zone - Objeto de zona
 * @param {number} index - Índice de la zona
 * @returns {string} HTML de la zona
 */
function createZoneHTML(zone, index) {
  const isExpanded = zone.expanded;
  const zoneId = zone.id || `zone-${index}`;

  if (isExpanded) {
    state.expandedZones.add(zoneId);
  }

  const pagesHTML = zone.pages.map((page) => createPageHTML(page)).join("");

  return `
    <div class="zone-container" data-zone-id="${zoneId}">
      <div class="zone-header">
        <button
          class="zone-toggle"
          data-zone-id="${zoneId}"
          aria-expanded="${isExpanded}"
          aria-label="${isExpanded ? "Colapsar" : "Expandir"} ${escapeHtml(
    zone.name
  )}"
        >
          ${isExpanded ? "▾" : "▸"}
        </button>
        <div class="zone-info">
          <h2 class="zone-name">${escapeHtml(zone.name)}</h2>
          <p class="zone-description">${escapeHtml(zone.description)}</p>
        </div>
      </div>
      <div class="zone-pages" ${isExpanded ? "" : 'style="display: none;"'}>
        ${pagesHTML}
      </div>
    </div>
  `;
}

/**
 * Crea el HTML de una página
 * @param {Object} page - Objeto de página
 * @returns {string} HTML de la página
 */
function createPageHTML(page) {
  return `
    <div class="page-card page-${page.type}">
      <h3 class="page-name">${escapeHtml(page.name)}</h3>
      <p class="page-description">${escapeHtml(page.description)}</p>
    </div>
  `;
}

// ==================== Interacciones ====================
/**
 * Maneja el toggle de una zona
 * @param {Event} e - Evento
 */
function handleZoneToggle(e) {
  const button = e.currentTarget;
  const zoneId = button.getAttribute("data-zone-id");
  const zoneContainer = document.querySelector(
    `.zone-container[data-zone-id="${zoneId}"]`
  );

  if (!zoneContainer) return;

  const pagesContainer = zoneContainer.querySelector(".zone-pages");
  const isExpanded = button.getAttribute("aria-expanded") === "true";

  if (isExpanded) {
    // Colapsar
    pagesContainer.style.display = "none";
    button.setAttribute("aria-expanded", "false");
    button.textContent = "▸";
    state.expandedZones.delete(zoneId);
  } else {
    // Expandir
    pagesContainer.style.display = "block";
    button.setAttribute("aria-expanded", "true");
    button.textContent = "▾";
    state.expandedZones.add(zoneId);
  }
}

/**
 * Expande todas las zonas
 */
function expandAllZones() {
  document.querySelectorAll(".zone-toggle").forEach((toggle) => {
    const zoneId = toggle.getAttribute("data-zone-id");
    const zoneContainer = document.querySelector(
      `.zone-container[data-zone-id="${zoneId}"]`
    );
    const pagesContainer = zoneContainer?.querySelector(".zone-pages");

    if (pagesContainer) {
      pagesContainer.style.display = "block";
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = "▾";
      state.expandedZones.add(zoneId);
    }
  });
}

/**
 * Colapsa todas las zonas
 */
function collapseAllZones() {
  document.querySelectorAll(".zone-toggle").forEach((toggle) => {
    const zoneId = toggle.getAttribute("data-zone-id");
    const zoneContainer = document.querySelector(
      `.zone-container[data-zone-id="${zoneId}"]`
    );
    const pagesContainer = zoneContainer?.querySelector(".zone-pages");

    if (pagesContainer) {
      pagesContainer.style.display = "none";
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "▸";
      state.expandedZones.delete(zoneId);
    }
  });
}

// ==================== Utilidades ====================
/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ==================== Inicio de la aplicación ====================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
