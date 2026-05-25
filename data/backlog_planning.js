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
        description: 'Yo como Aplicación quiero poder presentar una ventana de splash al jugador para poder mejorar la experiencia de usuario al ingresar a la app.',
        acceptanceCriteria: [
          'La ventana del splash tendrá un fondo de color negro, no debe mostrarse ningún tipo de toolbar, ni inferior ni superior.',
          'Un ícono animado en forma de botella en la parte central de la ventana (el ícono no necesariamente debe ser idéntico al mostrado en la imagen, pero si debe ser animado).',
          'Un texto de color naranja con la frase "pico botella" que debe estar en la parte inferior del ícono animado.',
          'La ventana debe mostrarse al usuario por 5 segundos, para luego desaparecer y mostrar el home principal de la app.',
          'Cuando el usuario esté en el home principal y use el botón de atrás del dispositivo, no debe regresar al splash, debe salir de la app y mostrar el escritorio del teléfono.',
          'Crear un ícono para la app, libre elección.',
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
        description: 'Yo como App quiero poder presentar al jugador una ventana de inicio para poder mostrar el juego y sus diferentes funcionalidades.',
        acceptanceCriteria: [
          'La ventana debe tener un fondo que recree un piso de madera.',
          'No se debe mostrar la toolbar que por defecto trae Android, se debe crear una toolbar personalizada, mayor detalle en la HU 3.0.',
          'Los íconos color naranja de la toolbar: una estrella, un icono de apagado-encendido que por defecto debe estar encendido, un icono para las instrucciones del juego, una imagen para agregar retos y finalmente un ícono para compartir la app.',
          'En la parte central de la ventana debe mostrarse la imagen de una botella (libre elección).',
          'En el centro de la botella debe mostrarse un contador regresivo que va desde el número 3 al 0.',
          'En la parte inferior mostrar un botón dinámico "parpadeante" de color naranja con la palabra "Presióname".',
          'La ventana de inicio por defecto siempre tendrá un sonido de fondo para el juego (libre elección).',
        ],
        definitionOfDone: [
          'Home implementado con layout responsive para móvil.',
          'Contador y botón visual correctos y accesibles.',
          'Sonido integrado con control desde toolbar.',
        ],
        tasks: [
          { id: 'T-02-1', title: 'Diseñar layout del Home (piso madera)', assignedTo: 'Adolfo Andrey Quiceno', role: 'UX/UI' },
          { id: 'T-02-2', title: 'Integrar imagen de botella y contador', assignedTo: 'José Martínez', role: 'Frontend' },
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
        description: 'Yo como App quiero poder mostrarle al jugador una toolbar personalizada para poder que el jugador gestione funcionalidades de la app.',
        acceptanceCriteria: [
          'La toolbar debe tener un fondo de color negro, con bordes redondeados y sus componentes de color naranja.',
          'La toolbar tiene un ícono de estrella que permite calificar la app. Al dar click debe enviar al jugador a la ventana de la HU 4.0: Calificar la aplicación.',
          'Un ícono para el audio de fondo de la app estará por defecto en encendido, al dar click el audio de fondo del juego se pausa y este ícono será reemplazado por uno de apagado. Al dar click sobre el ícono de apagado, el audio de fondo se reinicia y el ícono se reemplaza por el de encendido (hará el trabajo de un interruptor para el audio de fondo).',
          'Un icono para las instrucciones del juego, al dar click sobre este debe enviar al jugador a la ventana de la HU 5.0: Instrucciones del juego.',
          'Un ícono para ver y agregar los retos del juego, al dar click debe enviar al jugador a la ventana de la HU 6.0: Agregar y listar retos.',
          'Un ícono para compartir la app, al dar clic sobre este botón debe dirigir al jugador a la HU 10: Compartir aplicación.',
          'Al dar clic sobre cada uno de los 5 botones se debe crear una sutil animación de touch antes de continuar con la navegación.',
        ],
        definitionOfDone: [
          'Toolbar reutilizable implementada como componente.',
          'Accesibilidad (tamaño táctil) validada.',
        ],
        tasks: [
          { id: 'T-03-1', title: 'Implementar componente Toolbar', assignedTo: 'Adolfo Andrey Quiceno', role: 'UX/UI' },
          { id: 'T-03-2', title: 'Conectar acciones de navegación y audio', assignedTo: 'José Martínez', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-04',
        title: 'Calificar la aplicación',
        sprint: 'S1',
        epic: 'E-UI',
        points: 1,
        assignedTo: 'José Martínez',
        description: 'Yo como App quiero que el jugador pueda calificar la aplicación para poder medir y observar el nivel de satisfacción que tiene la app en los usuarios.',
        acceptanceCriteria: [
          'Debido a que la app no está en la tienda de Google Play se usará como ejemplo la app de Nequi para simular la calificación de una app. Enlace de Nequi en la tienda: https://play.google.com/store/apps/details?id=com.nequi.MobileApp&hl=es_419&gl=es.',
        ],
        definitionOfDone: [
          'Comportamiento de calificación simulado y documentado.',
        ],
        tasks: [
          { id: 'T-04-1', title: 'Implementar acción de calificación (link/simulación)', assignedTo: 'José Martínez', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-05',
        title: 'Instrucciones del juego',
        sprint: 'S1',
        epic: 'E-UI',
        points: 2,
        assignedTo: 'Dylan Morales',
        description: 'Yo como Jugador quiero conocer las instrucciones del juego "pico botella" para poder entender y jugar adecuadamente.',
        acceptanceCriteria: [
          'Tenga en cuenta que si está en el home principal de la app y el botón de audio de fondo está modo ON, al entrar a esta ventana debe pausar el audio.',
          'La ventana debe tener un fondo de color gris oscuro.',
          'Una toolbar personalizada con el título "Reglas del Juego" con un botón de flecha atrás, que al dar click en la flecha debe dirigir al usuario al home principal y restablecer el audio de fondo si inicialmente estuvo en ON.',
          'Un título de color blanco (bold) con el texto ¿Cómo se juega?.',
          'Una descripción de color blanco con el texto "Los jugadores forman un círculo y en el centro colocan el dispositivo móvil, luego tocan el botón parpadeante para girar la botella. El jugador que señale la botella debe cumplir el reto que lanza la app, de lo contrario abandona el juego."',
          'Un título de color blanco (bold) con el texto ¿Quién gana?.',
          'Una descripción de color blanco con el texto: "Gana el último jugador que no abandone el juego."',
          'Una animación que representa el triunfo en el juego (libre elección).',
        ],
        definitionOfDone: [
          'Pantalla de instrucciones implementada y el audio se gestiona correctamente.',
        ],
        tasks: [
          { id: 'T-05-1', title: 'Crear vista de instrucciones y estilos', assignedTo: 'Adolfo Andrey Quiceno', role: 'UX/UI' },
          { id: 'T-05-2', title: 'Implementar pausa/restauración de audio en navegación', assignedTo: 'Dylan Morales', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-06',
        title: 'Agregar y listar retos',
        sprint: 'S1',
        epic: 'E-DATA',
        points: 5,
        assignedTo: 'Ivan Ausecha',
        description: 'Yo como Jugador quiero poder visualizar la lista de retos existentes y poder agregar nuevos retos para poder personalizar y mejorar mi experiencia con el juego.',
        acceptanceCriteria: [
          'Tenga en cuenta que si está en el home principal de la app y el botón de audio de fondo está modo ON, al entrar a esta ventana debe pausar el audio.',
          'La ventana debe tener un fondo de color gris oscuro.',
          'Una toolbar personalizada con el título "Retos" con un botón de flecha atrás, que al dar click en la flecha debe dirigir al usuario al home principal y restablecer el audio de fondo si inicialmente estuvo en ON.',
          'Debe mostrarse la lista de retos agregados por el jugador, cada item de la lista contiene un ícono en la parte superior izquierda (libre elección), un ícono para editar y eliminar el reto, una línea horizontal, y finalmente en la parte inferior la descripción del reto.',
          'Si la lista de retos supera el tamaño de la pantalla, debe permitir hacer scroll para continuar viendo el listado de retos.',
          'Cada vez que se agregue un reto a la lista, ese reto debe ubicarse en la parte superior de la lista, no debe quedar en la parte inferior.',
          'Al dar clic sobre los botones de editar y eliminar, se debe crear una sutil animación de touch antes de continuar con la navegación.',
          'Un botón flotante de color naranja que al dar click lance el cuadro de diálogo de la HU 7.0: Cuadro de diálogo agregar reto.',
          'Al dar click en el botón de editar, se lanza el cuadro de diálogo de la HU 8.0: Cuadro de diálogo editar reto.',
          'Al dar click en el botón de eliminar, se lanza el cuadro de diálogo de la HU 9.0: Cuadro de diálogo eliminar reto.',
        ],
        definitionOfDone: [
          'CRUD local implementado con SQLite/Room (o almacenamiento local equivalente).',
          'List rendering y orden correcto (nuevos arriba).',
        ],
        tasks: [
          { id: 'T-06-1', title: 'Diseñar vista de lista de retos', assignedTo: 'José Martínez', role: 'UX/UI' },
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
        description: 'Yo como App quiero poder mostrarle al jugador un cuadro de diálogo para poder que el jugador agregue los retos que desee.',
        acceptanceCriteria: [
          'Un cuadro de diálogo que tenga un fondo de color blanco.',
          'Un título en la parte superior con el texto "Agregar reto", centrado y en color negro (bold).',
          'Una caja de texto con el hint: "Escriba el reto". La línea que se crea por defecto en la caja debe ser de color naranja.',
          'Un botón con la palabra "Cancelar" de color naranja. Al dar click sobre el botón cancelar debe quitarse el cuadro de diálogo y dejar al jugador en la ventana de "Agregar y listar retos", HU 6.0: Agregar y listar retos.',
          'Un botón con la palabra "Guardar" que inicialmente debe estar inhabilitado (bloquear click) y que solo se habilita en color naranja cuando en la caja de texto se ingresen datos, y viceversa.',
          'Cuando el botón de guardar esté habilitado, al dar click debe quitarse el cuadro de diálogo y guardar el reto en la base de datos local (SQLite) e inmediatamente listarse en la ventana de "Agregar y listar retos", HU 6.0: Agregar y listar retos.',
          'El diálogo solo desaparece de la pantalla al dar clic en el botón cancelar o guardar, si se da click por fuera del diálogo no debe quitarse el diálogo.',
        ],
        definitionOfDone: [
          'Diálogo funcional, validaciones de input implementadas y almacenamiento probado.',
        ],
        tasks: [
          { id: 'T-07-1', title: 'Implementar componente de diálogo agregar', assignedTo: 'José Martínez', role: 'Frontend' },
          { id: 'T-07-2', title: 'Validar comportamiento de enable/disable del botón Guardar', assignedTo: 'Dylan Morales', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-08',
        title: 'Cuadro de diálogo editar reto',
        sprint: 'S1',
        epic: 'E-DATA',
        points: 2,
        assignedTo: 'Juan Francesco Garcia',
        description: 'Yo como App quiero poder mostrarle al jugador un cuadro de diálogo para poder que el jugador edite o modifique un determinado reto.',
        acceptanceCriteria: [
          'Un cuadro de diálogo que tenga un fondo de color blanco.',
          'Un título en la parte superior con el texto "Editar reto", centrado y en color negro (bold).',
          'Una caja de texto donde debe mostrarse la descripción del reto que quiere editar, esta información viene de la base de datos. La línea que se crea por defecto en la caja debe ser de color naranja.',
          'Un botón con la palabra "Cancelar" de color naranja. Al dar click sobre el botón cancelar debe quitarse el cuadro de diálogo y dejar al jugador en la ventana de "Agregar y listar retos", HU 6.0: Agregar y listar retos.',
          'Un botón con la palabra "Guardar" de color naranja.',
          'Al dar click sobre el botón "Guardar" debe quitarse el cuadro de diálogo y guardar el reto modificado en la base de datos local (SQLite) e inmediatamente listarse en la ventana de "Agregar y listar retos", HU 6.0: Agregar y listar retos.',
          'El diálogo solo desaparece de la pantalla al dar clic en el botón cancelar o guardar, si se da click por fuera del diálogo no debe quitarse el diálogo.',
        ],
        definitionOfDone: [
          'Edición persistente y UI actualiza inmediatamente.',
        ],
        tasks: [
          { id: 'T-08-1', title: 'Implementar diálogo editar con carga de datos', assignedTo: 'Adolfo Andrey Quiceno', role: 'Frontend' },
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
        description: 'Yo como App quiero poder mostrarle al jugador un cuadro de diálogo para poder que el jugador elimine un determinado reto.',
        acceptanceCriteria: [
          'Un cuadro de diálogo que tenga un fondo de color blanco.',
          'Un título en la parte superior con el texto "¿Desea eliminar el siguiente reto?:", centrado y en color negro (bold).',
          'Un texto que muestre la descripción del reto que quiere eliminar, esta información viene de la base de datos.',
          'Un texto con la palabra "NO" de color naranja. Al dar click sobre el botón "NO" debe quitarse el cuadro de diálogo y dejar al jugador en la ventana de "Agregar y listar retos", HU 6.0: Agregar y listar retos.',
          'Un texto con la palabra "SI" de color naranja. Al dar click sobre el texto "SI", debe quitarse el cuadro de diálogo y eliminar el reto en la base de datos local (SQLite) e inmediatamente no debería listarse ese reto en la ventana de "Agregar y listar retos", HU 6.0: Agregar y listar retos.',
          'El diálogo solo desaparece de la pantalla al dar clic en el texto "NO" o "SI", al dar click por fuera del diálogo no debe quitarse el diálogo.',
        ],
        definitionOfDone: [
          'Eliminación persistente y actualización inmediata de la lista.',
        ],
        tasks: [
          { id: 'T-09-1', title: 'Implementar diálogo de confirmación', assignedTo: 'José Martínez', role: 'Frontend' },
          { id: 'T-09-2', title: 'Eliminar registro en almacenamiento local', assignedTo: 'Dylan Morales', role: 'Backend' },
        ],
      },

      {
        code: 'HU-10',
        title: 'Compartir aplicación',
        sprint: 'S1',
        epic: 'E-UI',
        points: 1,
        assignedTo: 'Dylan Morales',
        description: 'Yo como App quiero que el jugador pueda compartir la app por diferentes canales de comunicación para poder que la app incremente sus descargas.',
        acceptanceCriteria: [
          'Se muestra un bottom sheet propio del sistema operativo, con los diferentes canales de envío, WhatsApp, Facebook, Gmail, Messenger, etc.',
          'Al seleccionar alguno de los medios de envío, por ejemplo WhatsApp, debe enviarse el título de app "App pico botella", un eslogan con la frase "Solo los valientes lo juegan !!" y finalmente la url para que el usuario pueda descargar la app. Se usará como ejemplo la url de Nequi: https://play.google.com/store/apps/details?id=com.nequi.MobileApp&hl=es_419&gl=es.',
        ],
        definitionOfDone: [
          'Share sheet funciona en emulador y dispositivo; texto correcto.',
        ],
        tasks: [
          { id: 'T-10-1', title: 'Implementar acción de compartir utilizando API nativa', assignedTo: 'Dylan Morales', role: 'Frontend' },
        ],
      },

      {
        code: 'HU-11',
        title: 'Giro de botella aleatorio',
        sprint: 'S1',
        epic: 'E-CORE',
        points: 8,
        assignedTo: 'Juan Francesco Garcia',
        description: 'Yo como Jugador quiero hacer girar una botella por medio de un botón para poder conocer el reto que debe realizar un determinado jugador.',
        acceptanceCriteria: [
          'Al presionar el botón parpadeante de color naranja la botella debe girar por ciertos segundos (libre elección de tiempo), se aconseja que sea entre 3 a 5 segundos.',
          'Mientras la botella esté girando se debe recrear el sonido característico de una botella cuando se hace girar sobre una superficie plana. Debe pausar el sonido cuando la botella no esté en movimiento.',
          'Recuerde que el giro de la botella es aleatorio, es decir, que cada vez que se detenga la botella, apuntará en una dirección diferente (aleatorio).',
          'Si la botella se detiene apuntando al sur, por ejemplo, cuando se presione nuevamente el botón, la botella deberá empezar a girar a partir de esa dirección en la que se detuvo anteriormente.',
          'Cuando se detenga la botella, inmediatamente debe mostrarse en el centro de la botella un texto de color naranja con una cuenta regresiva que irá desde el número 3 al 0 (3,2,1,0).',
          'Cuando la cuenta regresiva llegue a 0, inmediatamente debe mostrarse el cuadro de diálogo de la HU 12: Mostrar reto aleatorio.',
          'Una vez se presione el botón que hace girar la botella, este debe desaparecer momentáneamente hasta que la cuenta regresiva esté en 0. Una vez llegue a 0 volverá a mostrarse el botón, listo para hacer girar la botella nuevamente.',
          'Si el botón de audio de fondo de la app está encendido y se presiona el botón que hace girar la botella, este sonido debe pausarse hasta que la partida termine, es decir cuando el jugador observe el reto del cuadro de diálogo de la HU 12 y le de click en el botón "cerrar" del diálogo.',
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
        description: 'Yo como App quiero mostrar un cuadro de diálogo al jugador para poder conocer el reto aleatorio que debe realizar un determinado jugador.',
        acceptanceCriteria: [
          'Un cuadro diálogo personalizado con un fondo negro degradado, una transparencia sutil y con bordes redondeados de color blanco.',
          'En la parte superior del diálogo, crear un círculo con borde blanco y fondo negro. Cada vez que se muestre el diálogo con un reto aleatorio, también se mostrará la imagen aleatoria de un pokémon. La lista de pokemones se deberá consumir de la API: https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json.',
          'Un texto de color blanco (bold) que mostrará el reto a realizar. Se debe traer la descripción del reto desde la base de datos local y debe ser aleatorio.',
          'Un botón de color naranja con el texto "Cerrar", el botón debe ubicarse en la parte inferior-central del diálogo.',
          'Al dar click en el botón "Cerrar", el diálogo desaparece y el juego queda nuevamente en la ventana principal, listo para una nueva partida.',
          'El diálogo solo desaparece de la pantalla al dar click en el botón "Cerrar", al dar click por fuera del diálogo no debe quitarse el diálogo.',
        ],
        definitionOfDone: [
          'Diálogo muestra reto aleatorio y consume correctamente la API de pokémon para la imagen.',
        ],
        tasks: [
          { id: 'T-12-1', title: 'Implementar diálogo personalizado y estilos', assignedTo: 'Adolfo Andrey Quiceno', role: 'UX/UI' },
          { id: 'T-12-2', title: 'Consumir API de pokémon y mapear imagen aleatoria', assignedTo: 'Dylan Morales', role: 'Frontend' },
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


