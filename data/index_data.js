// index_data.js
// Datos de navegacion de la pagina principal de Pico Botella

const INDEX_DATA = {
  welcome: {
    title: "Documentacion del Proyecto",
    description:
      "Explora la planeacion, historias de usuario, equipo y criterios de calidad del proyecto Pico Botella.",
  },
  navCards: [
    {
      id: "project",
      href: "views/project.html",
      icon: "nav-icon-project",
      title: "Proyecto",
      description: "Resumen general del proyecto y alcance del sprint.",
    },
    {
      id: "stories",
      href: "views/user_stories.html",
      icon: "nav-icon-stories",
      title: "Historias de Usuario",
      description: "Sprint 1 con epicas, criterios de aceptacion y tareas.",
    },
    {
      id: "guidelines",
      href: "views/lineamientos.html",
      icon: "nav-icon-guidelines",
      title: "Lineamientos",
      description: "Calidad, programacion y compromisos del Sprint 1.",
    },
    {
      id: "sitemap",
      href: "views/site_map.html",
      icon: "nav-icon-sitemap",
      title: "Mapa del Sitio",
      description: "Estructura de navegacion de la documentacion del proyecto.",
    },
    {
      id: "iso25010",
      href: "views/iso_25010.html",
      icon: "nav-icon-iso",
      title: "ISO/IEC 25010",
      description: "Resumen de calidad aplicado a la app movil.",
    },
    {
      id: "patterns",
      href: "views/design_patterns.html",
      icon: "nav-icon-patterns",
      title: "Patrones de Diseno",
      description: "Patrones simples usados para interfaz y persistencia local.",
    },
    {
      id: "team",
      href: "views/team_distribution.html",
      icon: "nav-icon-team",
      title: "Distribucion del Equipo",
      description: "Asignacion de historias y tareas del Sprint 1.",
    },
    {
      id: "members",
      href: "views/team_members.html",
      icon: "nav-icon-members",
      title: "Perfil del Equipo",
      description: "Integrantes y roles del curso Dispositivos Moviles.",
    },
  ],
  footer: {
    lines: [
      "© 2026 Pico Botella - Dispositivos Moviles",
      "Equipo de desarrollo - Sprint 1",
    ],
  },
};
