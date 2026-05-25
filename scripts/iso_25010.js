/**
 * iso_25010.js — Marco de Calidad ISO 25010 · Pico Botella
 * -----------------------------------------------------
 * Renderiza dinámicamente el contenido del marco ISO/IEC 25010:2011
 * desde el módulo de datos iso_25010_data.js.
 *
 * Principios aplicados (Pressman & Maxim, cap. 8-10):
 *  - Independencia funcional: cada función tiene una responsabilidad única.
 *  - Ocultamiento de información: la estructura DOM es desconocida para las
 *    funciones de datos; solo interactúan mediante IDs definidos.
 *  - Defensa en profundidad: escape de HTML en todo contenido dinámico.
 *  - Accesibilidad: atributos ARIA en acordeones y tabla de resumen.
 *
 * @module iso_25010
 */

'use strict';

// ============================================================
// Estado de la aplicación
// ============================================================
const isoState = {
  currentTheme: 'light',
  /** @type {Set<string>} IDs de acordeones abiertos */
  openAccordions: new Set(),
};

// ============================================================
// Mapas de configuración
// ============================================================

/** Clases CSS según nivel de prioridad */
const PRIORITY_CLASS = {
  critical: 'priority-critical',
  high:     'priority-high',
  medium:   'priority-medium',
  low:      'priority-low',
};

// ============================================================
// Utilidades DOM
// ============================================================

/**
 * Obtiene un elemento del DOM por ID; lanza advertencia si no existe.
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function getEl(id) {
  const el = document.getElementById(id);
  if (!el) console.warn(`[iso_25010] Elemento no encontrado: #${id}`);
  return el;
}

/**
 * Escapa caracteres HTML para prevenir XSS.
 * @param {string} str
 * @returns {string}
 */
function escHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================
// Renderizado — Sección introductoria
// ============================================================

/**
 * Renderiza la cabecera introductoria con metadatos del estándar.
 */
function renderIntro() {
  const container = getEl('iso-intro');
  if (!container) return;

  const { meta } = ISO_25010_DATA;
  const total = ISO_25010_DATA.categories.length;

  container.innerHTML = `
    <div class="intro-badge-row">
      <span class="intro-badge">${escHtml(meta.standard)}</span>
    </div>
    <h2 class="intro-title">${escHtml(meta.title)}</h2>
    <p class="intro-subtitle">${escHtml(meta.subtitle)}</p>
    <p class="intro-description">${escHtml(meta.description)}</p>
    <ul class="intro-meta-list" role="list">
      <li class="intro-meta-item">
        <span class="meta-label">Norma</span>
        <span class="meta-value">${escHtml(meta.standard)}</span>
      </li>
      <li class="intro-meta-item">
        <span class="meta-label">Alcance</span>
        <span class="meta-value">${escHtml(meta.scope)}</span>
      </li>
      <li class="intro-meta-item">
        <span class="meta-label">Características</span>
        <span class="meta-value">${total} características de calidad</span>
      </li>
    </ul>
  `;
}

// ============================================================
// Renderizado — Tabla de resumen
// ============================================================

/**
 * Construye una fila <tr> para la tabla de resumen.
 * @param {Object} cat - Categoría de ISO_25010_DATA.categories
 * @param {number} index - Índice (0-based)
 * @returns {string}
 */
function buildSummaryRow(cat, index) {
  const priClass = PRIORITY_CLASS[cat.priorityLevel] || 'priority-low';
  const shortSummary = cat.summary.length > 90
    ? `${escHtml(cat.summary.slice(0, 90))}…`
    : escHtml(cat.summary);

  return `
    <tr>
      <td class="cell-index">${String(index + 1).padStart(2, '0')}</td>
      <td>
        <a href="#cat-${escHtml(cat.id)}" class="table-link">
          ${escHtml(cat.name)}
        </a>
      </td>
      <td class="cell-subs">${cat.subcategories.length}</td>
      <td>
        <span class="priority-badge ${priClass}">
          ${escHtml(cat.priority)}
        </span>
      </td>
      <td class="cell-summary">${shortSummary}</td>
    </tr>
  `;
}

/**
 * Renderiza la tabla de resumen de las 8 características.
 */
