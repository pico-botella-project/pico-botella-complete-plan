// backlog_planning.js
// Planificación del Sprint 1 — Proyecto móvil "Pico Botella"
// Versión: 2.0.0 (según guidelines)

const BACKLOG_PLANNING = {
  version: '2.0.0',
  project: 'Pico Botella',
  sprint1: {
    title: 'Sprint 1 - Miniproyecto 1',
    start: '2026-06-02T18:00:00',
    monitor: '2026-06-09T18:00:00',
    end: '2026-06-16T18:00:00',
    totalPoints: 38,
    epics: [
      { id: 'E-UI', title: 'Interfaz y Experiencia (UI/UX)' },
      { id: 'E-CORE', title: 'Núcleo de juego y lógica' },
      { id: 'E-DATA', title: 'Persistencia local y gestión de retos' },
      { id: 'E-INFRA', title: 'Infraestructura de proyecto y assets' },
    ],

    userStories: [
      {
        code: 'HU-01',
        title: 'Ventana Splash',
        sprint: 'S1',
        epic: 'E-UI',
        points: 3,
        assignedTo: 'Ivan Ausecha',
        description: 'Mostrar ventana splash animada al iniciar la app',
        acceptanceCriteria: [
          'Fondo de color negro sin toolbar.',
          'Ícono animado en forma de botella centrado.',
          'Texto naranja "pico botella" debajo del ícono.',
          'Se muestra por 5 segundos y navega al home.',
          'Back desde home no regresa al splash; cierra la app.',
          'Crear ícono de la app (libre elección).',
        ],
        definitionOfDone: [
          'Splash implementado y probado en emulador y dispositivo.',
          'Animación fluida y sin bloqueos en 60 FPS objetivo.',
          'Icono de app añadido a la build.',
        ],
        tasks: [
          { id: 'T-01-1', title: 'Diseñar animación de botella', assignedTo: 'Adolfo Andrey Quiceno', role: 'UX/UI' },
          { id: 'T-01-2', title: 'Implementar pantalla Splash y timer 5s', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
          { id: 'T-01-3', title: 'Configurar comportamiento de botón atrás', assignedTo: 'Juan Francesco Garcia', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-02',
        title: 'Ventana Home Principal',
        sprint: 'S1',
        epic: 'E-UI',
        points: 5,
        assignedTo: 'Adolfo Andrey Quiceno',
        description: 'Pantalla principal con botella, toolbar personalizada y botón parpadeante',
        acceptanceCriteria: [
          'Fondo que recree piso de madera.',
          'Toolbar personalizada (no la default de Android).',
          'Íconos naranja: estrella, audio on/off, instrucciones, agregar retos, compartir.',
          'Imagen de botella centrada.',
          'Contador regresivo (3→0) en el centro de la botella.',
          'Botón dinámico "Presióname" en la parte inferior (parpadeante).',
          'Sonido de fondo por defecto activo.',
        ],
        definitionOfDone: [
          'Home implementado con layout responsive para móvil.',
          'Contador y botón visual correctos y accesibles.',
          'Sonido integrado con control desde toolbar.',
        ],
        tasks: [
          { id: 'T-02-1', title: 'Diseñar layout del Home (piso madera)', assignedTo: 'Adolfo Andrey Quiceno', role: 'UX/UI' },
          { id: 'T-02-2', title: 'Integrar imagen de botella y contador', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
          { id: 'T-02-3', title: 'Implementar botón parpadeante y animación', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
          { id: 'T-02-4', title: 'Agregar control de sonido de fondo', assignedTo: 'Juan Francesco Garcia', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-03',
        title: 'Toolbar personalizada',
        sprint: 'S1',
        epic: 'E-UI',
        points: 3,
        assignedTo: 'José Martínez',
        description: 'Toolbar negra con bordes redondeados y componentes naranja para control de funcionalidades',
        acceptanceCriteria: [
          'Fondo negro con bordes redondeados y componentes naranjas.',
          'Ícono estrella → navega a Calificar (HU-04).',
          'Ícono audio actúa como interruptor ON/OFF.',
          'Ícono instrucciones → HU-05.',
          'Ícono retos → HU-06.',
          'Ícono compartir → HU-10.',
          'Sutileza en animación touch en cada botón.',
        ],
        definitionOfDone: [
          'Toolbar reutilizable implementada como componente.',
          'Accesibilidad (tamaño táctil) validada.',
        ],
        tasks: [
          { id: 'T-03-1', title: 'Implementar componente Toolbar', assignedTo: 'Adolfo Andrey Quiceno', role: 'UX/UI' },
          { id: 'T-03-2', title: 'Conectar acciones de navegación y audio', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-04',
        title: 'Calificar la aplicación',
        sprint: 'S1',
        epic: 'E-UI',
        points: 1,
        assignedTo: 'José Martínez',
        description: 'Simular calificación usando ejemplo de app Nequi por no estar en Play Store',
        acceptanceCriteria: [
          'Al activar calificar, abrir enlace de ejemplo (Nequi) o simular flujo similar.',
        ],
        definitionOfDone: [
          'Comportamiento de calificación simulado y documentado.',
        ],
        tasks: [
          { id: 'T-04-1', title: 'Implementar acción de calificación (link/simulación)', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-05',
        title: 'Instrucciones del juego',
        sprint: 'S1',
        epic: 'E-UI',
        points: 2,
        assignedTo: 'Dylan Morales',
        description: 'Pantalla de reglas con pausa de audio y navegación de retorno al home',
        acceptanceCriteria: [
          'Si audio estaba ON en home, al entrar a instrucciones se pausa.',
          'Fondo gris oscuro.',
          'Toolbar con título "Reglas del Juego" y back que restaura audio si estaba ON.',
          'Título ¿Cómo se juega? y sección descriptiva en blanco.',
          'Sección ¿Quién gana? y animación de triunfo.',
        ],
        definitionOfDone: [
          'Pantalla de instrucciones implementada y el audio se gestiona correctamente.',
        ],
        tasks: [
          { id: 'T-05-1', title: 'Crear vista de instrucciones y estilos', assignedTo: 'Adolfo Andrey Quiceno', role: 'UX/UI' },
          { id: 'T-05-2', title: 'Implementar pausa/restauración de audio en navegación', assignedTo: 'Juan Francesco Garcia', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-06',
        title: 'Agregar y listar retos',
        sprint: 'S1',
        epic: 'E-DATA',
        points: 5,
        assignedTo: 'Ivan Ausecha',
        description: 'Lista de retos con CRUD local y diálogos para agregar/editar/eliminar',
        acceptanceCriteria: [
          'Si audio ON en home, al entrar se pausa.',
          'Fondo gris oscuro.',
          'Toolbar "Retos" con back y restauración de audio si aplica.',
          'Lista de retos con icono, editar, eliminar y descripción.',
          'Scroll cuando la lista excede pantalla.',
          'Nuevos retos aparecen en la parte superior.',
          'Animaciones touch en editar/eliminar.',
          'Botón flotante naranja abre HU-07 (Agregar reto).',
        ],
        definitionOfDone: [
          'CRUD local implementado con SQLite/Room (o almacenamiento local equivalente).',
          'List rendering y orden correcto (nuevos arriba).',
        ],
        tasks: [
          { id: 'T-06-1', title: 'Diseñar vista de lista de retos', assignedTo: 'Adolfo Andrey Quiceno', role: 'UX/UI' },
          { id: 'T-06-2', title: 'Implementar almacenamiento local y modelo de reto', assignedTo: 'Juan Francesco Garcia', role: 'Backend' },
          { id: 'T-06-3', title: 'Implementar lista con scroll y FAB', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-07',
        title: 'Cuadro de diálogo agregar reto',
        sprint: 'S1',
        epic: 'E-DATA',
        points: 2,
        assignedTo: 'José Martínez',
        description: 'Diálogo para ingresar nuevo reto con validaciones y guardar en BD local',
        acceptanceCriteria: [
          'Diálogo fondo blanco con título "Agregar reto" centrado.',
          'Text input con hint "Escriba el reto" y línea naranja.',
          'Botón "Cancelar" naranja cierra diálogo sin cambios.',
          'Botón "Guardar" inicialmente disabled, se habilita con texto y guarda en BD local.',
          'Guardar añade reto y cierra diálogo; click fuera no cierra.',
        ],
        definitionOfDone: [
          'Diálogo funcional, validaciones de input implementadas y almacenamiento probado.',
        ],
        tasks: [
          { id: 'T-07-1', title: 'Implementar componente de diálogo agregar', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
          { id: 'T-07-2', title: 'Validar comportamiento de enable/disable del botón Guardar', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-08',
        title: 'Cuadro de diálogo editar reto',
        sprint: 'S1',
        epic: 'E-DATA',
        points: 2,
        assignedTo: 'Juan Francesco Garcia',
        description: 'Diálogo para editar un reto existente y guardar cambios en BD local',
        acceptanceCriteria: [
          'Diálogo fondo blanco con título "Editar reto".',
          'Caja de texto muestra descripción actual; línea naranja.',
          'Botón "Cancelar" cierra sin cambios; "Guardar" aplica cambios en BD.',
          'Click fuera no cierra diálogo.',
        ],
        definitionOfDone: [
          'Edición persistente y UI actualiza inmediatamente.',
        ],
        tasks: [
          { id: 'T-08-1', title: 'Implementar diálogo editar con carga de datos', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
          { id: 'T-08-2', title: 'Guardar cambios en almacenamiento local', assignedTo: 'Juan Francesco Garcia', role: 'Backend' },
        ],
      },

      {
        code: 'HU-09',
        title: 'Cuadro de diálogo eliminar reto',
        sprint: 'S1',
        epic: 'E-DATA',
        points: 1,
        assignedTo: 'Dylan Morales',
        description: 'Confirmación para eliminar reto de la lista y BD local',
        acceptanceCriteria: [
          'Diálogo con título "¿Desea eliminar el siguiente reto?:" y descripción del reto.',
          'Botón "NO" naranja cancela y cierra; "SI" elimina y cierra.',
          'Click fuera no cierra diálogo.',
        ],
        definitionOfDone: [
          'Eliminación persistente y actualización inmediata de la lista.',
        ],
        tasks: [
          { id: 'T-09-1', title: 'Implementar diálogo de confirmación', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
          { id: 'T-09-2', title: 'Eliminar registro en almacenamiento local', assignedTo: 'Juan Francesco Garcia', role: 'Backend' },
        ],
      },

      {
        code: 'HU-10',
        title: 'Compartir aplicación',
        sprint: 'S1',
        epic: 'E-UI',
        points: 1,
        assignedTo: 'Dylan Morales',
        description: 'Compartir la app vía el share sheet del SO con texto y enlace de ejemplo.',
        acceptanceCriteria: [
          'Mostrar bottom sheet nativo con canales (WhatsApp, Facebook, Gmail, etc.).',
          'Al seleccionar canal, compartir título "App pico botella", eslogan y URL de ejemplo (Nequi).',
        ],
        definitionOfDone: [
          'Share sheet funciona en emulador y dispositivo; texto correcto.',
        ],
        tasks: [
          { id: 'T-10-1', title: 'Implementar acción de compartir utilizando API nativa', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-11',
        title: 'Giro de botella aleatorio',
        sprint: 'S1',
        epic: 'E-CORE',
        points: 8,
        assignedTo: 'Juan Francesco Garcia',
        description: 'Lógica de giro aleatorio de botella, sonido y bloqueo de interacción hasta finalizar',
        acceptanceCriteria: [
          'Al presionar botón, botella gira 3-5 segundos.',
          'Sonido de giro mientras gira; pausa cuando no gira.',
          'Giro es aleatorio y conserva orientación entre partidas.',
          'Al detenerse, mostrar cuenta regresiva 3→0 en la botella.',
          'Al finalizar cuenta, abrir HU-12 (Mostrar reto aleatorio).',
          'Botón de giro oculto durante la partida y re-aparece al terminar.',
          'Si audio fondo ON, pausar durante la partida y restaurar tras cerrar HU-12.',
        ],
        definitionOfDone: [
          'Giro físico animado y cálculo de ángulo aleatorio verificado.',
          'Sonido sincronizado y bloqueo de UI durante la partida.',
        ],
        tasks: [
          { id: 'T-11-1', title: 'Implementar motor de giro y animación física', assignedTo: 'Juan Francesco Garcia', role: 'Frontend' },
          { id: 'T-11-2', title: 'Integrar sonido de giro y control de audio', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
          { id: 'T-11-3', title: 'Implementar bloqueo/desbloqueo del botón de giro', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-12',
        title: 'Mostrar reto aleatorio',
        sprint: 'S1',
        epic: 'E-CORE',
        points: 5,
        assignedTo: 'Adolfo Andrey Quiceno',
        description: 'Diálogo personalizado que muestra un reto aleatorio con imagen de Pokémon consumida desde la API',
        acceptanceCriteria: [
          'Diálogo negro degradado con borde blanco y transparencia sutil.',
          'Círculo superior muestra imagen aleatoria de pokémon desde la API indicada.',
          'Texto en blanco (bold) con la descripción aleatoria del reto desde BD local.',
          'Botón naranja "Cerrar" en posición especificada; click fuera no cierra.',
          'Cerrar vuelve al home listo para nueva partida.',
        ],
        definitionOfDone: [
          'Diálogo muestra reto aleatorio y consume correctamente la API de pokémon para la imagen.',
        ],
        tasks: [
          { id: 'T-12-1', title: 'Implementar diálogo personalizado y estilos', assignedTo: 'Adolfo Andrey Quiceno', role: 'UX/UI' },
          { id: 'T-12-2', title: 'Consumir API de pokémon y mapear imagen aleatoria', assignedTo: 'Juan Francesco Garcia', role: 'Frontend' },
          { id: 'T-12-3', title: 'Mostrar texto de reto aleatorio desde DB local', assignedTo: 'Ivan Ausecha', role: 'Frontend' },
        ],
      },
    ],

    teamDistribution: [],
    notes: 'Sprint 1 extraído y poblado a partir de docs/guidelines/enunciado.md. Definiciones de Done y tareas añadidas para cada HU según el prompt.',
  },
};

/* Compatibilidad: exponer EMBEDDED_DATA para los scripts existentes */
const EMBEDDED_DATA = {
  picobotella: {
    userStories: BACKLOG_PLANNING.sprint1.userStories,
  },
};

/* Export para ser consumido por Node o CommonJS (tests/integraciones) */
if (typeof module !== 'undefined') {
  module.exports = { BACKLOG_PLANNING, EMBEDDED_DATA };
}


