/**
 * Visualizador de Historias de Usuario - Pico Botella
 * @description Aplicación para visualizar y filtrar historias de usuario del proyecto
 */

// ==================== Estado de la aplicación ====================
const state = {
  currentProject: "picobotella",
  allStories: [],
  filteredStories: [],
  currentTheme: "light",
  epics: new Set(),
  sprintTotals: {},
  sprintCapacity: 0,
};

// ==================== Constantes ====================
const PROJECTS = {
  picobotella: {
    name: "Pico Botella",
  },
};

// ==================== Elementos del DOM ====================
const elements = {
  themeToggle: document.getElementById("theme-toggle"),
  searchInput: document.getElementById("search-input"),
  epicFilter: document.getElementById("epic-filter"),
  sprintFilter: document.getElementById("sprint-filter"),
  storiesContainer: document.getElementById("stories-container"),
  emptyState: document.getElementById("empty-state"),
  errorState: document.getElementById("error-state"),
  errorMessage: document.getElementById("error-message"),
  retryButton: document.getElementById("retry-button"),
  totalStories: document.getElementById("total-stories"),
  visibleStories: document.getElementById("visible-stories"),
  modal: document.getElementById("modal"),
  modalContent: document.getElementById("modal-content"),
  modalOverlay: document.getElementById("modal-overlay"),
};

// ==================== Inicialización ====================
/**
 * Inicializa la aplicación
 */
function init() {
  console.log("Iniciando aplicación...");
  try {
    loadTheme();
    setupEventListeners();
    loadStories();
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
  elements.searchInput.addEventListener("input", debounce(handleSearch, 300));
  elements.epicFilter.addEventListener("change", handleEpicFilter);
  elements.sprintFilter.addEventListener("change", handleSprintFilter);
  elements.retryButton.addEventListener("click", loadStories);

  // Jira export button
  const jiraBtn = document.getElementById("jira-export-btn");
  if (jiraBtn) jiraBtn.addEventListener("click", exportToJiraCSV);

  // Event listeners del modal
  elements.modalOverlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !elements.modal.hidden) {
      closeModal();
    }
  });

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
 * Carga las historias del proyecto actual
 */
function loadStories() {
  console.log("Cargando historias del proyecto:", state.currentProject);

  try {
    // Usar datos embebidos en lugar de fetch
    if (
      typeof EMBEDDED_DATA === "undefined" ||
      !EMBEDDED_DATA[state.currentProject]
    ) {
      throw new Error("No se encontraron datos para el proyecto seleccionado");
    }

    const data = EMBEDDED_DATA[state.currentProject];
    state.allStories = data.userStories || [];
    state.sprintCapacity =
      typeof BACKLOG_PLANNING !== "undefined" && BACKLOG_PLANNING.sprint1
        ? BACKLOG_PLANNING.sprint1.totalPoints || 0
        : 0;

    console.log(`${state.allStories.length} historias cargadas`);

    // Extraer epicas unicas y calcular totales por sprint
    state.epics.clear();
    state.sprintTotals = {};
    state.allStories.forEach((story) => {
      state.epics.add(story.epic);
      const s = story.sprint || "Sin sprint";
      state.sprintTotals[s] = (state.sprintTotals[s] || 0) + (story.points || 0);
    });

    populateEpicFilter();
    applyFilters();
  } catch (error) {
    showError(error.message);
    console.error("Error cargando historias:", error);
  }
}

/**
 * Muestra un mensaje de error
 * @param {string} message - Mensaje de error
 */
function showError(message) {
  elements.emptyState.hidden = true;
  elements.errorState.hidden = false;
  elements.errorMessage.textContent = message;
}

/**
 * Muestra el estado vacío
 */
function showEmptyState() {
  elements.errorState.hidden = true;
  elements.emptyState.hidden = false;
}

// ==================== Renderizado ====================
/**
 * Renderiza las historias filtradas, agrupadas por sprint con totales
 */
