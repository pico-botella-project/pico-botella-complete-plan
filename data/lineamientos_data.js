// lineamientos_data.js
// Lineamientos del Sprint 1 para Pico Botella

const LINEAMIENTOS_DATA = {
  meta: {
    title: "Lineamientos del Sprint 1",
    subtitle: "Calidad, programación y entrega para Pico Botella",
    version: "2.0.0",
  },
  overview:
    "Esta página resume los lineamientos mínimos del Miniproyecto 1 para mantener la implementación alineada con el enunciado, la evaluación y las condiciones de entrega.",
  sections: [
    {
      id: "quality",
      title: "Criterios de calidad",
      items: [
        "RA-1: cumplir el comportamiento descrito en las historias de usuario y usar arquitectura MVVM con Repository cuando aplique.",
        "RA-1: usar Room/SQLite o almacenamiento local equivalente para persistencia de retos.",
        "RA-1: emplear Fragments y Navigation en los flujos que lo requieran.",
        "RA-2: mantener una interfaz consistente con las historias de usuario, clara y usable en móvil.",
        "RA-3: gestionar historias y tareas en Jira y evidenciar colaboración activa en GitHub.",
      ],
    },
    {
      id: "programming",
      title: "Lineamientos de programación",
      items: [
        "Dividir pantallas y componentes para mantener modularidad y legibilidad.",
        "Concentrar la lógica de datos en una capa de acceso o repositorio.",
        "Mantener nombres coherentes con el proyecto Pico Botella y el curso Dispositivos Moviles.",
        "Evitar complejidad innecesaria: implementar solo lo que exige el Sprint 1.",
        "Documentar decisiones y archivos nuevos cuando aporten trazabilidad al planeador.",
      ],
    },
    {
      id: "delivery",
      title: "Fechas y entrega",
      items: [
        "Inicio del Sprint 1: 2 de junio de 2026, 6:00 pm.",
        "Monitoría: 9 de junio de 2026, 6:00 pm.",
        "Cierre del Sprint 1: 16 de junio de 2026, 6:00 pm.",
        "La sustentación es en equipo y debe incluir repositorio, Jira y app abierta en emulador o dispositivo.",
        "El PDF de entrega debe contener integrantes, enlace al repositorio y enlace a Jira.",
      ],
    },
    {
      id: "commitments",
      title: "Compromisos del equipo",
      items: [
        "Revisar cada historia antes de marcarla como terminada.",
        "Mantener distribución de tareas balanceada y visible en la documentación.",
        "Evitar commits fuera de la fecha de entrega.",
        "Asegurar cámara encendida durante la sustentación, según el enunciado.",
      ],
    },
  ],
};

if (typeof module !== "undefined") {
  module.exports = { LINEAMIENTOS_DATA };
}
