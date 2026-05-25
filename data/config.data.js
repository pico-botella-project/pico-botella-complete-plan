/* Global configuration used by views and scripts */
const PROJECT_CONFIG = {
  projectKey: "picobotella",
  projectName: "Pico Botella - Planeación",
  title: "Pico Botella",
  shortName: "Pico Botella",
  subtitle: "Plantilla de planeación para proyecto de software",
  logoSrc: "pico-botella-icon.svg",
  logoAlt: "Logo Pico Botella",
  author: "Dispositivos Moviles",
  year: 2025,
  version: "2.0.0",
  defaultLanguage: "es",
  license: "CC-BY-NC-4.0",
  links: {
    home: "../index.html",
    backlog: "../views/user_stories.html",
  },
};

if (typeof module !== "undefined") module.exports = PROJECT_CONFIG;