function renderStories() {
  console.log(`Renderizando ${state.filteredStories.length} historias`);
  elements.errorState.hidden = true;

  if (state.filteredStories.length === 0) {
    showEmptyState();
    return;
  }

  elements.emptyState.hidden = true;

  try {
    // Agrupar por sprint para mostrar totales
    const selectedSprint = elements.sprintFilter.value;
    const showSprintHeaders = selectedSprint === "all";

    let html = "";
    if (showSprintHeaders) {
      // Agrupar por sprint
      const groups = {};
      const sprintOrder = [];
      state.filteredStories.forEach((story) => {
        const s = story.sprint || "Sin sprint";
        if (!groups[s]) {
          groups[s] = [];
          sprintOrder.push(s);
        }
        groups[s].push(story);
      });

      sprintOrder.forEach((sprint) => {
        const stories = groups[sprint];
        const sprintTotal = stories.reduce((acc, s) => acc + (s.points || 0), 0);
        html += `
          <div class="sprint-group-header" style="grid-column: 1 / -1; margin: 1rem 0 0.5rem; padding: 0.6rem 1rem; background: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--primary-color); display: flex; align-items: center; justify-content: space-between;">
            <span style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${escapeHtml(sprint)}</span>
            <span style="background: var(--primary-color); color: white; padding: 0.2rem 0.7rem; border-radius: 20px; font-size: 0.78rem; font-weight: 700;">${sprintTotal} pts</span>
          </div>
        `;
        html += stories.map((story) => createStoryCard(story)).join("");
      });
    } else {
      const sprintTotal = state.filteredStories.reduce(
        (acc, s) => acc + (s.points || 0), 0
      );
      html += `
        <div class="sprint-group-header" style="grid-column: 1 / -1; margin: 0 0 0.5rem; padding: 0.6rem 1rem; background: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--primary-color); display: flex; align-items: center; justify-content: space-between;">
          <span style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${escapeHtml(selectedSprint)} - ${state.filteredStories.length} historia(s)</span>
          <span style="background: var(--primary-color); color: white; padding: 0.2rem 0.7rem; border-radius: 20px; font-size: 0.78rem; font-weight: 700;">${sprintTotal} pts</span>
        </div>
      `;
      html += state.filteredStories.map((story) => createStoryCard(story)).join("");
    }

    elements.storiesContainer.innerHTML = html;

    // Agregar event listeners a las tarjetas
    document.querySelectorAll(".story-card").forEach((card, index) => {
      const visibleStories = elements.storiesContainer.querySelectorAll(".story-card");
      const storyIndex = Array.from(visibleStories).indexOf(card);
      card.addEventListener("click", () => {
        const flatList = state.filteredStories;
        // Find which story this card corresponds to by order
        const allCards = Array.from(elements.storiesContainer.querySelectorAll(".story-card"));
        const cardIdx = allCards.indexOf(card);
        // Map card index to filtered story (in order)
        if (cardIdx >= 0 && cardIdx < flatList.length) {
          openModal(flatList[cardIdx]);
        }
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          const allCards = Array.from(elements.storiesContainer.querySelectorAll(".story-card"));
          const cardIdx = allCards.indexOf(card);
          if (cardIdx >= 0 && cardIdx < state.filteredStories.length) {
            openModal(state.filteredStories[cardIdx]);
          }
        }
      });
    });

    updateStats();
    console.log("Historias renderizadas correctamente");
  } catch (error) {
    console.error("Error al renderizar historias:", error);
    showError("Error al renderizar historias: " + error.message);
  }
}

/**
 * Crea el HTML de una tarjeta de historia
 * @param {Object} story - Objeto de historia de usuario
 * @returns {string} HTML de la tarjeta
 */
