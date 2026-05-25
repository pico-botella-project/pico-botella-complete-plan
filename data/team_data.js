// team_data.js
// Distribucion del equipo para Pico Botella

const TEAM_DATA = {
  team: "Dispositivos Moviles",
  slogan: "Sprint 1 - Pico Botella",
  description:
    "Equipo de cinco integrantes trabajando el primer sprint del proyecto Pico Botella con enfoque en interfaz, persistencia local y logica del juego.",
  velocity: 18,
  sprintDuration: "1 semana",
  totalSprints: 1,
  totalPoints: 18,
  yearsWorkingTogether: 1,
  epics: [
    { id: "E-UI", name: "Interfaz y Experiencia", color: "#f59e0b", description: "Splash, home, toolbar y dialogos del juego." },
    { id: "E-CORE", name: "Nucleo de juego", color: "#8b5cf6", description: "Giro aleatorio y seleccion de retos." },
    { id: "E-DATA", name: "Persistencia local", color: "#10b981", description: "CRUD local de retos y almacenamiento." },
    { id: "E-SHARE", name: "Compartir y utilidades", color: "#3b82f6", description: "Compartir app y controles complementarios." },
  ],
  sprints: [
    {
      id: "sprint-1",
      name: "Sprint 1",
      duration: "Semana 1",
      color: "#f59e0b",
      totalPoints: 18,
      goal: "Construir la base visual y funcional de Pico Botella con Splash, Home, toolbar, CRUD local y giro inicial.",
      teamNote:
        "Ivan lidera la integracion tecnica, Andrey define la experiencia visual, Juan Francesco resuelve la persistencia y Dylan y Jose apoyan el ajuste de flujos y presentacion.",
      epics: ["E-UI", "E-CORE", "E-DATA", "E-SHARE"],
      stories: [
        {
          code: "HU-01",
          title: "Ventana Splash",
          points: 3,
          assignedTo: "Ivan Ausecha",
          tasks: [
            { id: "T-01-1", title: "Diseñar animación de botella", assignedTo: "Adolfo Andrey Quiceno", role: "UX/UI" },
            { id: "T-01-2", title: "Implementar pantalla Splash y timer 5s", assignedTo: "Ivan Ausecha", role: "Frontend" },
            { id: "T-01-3", title: "Configurar botón atrás para salir de la app", assignedTo: "Juan Francesco Garcia", role: "Frontend" },
          ],
        },
        {
          code: "HU-02",
          title: "Ventana Home Principal",
          points: 5,
          assignedTo: "Adolfo Andrey Quiceno",
          tasks: [
            { id: "T-02-1", title: "Diseñar layout del Home", assignedTo: "Adolfo Andrey Quiceno", role: "UX/UI" },
            { id: "T-02-2", title: "Integrar imagen de botella y contador", assignedTo: "José Martínez", role: "Frontend" },
            { id: "T-02-3", title: "Implementar botón parpadeante", assignedTo: "Ivan Ausecha", role: "Frontend" },
            { id: "T-02-4", title: "Agregar control de sonido de fondo", assignedTo: "Juan Francesco Garcia", role: "Frontend" },
          ],
        },
        {
          code: "HU-03",
          title: "Toolbar personalizada",
          points: 3,
          assignedTo: "José Martínez",
          tasks: [
            { id: "T-03-1", title: "Implementar componente Toolbar", assignedTo: "Adolfo Andrey Quiceno", role: "UX/UI" },
            { id: "T-03-2", title: "Conectar acciones de navegación y audio", assignedTo: "José Martínez", role: "Frontend" },
          ],
        },
        {
          code: "HU-04",
          title: "Calificar la aplicación",
          points: 1,
          assignedTo: "José Martínez",
          tasks: [
            { id: "T-04-1", title: "Implementar acción de calificación simulada", assignedTo: "José Martínez", role: "Frontend" },
          ],
        },
        {
          code: "HU-05",
          title: "Instrucciones del juego",
          points: 2,
          assignedTo: "Dylan Morales",
          tasks: [
            { id: "T-05-1", title: "Crear vista de instrucciones y estilos", assignedTo: "Adolfo Andrey Quiceno", role: "UX/UI" },
            { id: "T-05-2", title: "Implementar pausa y restauración de audio", assignedTo: "Dylan Morales", role: "Frontend" },
          ],
        },
        {
          code: "HU-06",
          title: "Agregar y listar retos",
          points: 5,
          assignedTo: "Ivan Ausecha",
          tasks: [
            { id: "T-06-1", title: "Diseñar vista de lista de retos", assignedTo: "José Martínez", role: "UX/UI" },
            { id: "T-06-2", title: "Implementar almacenamiento local y modelo de reto", assignedTo: "Juan Francesco Garcia", role: "Backend" },
            { id: "T-06-3", title: "Implementar lista con scroll y FAB", assignedTo: "Ivan Ausecha", role: "Frontend" },
          ],
        },
        {
          code: "HU-07",
          title: "Cuadro de diálogo agregar reto",
          points: 2,
          assignedTo: "José Martínez",
          tasks: [
            { id: "T-07-1", title: "Implementar componente de diálogo agregar", assignedTo: "José Martínez", role: "Frontend" },
            { id: "T-07-2", title: "Validar comportamiento del botón Guardar", assignedTo: "Dylan Morales", role: "Frontend" },
          ],
        },
        {
          code: "HU-08",
          title: "Cuadro de diálogo editar reto",
          points: 2,
          assignedTo: "Juan Francesco Garcia",
          tasks: [
            { id: "T-08-1", title: "Implementar diálogo editar con carga de datos", assignedTo: "Adolfo Andrey Quiceno", role: "Frontend" },
            { id: "T-08-2", title: "Guardar cambios en almacenamiento local", assignedTo: "Juan Francesco Garcia", role: "Backend" },
          ],
        },
        {
          code: "HU-09",
          title: "Cuadro de diálogo eliminar reto",
          points: 1,
          assignedTo: "Dylan Morales",
          tasks: [
            { id: "T-09-1", title: "Implementar diálogo de confirmación", assignedTo: "José Martínez", role: "Frontend" },
            { id: "T-09-2", title: "Eliminar registro en almacenamiento local", assignedTo: "Dylan Morales", role: "Backend" },
          ],
        },
        {
          code: "HU-10",
          title: "Compartir aplicación",
          points: 1,
          assignedTo: "Dylan Morales",
          tasks: [
            { id: "T-10-1", title: "Implementar acción de compartir", assignedTo: "Dylan Morales", role: "Frontend" },
          ],
        },
        {
          code: "HU-11",
          title: "Giro de botella aleatorio",
          points: 8,
          assignedTo: "Juan Francesco Garcia",
          tasks: [
            { id: "T-11-1", title: "Implementar motor de giro y animación", assignedTo: "Juan Francesco Garcia", role: "Frontend" },
            { id: "T-11-2", title: "Integrar sonido de giro y control de audio", assignedTo: "Ivan Ausecha", role: "Frontend" },
            { id: "T-11-3", title: "Bloquear y desbloquear el boton de giro", assignedTo: "Ivan Ausecha", role: "Frontend" },
          ],
        },
        {
          code: "HU-12",
          title: "Mostrar reto aleatorio",
          points: 5,
          assignedTo: "Adolfo Andrey Quiceno",
          tasks: [
            { id: "T-12-1", title: "Implementar diálogo personalizado y estilos", assignedTo: "Adolfo Andrey Quiceno", role: "UX/UI" },
            { id: "T-12-2", title: "Consumir API de pokemon y mostrar imagen", assignedTo: "Dylan Morales", role: "Frontend" },
            { id: "T-12-3", title: "Mostrar texto de reto aleatorio desde BD local", assignedTo: "Ivan Ausecha", role: "Frontend" },
          ],
        },
      ],
    },
  ],
};

if (typeof module !== "undefined") {
  module.exports = { TEAM_DATA };
}
