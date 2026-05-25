/**
 * team_distribution.js
 * Distribucion por sprints - historias, tareas y asignaciones
 * Proyecto: Pico Botella - Equipo Dispositivos Moviles
 */

// ==================== Utilidades ====================
function escapeHtml(text) {
  if (typeof text !== "string") return String(text || "");
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==================== Tema ====================
let currentTheme = "light";

function loadTheme() {
  currentTheme = localStorage.getItem("picobotella-theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon();
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("picobotella-theme", currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.querySelector("#theme-toggle .theme-icon");
  if (icon) icon.textContent = currentTheme === "light" ? "Oscuro" : "Claro";
}

// ==================== Task Counters ====================
/**
 * Calcula el numero de tareas asignadas a cada desarrollador
 * @param {Array} sprints - Array de sprints
 * @returns {Object} { overall: {dev: count, ...}, perSprint: {sprintId: {dev: count, ...}, ...} }
 */
function calcTaskCounters(sprints) {
  const overall = {};
  const perSprint = {};

  sprints.forEach((sprint) => {
    const sprintKey = sprint.id || sprint.name;
    perSprint[sprintKey] = {};

    (sprint.stories || []).forEach((story) => {
      (story.tasks || []).forEach((task) => {
        const dev = task.assignedTo || "Sin asignar";
        overall[dev] = (overall[dev] || 0) + 1;
        perSprint[sprintKey][dev] = (perSprint[sprintKey][dev] || 0) + 1;
      });
    });
  });

  return { overall, perSprint };
}

function calcSprintStoryPoints(sprint) {
  return (sprint.stories || []).reduce((total, story) => total + (story.points || 0), 0);
}

function csvEscape(value) {
  return '"' + String(value ?? '').replace(/"/g, '""') + '"';
}

function getAssigneeEmail(name) {
  const assigneeMap = {
    'Ivan Ausecha': 'ivan.ausecha@correounivalle.edu.co',
    'Juan Francesco Garcia': 'juan.francesco.garcia@correounivalle.edu.co',
    'José Martínez': 'jose.armando.martinez@correounivalle.edu.co',
    'Adolfo Andrey Quiceno': 'adolfo.quiceno@correounivalle.edu.co',
    'Dylan Morales': 'dylan.morales@correounivalle.edu.co',
  };
  return assigneeMap[name] || '';
}

function derivePriority(points) {
  if (points >= 8) return "High";
  if (points >= 5) return "Medium";
  if (points >= 2) return "Low";
  return "Lowest";
}

function buildJiraCsv(backlog) {
  const rows = [];
  rows.push([
    "Issue Type",
    "Issue ID",
    "Parent",
    "Summary",
    "Description",
    "Assignee",
    "Priority",
    "Labels",
    "Story Points",
    "Acceptance Criteria",
    "Definition of Done",
  ].join(","));

  const epics = (backlog.sprint1 && backlog.sprint1.epics) || [];
  const stories = (backlog.sprint1 && backlog.sprint1.userStories) || [];

  epics.forEach((epic) => {
    const epicId = `tmp-epic-${epic.id}`;
    const epicLead = stories.find((story) => story.epic === epic.id);
    const epicAssignee = epicLead ? epicLead.assignedTo : "Adolfo Andrey Quiceno";
    rows.push([
      csvEscape("Epic"),
      csvEscape(epicId),
      csvEscape(""),
      csvEscape(epic.title || epic.name || epic.id),
      csvEscape(epic.description || "Epic del Sprint 1"),
      csvEscape(getAssigneeEmail(epicAssignee)),
      csvEscape("Medium"),
      csvEscape(["picobotella", "sprint1", epic.id].filter(Boolean).join(";")),
      csvEscape(""),
      csvEscape(""),
      csvEscape(""),
    ].join(","));
  });

  stories.forEach((story) => {
    const storyId = `tmp-story-${story.code}`;
    const parentId = `tmp-epic-${story.epic}`;
    const labels = ["picobotella", "sprint1", story.epic, story.sprint].filter(Boolean).join(";");
    rows.push([
      csvEscape("Story"),
      csvEscape(storyId),
      csvEscape(parentId),
      csvEscape(story.title || ""),
      csvEscape(story.description || ""),
      csvEscape(getAssigneeEmail(story.assignedTo || "")),
      csvEscape(derivePriority(story.points || 0)),
      csvEscape(labels),
      csvEscape(story.points || 0),
      csvEscape(Array.isArray(story.acceptanceCriteria) ? story.acceptanceCriteria.join("; ") : ""),
      csvEscape(Array.isArray(story.definitionOfDone) ? story.definitionOfDone.join("; ") : ""),
    ].join(","));

    (story.tasks || []).forEach((task) => {
      const taskId = `tmp-task-${task.id}`;
      rows.push([
        csvEscape("Sub-task"),
        csvEscape(taskId),
        csvEscape(storyId),
        csvEscape(task.title || ""),
        csvEscape(task.description || task.role || ""),
        csvEscape(getAssigneeEmail(task.assignedTo || "")),
        csvEscape("Medium"),
        csvEscape(["picobotella", "sprint1", task.role, story.epic].filter(Boolean).join(";")),
        csvEscape(""),
        csvEscape(""),
        csvEscape(""),
      ].join(","));
    });
  });

  return rows.join("\r\n");
}

function exportJiraCsv() {
  if (typeof BACKLOG_PLANNING === "undefined") {
    alert("No se encontraron datos del backlog para exportar.");
    return;
  }

  const csv = buildJiraCsv(BACKLOG_PLANNING);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "pico-botella-jira-import.csv";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/**
 * Genera el HTML de la tabla de contadores por desarrollador
 * @param {Object} counts - { dev: taskCount }
 * @param {number} totalTasks - Total de tareas para calcular el porcentaje
 */
function renderCounterTable(counts, totalTasks) {
  const devColors = {
    "Juan Francesco Garcia": "#3B82F6",
    "Ivan Ausecha":          "#10B981",
    "Adolfo Andrey Quiceno": "#8B5CF6",
  };

  const sortedDevs = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return `
    <div class="task-counter-table">
      ${sortedDevs
        .map(([dev, count]) => {
          const pct = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;
          const color = devColors[dev] || "#64748b";
          const shortName = dev.split(" ")[0] + " " + (dev.split(" ").pop() || "");
          return `
            <div class="task-counter-row">
              <span class="task-counter-dev" title="${escapeHtml(dev)}">${escapeHtml(shortName)}</span>
              <div class="task-counter-bar-wrap">
                <div class="task-counter-bar" style="width:${pct}%;background:${color}"></div>
              </div>
              <span class="task-counter-count" style="color:${color}">${count}</span>
              <span class="task-counter-pct">${pct}%</span>
            </div>`;
        })
        .join("")}
    </div>
  `;
}

/**
 * Renderiza el resumen global de tareas por desarrollador
 * @param {Object} overall - { dev: taskCount }
 */
function renderGlobalCounters(overall) {
  const container = document.getElementById("global-task-counters");
  if (!container) return;

  const totalTasks = Object.values(overall).reduce((a, b) => a + b, 0);
  const sprintPoints = Array.isArray(TEAM_DATA.sprints)
    ? TEAM_DATA.sprints.reduce((total, sprint) => total + calcSprintStoryPoints(sprint), 0)
    : 0;

  container.innerHTML = `
    <div class="counter-card">
      <div class="counter-card-header">
        <span class="counter-card-title">📊 Distribución de tareas — Proyecto completo</span>
        <span class="counter-card-total">${totalTasks} tareas totales</span>
      </div>
      <div class="counter-card-header" style="margin-top:0.5rem;">
        <span class="counter-card-title">📌 Puntos acumulados del sprint</span>
        <span class="counter-card-total">${sprintPoints} pts / ${TEAM_DATA.totalPoints || 0} capacidad</span>
      </div>
      ${renderCounterTable(overall, totalTasks)}
    </div>
  `;
  container.hidden = false;
}

// ==================== Funciones de render ====================
function renderMetrics(data) {
  const sec = document.getElementById("metrics-section");
  const container = document.getElementById("metrics-container");
  if (!sec || !container) return;

  container.innerHTML = `
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(140px,1fr)); gap:1rem; margin-bottom:2rem;">
      <div class="sprint-metric-card">
        <span class="sprint-metric-value">${data.totalSprints}</span>
        <span class="sprint-metric-label">Sprints</span>
      </div>
      <div class="sprint-metric-card">
        <span class="sprint-metric-value">${data.velocity}</span>
        <span class="sprint-metric-label">Velocidad (pts/sprint)</span>
      </div>
      <div class="sprint-metric-card">
        <span class="sprint-metric-value">${data.totalPoints}</span>
        <span class="sprint-metric-label">Puntos Totales</span>
      </div>
      <div class="sprint-metric-card">
        <span class="sprint-metric-value">${(data.epics || []).length}</span>
        <span class="sprint-metric-label">Epicas</span>
      </div>
    </div>
  `;
  sec.hidden = false;
}

function renderTaskRow(task) {
  return `
    <div class="task-row">
      <span class="task-id">${escapeHtml(task.id || "")}</span>
      <span class="task-title">${escapeHtml(task.title || "")}</span>
      <span class="task-assignee">${escapeHtml(task.assignedTo || "")}</span>
      <span class="task-role-badge">${escapeHtml(task.role || "")}</span>
    </div>
  `;
}

function renderStoryBlock(story) {
  const tasks = Array.isArray(story.tasks) ? story.tasks : [];
  const tasksHTML = tasks.length > 0
    ? `<div class="story-tasks">
        <div class="tasks-header">
          <span class="tasks-col tasks-col-id">ID</span>
          <span class="tasks-col tasks-col-title">Tarea</span>
          <span class="tasks-col tasks-col-assignee">Asignado a</span>
          <span class="tasks-col tasks-col-role">Rol</span>
        </div>
        ${tasks.map(renderTaskRow).join("")}
       </div>`
    : `<p class="no-tasks">Sin tareas registradas.</p>`;

  return `
    <div class="story-block">
      <div class="story-block-header">
        <span class="story-block-code">${escapeHtml(story.code || "")}</span>
        <span class="story-block-title">${escapeHtml(story.title || "")}</span>
        <span class="story-block-pts">${story.points || 0} pts</span>
        <span class="story-block-assignee">Responsable: ${escapeHtml(story.assignedTo || "")}</span>
      </div>
      ${tasksHTML}
    </div>
  `;
}

function renderSprintCard(sprint, sprintCounts) {
  const stories = Array.isArray(sprint.stories) ? sprint.stories : [];
  const storiesHTML = stories.length > 0
    ? stories.map(renderStoryBlock).join("")
    : `<p class="no-stories">Sin historias asignadas.</p>`;

  const sprintKey = sprint.id || sprint.name;
  const counts = sprintCounts[sprintKey] || {};
  const totalSprintTasks = Object.values(counts).reduce((a, b) => a + b, 0);

  const counterHTML = totalSprintTasks > 0
    ? `<div class="sprint-task-counter">
        <span class="sprint-counter-label">Tareas: ${totalSprintTasks}</span>
        <span class="sprint-counter-label">Puntos acumulados: ${calcSprintStoryPoints(sprint)} pts</span>
        <span class="sprint-counter-label">Capacidad sprint: ${sprint.totalPoints || 0} pts</span>
        ${renderCounterTable(counts, totalSprintTasks)}
       </div>`
    : "";

  return `
    <div class="sprint-card" style="border-left: 4px solid ${escapeHtml(sprint.color || "#64748b")}">
      <div class="sprint-card-header">
        <div class="sprint-card-info">
          <h3 class="sprint-card-name">${escapeHtml(sprint.name || "")}</h3>
          <p class="sprint-card-goal">${escapeHtml(sprint.goal || "")}</p>
          ${sprint.teamNote ? `<p class="sprint-team-note">${escapeHtml(sprint.teamNote)}</p>` : ""}
        </div>
        <div class="sprint-card-meta">
          <span class="sprint-pts-badge">${sprint.totalPoints || 0} pts</span>
          <span class="sprint-duration">${escapeHtml(sprint.duration || "")}</span>
        </div>
      </div>
      ${counterHTML}
      <div class="sprint-stories">
        ${storiesHTML}
      </div>
    </div>
  `;
}

// ==================== Main ====================
function init() {
  loadTheme();

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  const exportBtn = document.getElementById("jira-export-btn");
  if (exportBtn) exportBtn.addEventListener("click", exportJiraCsv);

  try {
    if (typeof TEAM_DATA === "undefined") {
      throw new Error("No se encontraron datos del equipo (TEAM_DATA).");
    }

    // Descripcion
    const descEl = document.getElementById("team-description");
    if (descEl) {
      descEl.textContent =
        `${TEAM_DATA.team} - "${TEAM_DATA.slogan}". ` +
        (TEAM_DATA.description || "");
    }

    renderMetrics(TEAM_DATA);

    const sprints = Array.isArray(TEAM_DATA.sprints) ? TEAM_DATA.sprints : [];

    // Calculate and render task counters
    const { overall, perSprint } = calcTaskCounters(sprints);
    renderGlobalCounters(overall);

    const container = document.getElementById("sprints-container");
    if (!container) throw new Error("Contenedor de sprints no encontrado.");

    if (sprints.length === 0) {
      container.innerHTML = "<p>No hay sprints definidos.</p>";
      return;
    }

    container.innerHTML = sprints.map((sprint) => renderSprintCard(sprint, perSprint)).join("");

  } catch (err) {
    console.error("Error en team_distribution:", err);
    const errState = document.getElementById("error-state");
    const errMsg = document.getElementById("error-message");
    if (errState) errState.hidden = false;
    if (errMsg) errMsg.textContent = err.message;
  }
}

document.addEventListener("DOMContentLoaded", init);