function renderSummaryTable() {
  const container = getEl('iso-summary-table');
  if (!container) return;

  const rows = ISO_25010_DATA.categories
    .map((cat, i) => buildSummaryRow(cat, i))
    .join('');

  container.innerHTML = `
    <table class="summary-table" role="table"
           aria-label="Resumen de características ISO 25010">
      <thead>
        <tr>
          <th scope="col" class="cell-index">#</th>
          <th scope="col">Característica</th>
          <th scope="col" class="cell-subs" title="Número de subcategorías">Sub.</th>
          <th scope="col">Prioridad</th>
          <th scope="col" class="cell-summary">Descripción breve</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

// ============================================================
// Renderizado — Acordeones de categorías
// ============================================================

/**
 * Construye el HTML de una subcategoría como acordeón.
 * @param {string} catId
 * @param {Object} sub
 * @param {number} index
 * @returns {string}
 */
function buildSubcategoryAccordion(catId, sub, index) {
  const aId   = `${catId}-${sub.id}`;
  const hId   = `h-${aId}`;
  const cId   = `c-${aId}`;
  const numStr = String(index + 1).padStart(2, '0');

  return `
    <div class="subcategory-item">
      <button
        class="accordion-btn"
        id="${escHtml(hId)}"
        type="button"
        aria-expanded="false"
        aria-controls="${escHtml(cId)}"
        onclick="isoToggleAccordion('${escHtml(aId)}')"
      >
        <span class="acc-num">${numStr}</span>
        <span class="acc-name">${escHtml(sub.name)}</span>
        <span class="acc-arrow" aria-hidden="true">▾</span>
      </button>
      <div
        class="accordion-panel"
        id="${escHtml(cId)}"
        role="region"
        aria-labelledby="${escHtml(hId)}"
        hidden
      >
        <div class="panel-body">
          <div class="panel-section">
            <h5 class="panel-section-title">Definición ISO</h5>
            <p>${escHtml(sub.definition)}</p>
          </div>
          <div class="panel-section panel-application">
            <h5 class="panel-section-title">Aplicación en Pico Botella</h5>
            <p>${escHtml(sub.application)}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Construye el HTML completo de una tarjeta de categoría.
 * @param {Object} cat
 * @returns {string}
 */
function buildCategoryCard(cat) {
  const priClass   = PRIORITY_CLASS[cat.priorityLevel] || 'priority-low';
  const subcatHtml = cat.subcategories
    .map((sub, i) => buildSubcategoryAccordion(cat.id, sub, i))
    .join('');

  return `
    <article
      class="category-card"
      id="cat-${escHtml(cat.id)}"
      aria-label="Categoría: ${escHtml(cat.name)}"
    >
      <header class="category-header">
        <div class="category-header-left">
          <span class="priority-badge ${priClass}">${escHtml(cat.priority)}</span>
          <h3 class="category-name">${escHtml(cat.name)}</h3>
        </div>
        <span class="category-sub-count" aria-label="${cat.subcategories.length} subcategorías">
          ${cat.subcategories.length} sub.
        </span>
      </header>
      <p class="category-summary">${escHtml(cat.summary)}</p>
      <div class="subcategories-wrapper">
        ${subcatHtml}
      </div>
    </article>
  `;
}

/**
 * Renderiza todas las tarjetas de categorías con sus acordeones.
 */
function renderCategories() {
  const container = getEl('iso-categories');
  if (!container) return;
  container.innerHTML = ISO_25010_DATA.categories
    .map(buildCategoryCard)
    .join('');
}

// ============================================================
// Interactividad — Acordeones
// ============================================================

/**
 * Alterna apertura/cierre de un acordeón de subcategoría.
 * Expuesto globalmente para ser invocado desde atributos onclick.
 * @param {string} accordionId
 */
function isoToggleAccordion(accordionId) {
  const btn   = document.getElementById(`h-${accordionId}`);
  const panel = document.getElementById(`c-${accordionId}`);
  if (!btn || !panel) return;

  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isOpen));
  panel.hidden = isOpen;

  if (isOpen) {
    isoState.openAccordions.delete(accordionId);
    btn.querySelector('.acc-arrow').textContent = '▾';
  } else {
    isoState.openAccordions.add(accordionId);
    btn.querySelector('.acc-arrow').textContent = '▴';
  }
}

// ============================================================
// Gestión de tema
// ============================================================

/** Carga el tema guardado en localStorage */
function loadTheme() {
  const saved = localStorage.getItem('picobotella-theme') || 'light';
  isoState.currentTheme = saved;
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeBtn();
}

/** Alterna entre tema claro y oscuro */
function toggleTheme() {
  isoState.currentTheme = isoState.currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', isoState.currentTheme);
  localStorage.setItem('picobotella-theme', isoState.currentTheme);
  updateThemeBtn();
}

/** Actualiza el texto del botón de tema */
function updateThemeBtn() {
  const icon = document.querySelector('#theme-toggle .theme-icon');
  if (icon) icon.textContent = isoState.currentTheme === 'light' ? 'Oscuro' : 'Claro';
}

// ============================================================
// Inicialización
// ============================================================

/**
 * Punto de entrada: ejecuta todos los renderizadores en orden.
 * Guarda compatibilidad con DOMContentLoaded y ejecución tardía.
 */
function isoInit() {
  if (typeof ISO_25010_DATA === 'undefined') {
    console.error('[iso_25010] Variable ISO_25010_DATA no encontrada. Verifica que iso_25010_data.js se cargó antes que este script.');
    return;
  }
  try {
    loadTheme();
    renderIntro();
    renderSummaryTable();
    renderCategories();

    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);
  } catch (err) {
    console.error('[iso_25010] Error en la inicialización:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', isoInit);
} else {
  isoInit();
}
