/**
 * team_members.js
 * Visualizador del equipo de trabajo Dispositivos Moviles - Pico Botella
 */

// ==================== Estado ====================
const state = {
  currentTheme: "light",
};

// ==================== Elementos del DOM ====================
const elements = {
  themeToggle: document.getElementById("theme-toggle"),
  errorState: document.getElementById("error-state"),
  errorMessage: document.getElementById("error-message"),
  teamHero: document.getElementById("team-hero"),
  membersSection: document.getElementById("members-section"),
  membersGrid: document.getElementById("members-grid"),
};

// ==================== Color tokens per member ====================
const MEMBER_COLOR_TOKEN = {
  "juan-francesco": "blue",
  "ivan-ausecha": "green",
  "andrey-quiceno": "purple",
};

// ==================== Utilidades ====================
function escapeHtml(text) {
  if (typeof text !== "string") return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==================== Tema ====================
function loadTheme() {
  const saved = localStorage.getItem("picobotella-theme") || "light";
  state.currentTheme = saved;
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon();
}

function toggleTheme() {
  state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", state.currentTheme);
  localStorage.setItem("picobotella-theme", state.currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = elements.themeToggle.querySelector(".theme-icon");
  icon.textContent = state.currentTheme === "light" ? "Oscuro" : "Claro";
}

// ==================== Renderizado del hero ====================
function renderTeamHero(team) {
  const el = elements.teamHero;
  el.className = "team-hero";
  el.innerHTML = `
    <div class="team-hero-logo">
      <div class="team-hero-badge">CL</div>
    </div>
    <div class="team-hero-text">
      <h2>${escapeHtml(team.name)}</h2>
      <p class="team-slogan">"${escapeHtml(team.slogan)}"</p>
      <p class="team-hero-description">${escapeHtml(team.description)}</p>
    </div>
    <div class="team-hero-stats">
      <div class="hero-stat">
        <span class="hero-stat-value">${team.velocity}</span>
        <span class="hero-stat-label">capacidad sprint</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-value">${team.totalSprints}</span>
        <span class="hero-stat-label">sprints</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-value">${team.totalPoints}</span>
        <span class="hero-stat-label">puntos totales</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-value">${team.yearsWorkingTogether}</span>
        <span class="hero-stat-label">año juntos</span>
      </div>
    </div>
  `;
  el.hidden = false;
}

// ==================== Renderizado de miembro ====================
function renderMemberCard(member) {
  const colorToken = MEMBER_COLOR_TOKEN[member.id] || "blue";
  const skillsHTML = (member.skills || [])
    .map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`)
    .join("");

  const avatarPath = `../${member.avatarFile}`;

  return `
    <div class="member-card" data-member-color="${colorToken}">
      <div class="member-card-top">
        <div class="member-avatar">
          <img
            src="${escapeHtml(avatarPath)}"
            alt="Avatar de ${escapeHtml(member.fullName)}"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div
            class="member-avatar-fallback"
            style="display:none; background: ${escapeHtml(member.avatarColor.primary)};"
          >${escapeHtml(member.initials)}</div>
        </div>
        <div class="member-header-text">
          <p class="member-name">
            ${escapeHtml(member.fullName)}
            <span class="member-age">${member.age} a</span>
          </p>
          <p class="member-role">${escapeHtml(member.role)}</p>
          <div class="member-links">
            <a
              href="${escapeHtml(member.github)}"
              target="_blank"
              rel="noopener noreferrer"
              class="member-link member-link-github"
              aria-label="GitHub de ${escapeHtml(member.fullName)}"
            >GitHub</a>
            <a
              href="${escapeHtml(member.linkedin)}"
              target="_blank"
              rel="noopener noreferrer"
              class="member-link member-link-linkedin"
              aria-label="LinkedIn de ${escapeHtml(member.fullName)}"
            >LinkedIn</a>
          </div>
        </div>
      </div>
      <div class="member-card-body">
        <p class="member-summary">${escapeHtml(member.summary)}</p>
        <p class="member-skills-label">Competencias</p>
        <div class="member-skills">${skillsHTML}</div>
        <div class="member-stats">
          <div class="member-stat">
            <span class="member-stat-value">${member.experienceAlone}</span>
            <span class="member-stat-label">anos de experiencia individual</span>
          </div>
          <div class="member-stat">
            <span class="member-stat-value">${member.experienceTogether}</span>
            <span class="member-stat-label">ano colaborando en equipo</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==================== Inicializacion ====================
function init() {
  try {
    loadTheme();
    elements.themeToggle.addEventListener("click", toggleTheme);

    if (typeof TEAM_MEMBERS_DATA === "undefined") {
      throw new Error("No se encontraron datos del equipo (TEAM_MEMBERS_DATA).");
    }

    renderTeamHero(TEAM_MEMBERS_DATA.team);

    if (!Array.isArray(TEAM_MEMBERS_DATA.members) || TEAM_MEMBERS_DATA.members.length === 0) {
      throw new Error("No se encontraron integrantes en el equipo.");
    }

    elements.membersGrid.innerHTML = TEAM_MEMBERS_DATA.members
      .map(renderMemberCard)
      .join("");

    elements.membersSection.hidden = false;

  } catch (err) {
    console.error("Error al inicializar team_members:", err);
    elements.errorState.hidden = false;
    elements.errorMessage.textContent = err.message;
  }
}

document.addEventListener("DOMContentLoaded", init);