function createStoryCard(story) {
  const acceptanceCriteriaCount = Array.isArray(story.acceptanceCriteria)
    ? story.acceptanceCriteria.length
    : 0;
  const definitionOfDoneCount = Array.isArray(story.definitionOfDone)
    ? story.definitionOfDone.length
    : 0;
  const tasksCount = Array.isArray(story.tasks) ? story.tasks.length : 0;
  const points = story.points || 0;

  return `
        <article class="story-card" role="button" tabindex="0" aria-label="Ver detalles de ${
          story.code || "historia"
        }">
            <div class="story-header">
                <span class="story-code">${escapeHtml(
                  story.code || "N/A"
                )}</span>
                <span class="story-epic">${escapeHtml(
                  story.epic || "Sin epica"
                )}</span>
                ${
                  story.sprint
                    ? `<span class="story-sprint" style="background: var(--accent-color); color: black; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${escapeHtml(
                        story.sprint
                      )}</span>`
                    : ""
                }
            </div>
            <h3 class="story-title">${escapeHtml(
              story.title || "Sin titulo"
            )}</h3>
            <p class="story-description">${escapeHtml(
              story.description || "Sin descripcion"
            )}</p>
            <div class="story-footer">
                <span class="badge">${acceptanceCriteriaCount} criterios</span>
                <span class="badge">${definitionOfDoneCount} DoD</span>
                ${tasksCount > 0 ? `<span class="badge" style="background: var(--primary-color); color: white;">${tasksCount} tareas</span>` : ""}
            </div>
            <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem;">
                <span style="color: var(--text-secondary);">Responsable: <strong style="color: var(--text-primary);">${escapeHtml(story.assignedTo || "N/A")}</strong></span>
                <span style="background: var(--primary-color); color: white; border-radius: 4px; padding: 0.2rem 0.6rem; font-weight: 700;">${points} pts</span>
            </div>
        </article>
    `;
}

/**
 * Actualiza las estadísticas mostradas
 */
function updateStats() {
  const selectedSprint = elements.sprintFilter.value;
  const sprintPoints =
    selectedSprint === "all"
      ? Object.values(state.sprintTotals).reduce((acc, value) => acc + value, 0)
      : state.sprintTotals[selectedSprint] || 0;
  const validationLabel =
    state.sprintCapacity > 0
      ? sprintPoints === state.sprintCapacity
        ? "capacidad alineada"
        : "capacidad en revisión"
      : "sin capacidad definida";

  elements.totalStories.textContent = state.allStories.length;
  elements.visibleStories.textContent = state.filteredStories.length;

  const stats = document.getElementById("stats");
  if (stats) {
    stats.innerHTML = `
      <span class="stat-item">
        <strong id="total-stories">${state.allStories.length}</strong> historias
      </span>
      <span class="stat-item">
        <strong id="visible-stories">${state.filteredStories.length}</strong> mostradas
      </span>
      <span class="stat-item">
        <strong>${sprintPoints}</strong> pts acumulados / ${state.sprintCapacity || 0} capacidad
      </span>
      <span class="stat-item">
        <strong>${escapeHtml(validationLabel)}</strong> sprint ${escapeHtml(selectedSprint === "all" ? "general" : selectedSprint)}
      </span>
    `;
  }
}

// ==================== Filtros ====================
/**
 * Puebla el selector de épicas
 */
function populateEpicFilter() {
  const options = Array.from(state.epics)
    .sort()
    .map(
      (epic) =>
        `<option value="${escapeHtml(epic)}">${escapeHtml(epic)}</option>`
    )
    .join("");

  elements.epicFilter.innerHTML = `<option value="all">Todas las épicas</option>${options}`;
}

/**
 * Aplica todos los filtros activos
 */
function applyFilters() {
  let filtered = [...state.allStories];

  // Filtro de búsqueda
  const searchTerm = elements.searchInput.value.toLowerCase().trim();
  if (searchTerm) {
    filtered = filtered.filter(
      (story) =>
        story.code.toLowerCase().includes(searchTerm) ||
        story.title.toLowerCase().includes(searchTerm) ||
        story.description.toLowerCase().includes(searchTerm) ||
        story.epic.toLowerCase().includes(searchTerm) ||
        (story.sprint && story.sprint.toLowerCase().includes(searchTerm))
    );
  }

  // Filtro de épica
  const selectedEpic = elements.epicFilter.value;
  if (selectedEpic !== "all") {
    filtered = filtered.filter((story) => story.epic === selectedEpic);
  }

  // Filtro de sprint
  const selectedSprint = elements.sprintFilter.value;
  if (selectedSprint !== "all") {
    filtered = filtered.filter((story) => story.sprint === selectedSprint);
  }

  state.filteredStories = filtered;
  renderStories();
}

/**
 * Maneja la búsqueda
 */
function handleSearch() {
  applyFilters();
}

/**
 * Maneja el filtro de épica
 */
