// project_data.js
// Informacion del proyecto Pico Botella

const PROJECT_DATA = {
  name: "Pico Botella",
  fullName: "Pico Botella - Planeación general del proyecto",
  tagline: "Una plantilla ligera para organizar Sprint 1 de un proyecto móvil.",
  version: "2.0.0",
  status: "Sprint 1 - MVP movil",
  team: "Dispositivos Moviles",
  description:
    "Aplicacion movil enfocada en una experiencia simple de giro de botella, retos locales y navegacion rapida entre pantallas basicas.",
  context:
    "El proyecto se desarrolla para el curso Dispositivos Moviles como una propuesta de juego interactivo con almacenamiento local de retos y flujo visual sencillo.",
  objectives: {
    general:
      "Construir una aplicacion movil funcional para Pico Botella con interfaz clara, giro aleatorio de botella y administracion local de retos.",
    specific: [
      "Mostrar una pantalla splash y una pantalla home consistentes con el estilo del proyecto.",
      "Permitir crear, editar y eliminar retos de forma local.",
      "Implementar el giro aleatorio de la botella y la seleccion de un reto.",
      "Agregar controles de audio, compartir y ayuda dentro de la interfaz.",
    ],
  },
  scope: {
    inScope: [
      "Pantalla splash y home principal.",
      "Giro de botella y reto aleatorio.",
      "CRUD local de retos.",
      "Botones de audio, ayuda y compartir.",
    ],
    outScope: [
      "Autenticacion de usuarios.",
      "Sincronizacion en la nube.",
      "Pagos o integraciones externas.",
    ],
  },
  // Secciones vaciadas por petición: conservar títulos en blanco
  legalFramework: [],
  roles: [],
  states: [],
  architecture: {},
  security: [],
  links: {
    jira: {
      label: "Jira",
      url: "https://correounivalle-team-a619mkqy.atlassian.net/jira/software/projects/PC/summary?atlOrigin=eyJpIjoiODZjOGI4ZmRlYjZlNDIxMDgxZGZjMDIyOGEzZjVlMTkiLCJwIjoiaiJ9",
      icon: "J",
      description: "Tablero de planeación y seguimiento del sprint.",
    },
    figma: {
      label: "Figma",
      url: "https://figma.com",
      icon: "F",
      description: "Referencia visual del flujo y de las pantallas.",
    },
    repoPlanning: {
      label: "Repositorio de planeación",
      url: "",
      icon: "P",
      description: "",
    },
    repoWork: {
      label: "Repositorio de trabajo",
      url: "https://github.com/pico-botella-project/pico-botella-mobile-app.git",
      icon: "M",
      description: "",
    },
  },
};

if (typeof module !== "undefined") {
  module.exports = { PROJECT_DATA };
}
