/**
 * design_patterns.js — Patrones de Diseño · Pico Botella
 * ---------------------------------------------------
 * Renderiza dinámicamente el catálogo de patrones de diseño
 * desde el módulo de datos design_patterns_data.js.
 *
 * Principios aplicados (Pressman & Maxim, cap. 8-10):
 *  - Independencia funcional: cada función renderiza una sola sección.
 *  - Ocultamiento de información: los IDs del DOM son la única interfaz
 *    entre el script y el HTML.
 *  - Defensa en profundidad: escape de HTML para todo contenido dinámico.
 *  - Accesibilidad: roles ARIA en acordeones y navegación del índice.
 *
 * @module design_patterns
 */

'use strict';

// ============================================================
// Estado de la aplicación
// ============================================================
const dpState = {
  currentTheme: 'light',
  /** @type {Set<string>} Claves de patrones abiertos */
  openPatterns: new Set(),
};

// ============================================================
// Mapa de clases de color por categoría
// ============================================================

/** Retorna clases CSS según el código de color de la categoría */
const COLOR_MAP = {
  indigo:  { toc: 'toc-indigo',  card: 'card-indigo',  type: 'type-indigo'  },
  amber:   { toc: 'toc-amber',   card: 'card-amber',   type: 'type-amber'   },
  emerald: { toc: 'toc-emerald', card: 'card-emerald', type: 'type-emerald' },
  rose:    { toc: 'toc-rose',    card: 'card-rose',    type: 'type-rose'    },
  violet:  { toc: 'toc-violet',  card: 'card-violet',  type: 'type-violet'  },
};

// ============================================================
// Utilidades DOM
// ============================================================

/**
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function dpGetEl(id) {
  const el = document.getElementById(id);
  if (!el) console.warn(`[design_patterns] Elemento no encontrado: #${id}`);
  return el;
}

/**
 * Previene XSS escapando caracteres especiales HTML.
 * @param {string} str
 * @returns {string}
 */