function handleEpicFilter() {
  applyFilters();
}

/**
 * Maneja el filtro de sprint
 */
function handleSprintFilter() {
  applyFilters();
}

// ==================== Modal ====================
/**
 * Abre el modal con los detalles de una historia
 * @param {Object} story - Historia de usuario
 */
function openModal(story) {
  if (!story) {
    console.error("No se proporcionó una historia válida");
    return;
  }

  const acceptanceCriteria = Array.isArray(story.acceptanceCriteria)
    ? story.acceptanceCriteria
    : [];
  const definitionOfDone = Array.isArray(story.definitionOfDone)
    ? story.definitionOfDone
    : [];
  const tasks = Array.isArray(story.tasks) ? story.tasks : [];

  const points = story.points || 0;

  const tasksHTML = tasks.length > 0
    ? `<div style="margin-bottom:1.5rem;">
        <h3 style="color:var(--text-primary);margin:0 0 0.75rem 0;font-size:1.25rem;">Tareas</h3>
        <div style="display:flex;flex-direction:column;gap:0.5rem;">
          ${tasks.map((t) => `
            <div style="display:grid;grid-template-columns:80px 1fr 160px;gap:0.5rem;padding:0.5rem 0.75rem;background:var(--bg-secondary);border-radius:6px;align-items:center;font-size:0.82rem;">
              <span style="font-family:monospace;color:var(--text-secondary);font-weight:600;">${escapeHtml(t.id || "")}</span>
              <span style="color:var(--text-primary);">${escapeHtml(t.title || "")}</span>
              <span style="color:var(--text-secondary);text-align:right;">${escapeHtml(t.assignedTo || "")} <em style="font-style:italic;">(${escapeHtml(t.role || "")})</em></span>
            </div>`).join("")}
        </div>
       </div>`
    : "";

  const modalContent = `
    <div style="padding: 2rem;">
      <div style="margin-bottom: 1.5rem;">
        <h2 style="margin: 0 0 0.5rem 0; color: var(--text-primary); font-size: 1.75rem;">${escapeHtml(
          story.code || "N/A"
        )} - ${escapeHtml(story.title || "Sin titulo")}</h2>
        <div style="display: flex; gap: 0.75rem; margin-top: 0.75rem; flex-wrap: wrap;">
          <span style="background: var(--primary-color); color: white; padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.875rem;">${escapeHtml(
            story.code || "N/A"
          )}</span>
          <span style="background: var(--border-color); color: var(--text-primary); padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.875rem;">${escapeHtml(
            story.epic || "Sin epica"
          )}</span>
          ${
            story.sprint
              ? `<span style="background: var(--accent-color); color: black; padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.875rem;">${escapeHtml(
                  story.sprint
                )}</span>`
              : ""
          }
          <span style="background: var(--primary-color); color: white; padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.875rem; font-weight: 700;">${points} pts</span>
          ${story.assignedTo ? `<span style="padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.875rem; border: 1px solid var(--border-color); color: var(--text-secondary);">Responsable: ${escapeHtml(story.assignedTo)}</span>` : ""}
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;" id="description-section">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
          <h3 id="description-title" style="color: var(--text-primary); margin: 0; font-size: 1.25rem;">Descripcion</h3>
          <button
            class="copy-description-btn"
            style="padding: 0.5rem; background: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;"
            onmouseover="this.style.background='var(--accent-color)'; this.style.transform='scale(1.1)';"
            onmouseout="this.style.background='var(--primary-color)'; this.style.transform='scale(1)';"
            onclick="copyDescriptionSection(this)"
            title="Copiar descripcion">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
        <p id="description-content" style="color: var(--text-secondary); line-height: 1.8; margin: 0; white-space: pre-line;">${escapeHtml(
          story.description || "Sin descripcion disponible"
        )}</p>
      </div>

      ${tasksHTML}

      <div style="margin-bottom: 1.5rem;">
        <h3 style="color: var(--text-primary); margin: 0 0 0.75rem 0; font-size: 1.25rem;">Criterios de Aceptacion</h3>
        ${
          acceptanceCriteria.length > 0
            ? `
        <ul style="color: var(--text-secondary); line-height: 1.8; margin: 0; padding-left: 0; list-style: none;">
          ${acceptanceCriteria
            .map(
              (criterion) =>
                `<li style="margin-bottom: 0.75rem; display: flex; align-items: start; gap: 0.5rem; padding: 0.75rem; background: var(--background-secondary); border-radius: 6px; position: relative;">
                  <span style="flex: 1; padding-left: 1.5rem; position: relative;">
                    <span style="position: absolute; left: 0; top: 0; color: var(--primary-color); font-weight: 600;">•</span>
                    ${escapeHtml(criterion)}
                  </span>
                  <button
                    class="copy-criterion-btn"
                    data-text="${escapeHtml(criterion)}"
                    style="flex-shrink: 0; padding: 0.5rem; background: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;"
                    onmouseover="this.style.background='var(--accent-color)'; this.style.transform='scale(1.1)';"
                    onmouseout="this.style.background='var(--primary-color)'; this.style.transform='scale(1)';"
                    onclick="copyToClipboard('${escapeHtml(criterion).replace(
                      /'/g,
                      "\\'"
                    )}', this)"
                    title="Copiar criterio">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </li>`
            )
            .join("")}
        </ul>
        `
            : '<p style="color: var(--text-secondary); margin: 0;">No hay criterios de aceptacion definidos.</p>'
        }
      </div>

      <div id="dod-section">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
          <h3 id="dod-title" style="color: var(--text-primary); margin: 0; font-size: 1.25rem;">Definicion de Hecho</h3>
          <button
            class="copy-dod-btn"
            style="padding: 0.5rem; background: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;"
            onmouseover="this.style.background='var(--accent-color)'; this.style.transform='scale(1.1)';"
            onmouseout="this.style.background='var(--primary-color)'; this.style.transform='scale(1)';"
            onclick="copyDoDSection(this)"
            title="Copiar definicion de hecho">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
        ${
          definitionOfDone.length > 0
            ? `
        <ul id="dod-content" style="color: var(--text-secondary); line-height: 1.8; margin: 0; padding-left: 1.5rem;">
          ${definitionOfDone
            .map(
              (item) =>
                `<li style="margin-bottom: 0.5rem;">${escapeHtml(item)}</li>`
            )
            .join("")}
        </ul>
        `
            : '<p id="dod-content" style="color: var(--text-secondary); margin: 0;">No hay definicion de hecho disponible.</p>'
        }
      </div>
    </div>
  `;

  elements.modalContent.innerHTML = modalContent;
  elements.modal.style.display = "flex";
  elements.modal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
}

