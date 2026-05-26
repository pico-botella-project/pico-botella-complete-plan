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
      description:
        "Define alcance, prioriza entregas y valida coherencia con el enunciado.",
      color: "#f97316",
      icon: "🧭",
      functions: [
        "Organizar la planeación del sprint",
        "Revisar cumplimiento de lineamientos",
        "Alinear evidencias con la documentación",
      ],
      restrictions: ["No debe cerrar historias sin validación del equipo."],
    },
        legalFramework: [],
        roles: [],
        states: [],
        architecture: {},
        security: [],
      icon: "🎨",