function dpEsc(str) {
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
 * Inyecta el bloque de título y descripción del módulo.
 */
function dpRenderIntro() {
  const container = dpGetEl('dp-intro');
  if (!container) return;

  const { meta } = DESIGN_PATTERNS_DATA;
  const catCount     = DESIGN_PATTERNS_DATA.categories.length;
  const patternCount = DESIGN_PATTERNS_DATA.categories
    .reduce((sum, c) => sum + c.patterns.length, 0);

  container.innerHTML = `
    <div class="dp-intro-badge-row">
      <span class="dp-intro-badge">Diseño de Software</span>
    </div>
    <h2 class="dp-intro-title">${dpEsc(meta.title)}</h2>
    <p class="dp-intro-subtitle">${dpEsc(meta.subtitle)}</p>
    <p class="dp-intro-description">${dpEsc(meta.description)}</p>
    <ul class="dp-intro-stats" role="list">
      <li class="dp-stat-item">
        <span class="dp-stat-value">${catCount}</span>
        <span class="dp-stat-label">Categorías</span>
      </li>
      <li class="dp-stat-item">
        <span class="dp-stat-value">${patternCount}</span>
        <span class="dp-stat-label">Patrones</span>
      </li>
    </ul>
  `;
}

// ============================================================
// Renderizado — Índice de categorías (TOC)
// ============================================================

/**
 * Construye una tarjeta del índice de navegación de categorías.
 * @param {Object} cat
 * @returns {string}
 */
function buildTocCard(cat) {
  const colors = COLOR_MAP[cat.color] || COLOR_MAP.indigo;
  return `
    <a href="#dp-cat-${dpEsc(cat.id)}" class="toc-card ${colors.toc}">
      <span class="toc-card-name">${dpEsc(cat.name)}</span>
      <span class="toc-card-count">${cat.patterns.length} patrón${cat.patterns.length !== 1 ? 'es' : ''}</span>
    </a>
  `;
}

/**
 * Renderiza el índice rápido de categorías de patrones.
 */
function dpRenderToc() {
  const container = dpGetEl('dp-toc');
  if (!container) return;
  container.innerHTML = `
    <h2 class="section-title">Índice de Categorías</h2>
    <nav class="toc-grid" aria-label="Índice de categorías de patrones">
      ${DESIGN_PATTERNS_DATA.categories.map(buildTocCard).join('')}
    </nav>
  `;
}

// ============================================================
// Renderizado — Categorías con patrones
// ============================================================

/**
 * Construye la lista de beneficios de un patrón.
 * @param {string[]} benefits
 * @returns {string}
 */
function buildBenefitsList(benefits) {
  if (!benefits || !benefits.length) return '';
  const items = benefits.map(b => `<li>${dpEsc(b)}</li>`).join('');
  return `
    <div class="pattern-section">
      <h5 class="pattern-section-title">Beneficios</h5>
      <ul class="pattern-benefits">${items}</ul>
    </div>
  `;
}

/**
 * Construye el acordeón de un patrón individual.
 * @param {Object} pattern
 * @param {string} catId
 * @param {string} typeClass
 * @returns {string}
 */
function buildPatternAccordion(pattern, catId, typeClass) {
  const key  = `${catId}-${pattern.id}`;
  const hId  = `ph-${key}`;
  const cId  = `pc-${key}`;

  return `
    <div class="pattern-accordion">
      <button
        class="pattern-btn"
        id="${dpEsc(hId)}"
        type="button"
        aria-expanded="false"
        aria-controls="${dpEsc(cId)}"
        onclick="dpTogglePattern('${dpEsc(key)}')"
      >
        <div class="pattern-btn-left">
          <span class="pattern-type ${typeClass}">${dpEsc(pattern.type)}</span>
          <span class="pattern-name">${dpEsc(pattern.name)}</span>
        </div>
        <span class="pattern-arrow" aria-hidden="true">▾</span>
      </button>
      <div
        class="pattern-panel"
        id="${dpEsc(cId)}"
        role="region"
        aria-labelledby="${dpEsc(hId)}"
        hidden
      >
        <div class="pattern-panel-body">
          <div class="pattern-section pattern-intent">
            <h5 class="pattern-section-title">Intención</h5>
            <p>${dpEsc(pattern.intent)}</p>
          </div>
          <div class="pattern-section pattern-problem">
            <h5 class="pattern-section-title">Problema que resuelve</h5>
            <p>${dpEsc(pattern.problem)}</p>
          </div>
          <div class="pattern-section pattern-solution">
            <h5 class="pattern-section-title">Solución en Pico Botella</h5>
            <p>${dpEsc(pattern.solution)}</p>
          </div>
          ${buildBenefitsList(pattern.benefits)}
          ${pattern.relatedFiles && pattern.relatedFiles.length
            ? `<div class="pattern-section pattern-related">
                <h5 class="pattern-section-title">Archivos relacionados</h5>
                <ul class="pattern-related-list">
                  ${pattern.relatedFiles.map(f => `<li><code>${dpEsc(f)}</code></li>`).join('')}
                </ul>
               </div>`
            : ''}
        </div>
      </div>
    </div>
  `;
}

/**
 * Construye el bloque completo de una categoría.
 * @param {Object} cat
 * @returns {string}
 */
function buildCategoryBlock(cat) {
  const colors   = COLOR_MAP[cat.color] || COLOR_MAP.indigo;
  const patterns = cat.patterns
    .map(p => buildPatternAccordion(p, cat.id, colors.type))
    .join('');

  return `
    <section
      class="dp-category-block ${colors.card}"
      id="dp-cat-${dpEsc(cat.id)}"
      aria-label="Categoría: ${dpEsc(cat.name)}"
    >
      <header class="dp-category-header">
        <div class="dp-category-header-left">
          <h3 class="dp-category-name">${dpEsc(cat.name)}</h3>
          <span class="dp-category-count">
            ${cat.patterns.length} patrón${cat.patterns.length !== 1 ? 'es' : ''}
          </span>
        </div>
        <a href="#dp-toc" class="dp-back-toc" title="Volver al índice">↑ Índice</a>
      </header>
      <p class="dp-category-description">${dpEsc(cat.description)}</p>
      <div class="dp-patterns-list">
        ${patterns}
      </div>
    </section>
  `;
}

/**
 * Renderiza todas las categorías en #dp-categories.
 */
function dpRenderCategories() {
  const container = dpGetEl('dp-categories');
  if (!container) return;
  container.innerHTML = DESIGN_PATTERNS_DATA.categories
    .map(buildCategoryBlock)
    .join('');
}

// ============================================================
// Interactividad — Acordeones de patrones
// ============================================================

/**
 * Alterna la apertura/cierre de la tarjeta de un patrón.
 * Expuesto globalmente para uso en atributos onclick.
 * @param {string} key - Clave única del patrón (catId-patternId)
 */
function dpTogglePattern(key) {
  const btn   = document.getElementById(`ph-${key}`);
  const panel = document.getElementById(`pc-${key}`);
  if (!btn || !panel) return;

  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isOpen));
  panel.hidden = isOpen;

  const arrow = btn.querySelector('.pattern-arrow');
  if (arrow) arrow.textContent = isOpen ? '▾' : '▴';

  if (isOpen) {
    dpState.openPatterns.delete(key);
  } else {
    dpState.openPatterns.add(key);
  }
}

// ============================================================
// Gestión de tema
// ============================================================

function dpLoadTheme() {
  const saved = localStorage.getItem('picobotella-theme') || 'light';
  dpState.currentTheme = saved;
  document.documentElement.setAttribute('data-theme', saved);
  dpUpdateThemeBtn();
}

function dpToggleTheme() {
  dpState.currentTheme = dpState.currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', dpState.currentTheme);
  localStorage.setItem('picobotella-theme', dpState.currentTheme);
  dpUpdateThemeBtn();
}

function dpUpdateThemeBtn() {
  const icon = document.querySelector('#theme-toggle .theme-icon');
  if (icon) icon.textContent = dpState.currentTheme === 'light' ? 'Oscuro' : 'Claro';
}

// ============================================================
// Inicialización
// ============================================================

/**
 * Punto de entrada del módulo.
 * Valida dependencias y ejecuta los renderizadores en orden.
 */
function dpInit() {
  if (typeof DESIGN_PATTERNS_DATA === 'undefined') {
    console.error('[design_patterns] Variable DESIGN_PATTERNS_DATA no encontrada. Verifica que design_patterns_data.js se cargó antes que este script.');
    return;
  }
  try {
    dpLoadTheme();
    dpRenderIntro();
    dpRenderToc();
    dpRenderCategories();

    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', dpToggleTheme);
  } catch (err) {
    console.error('[design_patterns] Error en la inicialización:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', dpInit);
} else {
  dpInit();
}