/**
 * Cierra el modal
 */
function closeModal() {
  elements.modal.style.display = "none";
  elements.modal.setAttribute("hidden", "");
  document.body.style.overflow = "";
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

/**
 * Implementa debounce para funciones
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Milisegundos de espera
 * @returns {Function} Función con debounce
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Copia la sección completa de descripción (título + contenido)
 * @param {HTMLElement} button - Botón que activó la copia
 */
function copyDescriptionSection(button) {
  const titleElement = document.getElementById("description-title");
  const contentElement = document.getElementById("description-content");

  if (titleElement && contentElement) {
    const title = titleElement.textContent;
    const content = contentElement.textContent;
    const fullText = `${title}\n\n${content}`;

    copyToClipboard(fullText, button);
  }
}

/**
 * Copia la sección completa de Definición de Hecho (título + lista)
 * @param {HTMLElement} button - Botón que activó la copia
 */
function copyDoDSection(button) {
  const titleElement = document.getElementById("dod-title");
  const contentElement = document.getElementById("dod-content");

  if (titleElement && contentElement) {
    const title = titleElement.textContent;

    // Si es una lista (ul), extraer cada item
    if (contentElement.tagName === "UL") {
      const items = Array.from(contentElement.querySelectorAll("li"))
        .map((li) => `- ${li.textContent}`)
        .join("\n");
      const fullText = `${title}\n\n${items}`;
      copyToClipboard(fullText, button);
    } else {
      // Si es un párrafo (sin contenido)
      const content = contentElement.textContent;
      const fullText = `${title}\n\n${content}`;
      copyToClipboard(fullText, button);
    }
  }
}

/**
 * Copia texto al portapapeles y muestra feedback visual
 * @param {string} text - Texto a copiar
 * @param {HTMLElement} button - Botón que activó la copia
 */
function copyToClipboard(text, button) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showCopyFeedback(button, true);
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
        fallbackCopy(text, button);
      });
  } else {
    fallbackCopy(text, button);
  }
}

