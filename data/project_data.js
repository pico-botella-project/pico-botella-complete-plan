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
  legalFramework: [
    {
      icon: "🧭",
      title: "Enunciado y alcance",
      content:
        "El proyecto toma como base el enunciado del miniproyecto y limita su ejecución a la documentación y construcción del Sprint 1.",
    },
    {
      icon: "📝",
      title: "Lineamientos de entrega",
      content:
        "La planeación usa backlog, Jira, repositorio y validación en navegador como evidencias principales de avance.",
    },
    {
      icon: "✅",
      title: "Criterios de validación",
      content:
        "Las páginas deben cargar desde datos, el tema debe mantenerse entre vistas y el exportador debe generar archivos listos para Jira.",
    },
  ],
  roles: [
    {
      name: "Lider de producto",
      description: "Define alcance, prioriza entregas y valida coherencia con el enunciado.",
      color: "#f97316",
      icon: "🧭",
      functions: [
        "Organizar la planeación del sprint",
        "Revisar cumplimiento de lineamientos",
        "Alinear evidencias con la documentación",
      ],
      restrictions: ["No debe cerrar historias sin validación del equipo."],
    },
    {
      name: "Frontend y UX",
      description: "Construye la experiencia visual y asegura navegación clara en móvil.",
      color: "#8b5cf6",
      icon: "🎨",
      functions: [
        "Diseñar vistas y componentes",
        "Mantener consistencia visual",
        "Revisar accesibilidad básica",
      ],
      restrictions: ["No debe introducir flujos no previstos por el sprint."],
    },
    {
      name: "Datos y soporte técnico",
      description: "Asegura persistencia local, exportación y estabilidad general del sitio.",
      color: "#10b981",
      icon: "💾",
      functions: [
        "Mantener la capa de datos",
        "Preparar exportaciones y respaldo",
        "Verificar funcionamiento en navegador",
      ],
      restrictions: ["No debe romper el formato de las fuentes de datos."],
    },
  ],
  states: [
    {
      icon: "1",
      name: "Definición",
      color: "#f59e0b",
      description: "Se consolida el enunciado, el alcance y los entregables del Sprint 1.",
    },
    {
      icon: "2",
      name: "Planeación",
      color: "#3b82f6",
      description: "Se organizan backlog, equipo, lineamientos y recursos del proyecto.",
    },
    {
      icon: "3",
      name: "Construcción",
      color: "#10b981",
      description: "Se implementan las vistas, los datos y el exportador de historias.",
    },
    {
      icon: "4",
      name: "Validación",
      color: "#8b5cf6",
      description: "Se revisa el sitio en navegador y se corrigen inconsistencias antes de entregar.",
    },
  ],
  architecture: {
    description:
      "Arquitectura estática y modular orientada a datos: cada vista consume un archivo de configuración y un script de renderizado.",
    principles: [
      "Separar datos, vista y lógica de renderizado.",
      "Evitar dependencias innecesarias entre páginas.",
      "Mantener el plan reutilizable para otros proyectos de software.",
    ],
    client: {
      label: "Capa de presentación",
      connectionLabel: "Interacción visual",
      boxes: [
        {
          name: "index.html",
          description: "Entrada general a la documentación.",
          icon: "🏠",
          color: "#f97316",
          tech: ["HTML", "CSS", "JS"],
        },
        {
          name: "views/*.html",
          description: "Páginas temáticas del plan.",
          icon: "📄",
          color: "#0ea5e9",
          tech: ["Secciones", "Navegación"],
        },
      ],
    },
    gateway: {
      label: "Capa de configuración",
      connectionLabel: "Datos compartidos",
      boxes: [
        {
          name: "data/*.js",
          description: "Contenido que alimenta las vistas.",
          icon: "🧩",
          color: "#8b5cf6",
          tech: ["Config", "Backlog", "Equipo"],
        },
        {
          name: "data/config.data.js",
          description: "Metadatos globales del proyecto.",
          icon: "⚙️",
          color: "#10b981",
          tech: ["Título", "Logo", "Links"],
        },
      ],
    },
    microservicesLabel: "Módulos funcionales",
    microservicesConnectionLabel: "Consumo por página",
    services: [
      {
        name: "Proyecto",
        description: "Resumen, alcance, ciclo de vida y enlaces del plan.",
        icon: "📘",
        color: "#f59e0b",
        tech: ["Contexto", "Arquitectura", "Recursos"],
      },
      {
        name: "Historias",
        description: "Backlog Sprint 1 con filtros y exportación.",
        icon: "🗂️",
        color: "#3b82f6",
        tech: ["HU", "Jira", "Puntos"],
      },
      {
        name: "Equipo",
        description: "Distribución, perfiles y carga de trabajo.",
        icon: "👥",
        color: "#10b981",
        tech: ["Capacidad", "Asignación", "Balance"],
      },
    ],
    dataLayer: {
      label: "Persistencia estática",
      boxes: [
        {
          name: "localStorage",
          description: "Tema visual y estado de navegación.",
          icon: "💾",
          color: "#64748b",
          tech: ["Tema", "Preferencias"],
        },
        {
          name: "CSV Jira",
          description: "Exportación descargable para el tablero.",
          icon: "⬇️",
          color: "#ef4444",
          tech: ["Exportación", "Importación"],
        },
      ],
    },
    infrastructure: [
      { icon: "🌐", name: "Navegador", role: "Visualización del plan" },
      { icon: "💻", name: "Repositorio GitHub", role: "Control de versiones" },
      { icon: "📥", name: "Descargas", role: "Salida del CSV de Jira" },
    ],
  },
  security: [
    {
      icon: "🔒",
      measure: "Sin autenticación sensible",
      description: "El plan no maneja credenciales ni datos privados de usuarios finales.",
    },
    {
      icon: "🛡️",
      measure: "Carga local y predecible",
      description: "Las vistas consumen datos locales y evitan dependencias remotas para la documentación.",
    },
    {
      icon: "📦",
      measure: "Exportación controlada",
      description: "La exportación genera un archivo CSV descargable sin escribir fuera del flujo del navegador.",
    },
  ],
  links: {
    jira: {
      label: "Jira",
      url: "https://jira.example.com",
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
      url: "https://github.com/pico-botella-project/pico-botella-complete-plan.git",
      icon: "P",
      description: "Sitio y documentación de la planeación general.",
    },
    repoWork: {
      label: "Repositorio de trabajo",
      url: "https://github.com/pico-botella-project/pico-botella-mobile-app.git",
      icon: "M",
      description: "Aplicación móvil en desarrollo.",
    },
  },
};

if (typeof module !== "undefined") {
  module.exports = { PROJECT_DATA };
}
