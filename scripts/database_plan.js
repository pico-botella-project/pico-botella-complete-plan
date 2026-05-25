/**
 * Visualizador de Diagrama de Base de Datos - Finanz
 * @description Aplicación para visualizar el ERD de la base de datos
 */

// ==================== Estado de la aplicación ====================
const state = {
  currentTheme: "light",
};

// ==================== Elementos del DOM ====================
const elements = {
  themeToggle: document.getElementById("theme-toggle"),
  tablesList: document.getElementById("tables-list"),
  loading: document.getElementById("loading"),
  errorState: document.getElementById("error-state"),
  errorMessage: document.getElementById("error-message"),
  dbDescription: document.getElementById("db-description"),
  dbNote: document.getElementById("db-note"),
};

// ==================== Inicialización ====================
/**
 * Inicializa la aplicación
 */
function init() {
  console.log("Iniciando aplicación de diagrama de base de datos...");
  try {
    loadTheme();
    setupEventListeners();
    loadDatabase();
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
 * Carga el diagrama de base de datos
 */
function loadDatabase() {
  console.log("Cargando diagrama de base de datos...");

  try {
    // Verificar que DATABASE_DATA existe
    if (typeof DATABASE_DATA === "undefined") {
      throw new Error("No se encontraron los datos de la base de datos");
    }

    console.log("DATABASE_DATA encontrado:", DATABASE_DATA);

    // Actualizar descripciones
    if (elements.dbDescription && DATABASE_DATA.subtitle) {
      elements.dbDescription.textContent = DATABASE_DATA.subtitle;
    }

    if (elements.dbNote && DATABASE_DATA.note) {
      elements.dbNote.textContent = DATABASE_DATA.note;
    }

    // Renderizar lista de tablas
    renderTablesList();

    console.log("Diagrama de base de datos cargado correctamente");
  } catch (error) {
    showError(error.message);
    console.error("Error cargando diagrama:", error);
  }
}

/**
 * Muestra el estado de carga
 */
function showLoading() {
  elements.loading.hidden = false;
  elements.errorState.hidden = true;
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
 * Renderiza la lista de tablas
 */
function renderTablesList() {
  if (!DATABASE_DATA.tables || DATABASE_DATA.tables.length === 0) {
    console.error("No hay tablas para renderizar");
    showError("No se encontraron tablas en los datos");
    return;
  }

  console.log(`Renderizando ${DATABASE_DATA.tables.length} tablas...`);

  const tablesHTML = DATABASE_DATA.tables
    .map((table) => createTableCard(table))
    .join("");

  elements.tablesList.innerHTML = tablesHTML;
  console.log("Tablas renderizadas correctamente");
}

/**
 * Crea una card de tabla
 * @param {Object} table - Objeto de tabla
 * @returns {string} HTML de la card
 */
function createTableCard(table) {
  const fieldsHTML = table.fields
    .map((field) => {
      let className = "table-field";
      if (field.isPK) className += " field-primary";
      if (field.isFK) className += " field-foreign";

      let fieldText = field.name;
      if (field.isPK) fieldText += " (PK)";
      if (field.isFK) fieldText += ` → ${field.ref}`;
      if (field.note) fieldText += ` - ${field.note}`;

      return `<li class="${className}">${escapeHtml(fieldText)}</li>`;
    })
    .join("");

  return `
    <div class="table-card" style="border-left: 4px solid ${table.stroke};">
      <h3 class="table-card-name">${escapeHtml(table.name)}</h3>
      <ul class="table-fields-list">
        ${fieldsHTML}
      </ul>
    </div>
  `;
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