/**
 * Método fallback para copiar al portapapeles
 * @param {string} text - Texto a copiar
 * @param {HTMLElement} button - Botón que activó la copia
 */
function fallbackCopy(text, button) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    showCopyFeedback(button, successful);
  } catch (err) {
    console.error("Error al copiar (fallback):", err);
    showCopyFeedback(button, false);
  }

  document.body.removeChild(textArea);
}

/**
 * Muestra feedback visual al copiar
 * @param {HTMLElement} button - Botón a actualizar
 * @param {boolean} success - Si la copia fue exitosa
 */
function showCopyFeedback(button, success) {
  const originalContent = button.innerHTML;
  const originalBg = button.style.background;

  if (success) {
    button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`;
    button.style.background = "#10b981";
  } else {
    button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`;
    button.style.background = "#ef4444";
  }

  setTimeout(() => {
    button.innerHTML = originalContent;
    button.style.background = originalBg;
  }, 1500);
}

// ==================== Exportacion a Jira ====================
/**
 * Escapa un valor para CSV (envuelve en comillas si contiene comas, comillas o saltos de linea)
 * @param {string|number} value
 * @returns {string}
 */
function csvEscape(value) {
  const str = String(value == null ? "" : value)
    .replace(/\r?\n/g, " | ")   // saltos de linea → separador visual
    .replace(/"/g, '""');        // comillas → doble comilla (estandar CSV)
  return `"${str}"`;
}

/**
 * Exporta las historias actualmente visibles a un CSV compatible con Jira.
 * El CSV puede importarse en Jira mediante la funcion de importacion de CSV del proyecto.
 *
 * Columnas exportadas (orden Jira estándar):
 *   Summary | Issue Type | Status | Priority | Story Points | Sprint | Epic Name |
 *   Assignee | Description | Acceptance Criteria | Definition of Done
 */
function exportToJiraCSV() {
  const stories = state.filteredStories;
  if (!stories || stories.length === 0) {
    alert("No hay historias para exportar. Ajusta los filtros e intenta de nuevo.");
    return;
  }

  const headers = [
    "Summary",
    "Issue Type",
    "Status",
    "Priority",
    "Story Points",
    "Sprint",
    "Epic Name",
    "Assignee",
    "Description",
    "Acceptance Criteria",
    "Definition of Done",
  ];

  const rows = stories.map((story) => {
    const acceptanceCriteria = Array.isArray(story.acceptanceCriteria)
      ? story.acceptanceCriteria.join(" | ")
      : (story.acceptanceCriteria || "");

    const definitionOfDone = Array.isArray(story.definitionOfDone)
      ? story.definitionOfDone.join(" | ")
      : (story.definitionOfDone || "");

    const description = (story.description || "")
      .replace(/\r?\n/g, " ");

    return [
      csvEscape(`[${story.code}] ${story.title}`),
      csvEscape("Story"),
      csvEscape("To Do"),
      csvEscape("Medium"),
      csvEscape(story.points || 0),
      csvEscape(story.sprint || ""),
      csvEscape((story.epic || "").replace(/^E-\d+\s+/, "")),
      csvEscape(story.assignedTo || ""),
      csvEscape(description),
      csvEscape(acceptanceCriteria),
      csvEscape(definitionOfDone),
    ].join(",");
  });

  const csvContent = [headers.join(","), ...rows].join("\r\n");

  // BOM UTF-8 para que Excel abra el CSV correctamente
  const bom = "\uFEFF";
  const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `PicoBotella-jira-export-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Feedback visual en el boton
  const btn = document.getElementById("jira-export-btn");
  if (btn) {
    const original = btn.textContent;
    btn.textContent = "✓ Exportado!";
    btn.style.background = "#10b981";
    btn.style.color = "#fff";
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  }
}

// ==================== Inicio de la aplicación ====================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
