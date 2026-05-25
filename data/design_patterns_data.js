// design_patterns_data.js
// Patrones de diseno para Pico Botella

const DESIGN_PATTERNS_DATA = {
  meta: {
    title: "Patrones de Diseno",
    subtitle: "Soluciones simples para la app Pico Botella",
    description:
      "El proyecto usa patrones ligeros para mantener una base clara, modular y facil de evaluar en el curso Dispositivos Moviles.",
  },
  categories: [
    {
      id: "ui",
      name: "Interfaz y Componentes",
      color: "indigo",
      description: "Organizacion visual y reutilizacion de pantallas y controles.",
      patterns: [
        {
          id: "componentes",
          name: "Componentes reutilizables",
          type: "UI",
          intent: "Separar Splash, Home, Toolbar y Dialogos en partes pequenas y reutilizables.",
          problem: "Una sola vista grande dificulta cambios y pruebas.",
          solution: "Dividir la interfaz en componentes pequenos con responsabilidades claras.",
          benefits: ["Mantenimiento sencillo", "Reuso de UI", "Lectura mas clara"],
          relatedFiles: ["project_data.js"],
        },
      ],
    },
    {
      id: "data",
      name: "Persistencia Local",
      color: "emerald",
      description: "Almacenamiento y recuperacion de retos sin depender de internet.",
      patterns: [
        {
          id: "repository",
          name: "Repository local",
          type: "Data",
          intent: "Encapsular el acceso a storage local o base ligera.",
          problem: "La UI no debe conocer detalles de almacenamiento.",
          solution: "Usar una capa intermedia para leer y escribir retos.",
          benefits: ["Menos acoplamiento", "Pruebas mas faciles", "Cambio de storage simple"],
          relatedFiles: ["backlog_planning.js"],
        },
      ],
    },
  ],
};

if (typeof module !== "undefined") {
  module.exports = { DESIGN_PATTERNS_DATA };
}
