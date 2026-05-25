## Enunciado — Sprint 1

A continuación se presenta el enunciado del Sprint 1 con las Historias de Usuario (HU), criterios y condiciones de entrega. El contenido textual se mantiene exactamente como en la versión original; aquí está reorganizado para facilitar su lectura y uso como documento de planeación.

---

### HU 1.0 — Ventana Splash

1.Ventana Splash ID: HU 1.0 HU 1.0: Ventana Splash Yo como (Actor): Aplicación Quiero (Acción): Poder presentar una ventana de splash al jugador Para poder (Consecuencia): Mejorar la experiencia de usuario al ingresar a la app

Espero que: Cada vez que el jugador ingrese a la app se muestre inicialmente un ventana splash

Criterio 1: La ventana del splash tendrá un fondo de color negro, no debe mostrarse ningún tipo de toolbar, ni inferior ni superior.

Criterio 2: Un ícono animado en forma de botella en  la parte central de la ventana (el ícono no necesariamente debe ser idéntico al mostrado en la anterior imagen, pero si debe ser animado).

Criterio 3: Un texto de color naranja con la frase “pico botella” que de debe estar en la parte inferior del ícono animado.

Criterio 4: La ventana debe mostrarse al usuario por 5 segundos, para luego desaparecer y mostrar el home principal de la app.

Criterio 5:Cuando el usuario esté en el home principal y use el botón de atrás del dispositivo, no debe regresar al splash, debe salir de la app y mostrar el escritorio del teléfono.

Criterio 6: Crear un ícono para la app, libre elección.

---

### HU 2.0 — Ventana Home Principal

2.Ventana Home Principal ID: HU 2.0 HU 2.0: Ventana Home Principal Yo como (Actor): App Quiero (Acción): Poder presentar al jugador una ventana de inicio Para poder (Consecuencia): Mostrar el juego y sus diferentes funcionalidades

Criterio 1: La ventana debe tener un fondo que recree un piso de madera.

Criterio 2: No se debe mostrar la toolbar que por defecto trae android, se debe crear una toolbar personalizada, mayor detalle en la HU 3.0

Criterio 3: Los íconos color naranja de la toolbar: una estrella, un icono de apagado-encendido que por defecto debe estar encendido, un icono para las instrucciones del juego, una imagen para agregar retos y finalmente un ícono para compartir la app.

Criterio 4: En la parte central de la ventana debe mostrarse la imagen de una botella (libre elección).

Criterio 5: En el centro de la botella debe mostrarse un contador regresivo que que va desde el número 3 al 0

Criterio 6: En la parte inferior mostrar un botón dinámico “parpadeante” de color naranja con la palabra “Presióname”

Criterio 7: La ventana de inicio por defecto siempre tendrá un sonido de fondo para el juego (libre elección)

---

### HU 3.0 — Toolbar personalizada

3.Toolbar personalizada ID: HU 3.0 HU 3.0: Toolbar personalizada Yo como (Actor): App Quiero (Acción): Poder mostrarle al jugador una toolbar personalizada Para poder (Consecuencia): Que el jugador gestione funcionalidades de la app

Criterio 1: La toolbar debe tener un fondo de color negro, con bordes redondeados y sus componentes de color naranja.

Criterio 2: La toolbar tiene un ícono de estrella que permite calificar la app. Al dar click debe enviar al jugador a la ventana de la  HU 4.0:  Calificar la aplicación

Criterio 3: Un ícono para el audio de fondo de la app, estará por defecto en encendido, al dar click el audio de fondo del juego se pausa y este ícono será reemplazado por uno de apagado (ver imagen). Al dar click sobre el ícono de apagado, el audio de fondo se reinicia y el ícono se reemplaza por el de encendido.(hará el trabajo de un interruptor para el audio de fondo)

Criterio 4: Un icono para las instrucciones del juego, al dar click sobre este debe enviar al jugador a la ventana de la HU 5.0:  Instrucciones del juego

Criterio 5:Un ícono para ver y  agregar los retos del juego, al dar click debe enviar al jugador a la ventana de la HU 6.0:  Agregar y listar retos

Criterio 6:Un ícono para compartir la app, al dar clic sobre este botón debe dirigir al jugador a la HU 10: Compartir aplicación

Criterio 7: Al dar clic sobre cada uno de los 5 botones  se debe crear una sutil animación de touch antes de continuar con la navegación.

---

### HU 4.0 — Calificar la aplicación

4.Calificar la aplicación ID: HU 4.0 HU 4.0: Calificar la aplicación Yo como (Actor): App Quiero (Acción): Que el jugador pueda calificar la aplicación Para poder (Consecuencia): Medir y observar el nivel de satisfacción que tiene la app en los usuarios

Criterio 1: Debido a que la app no está en la tienda de Google Play se usará como ejemplo la app de Nequi para simular la calificación de una app. Enlace de Nequi en la tienda: https://play.google.com/store/apps/details?id=com.nequi.MobileApp&hl=es_419&gl=es

---

### HU 5.0 — Instrucciones del juego

5.Instrucciones del juego ID: HU 5.0 HU 5.0: Instrucciones del juego Yo como (Actor): Jugador Quiero (Acción): Conocer las instrucciones del juego “pico botella” Para poder (Consecuencia): Entender y jugar adecuadamente

Criterio 1: Tenga en cuenta que si está en el home principal de la app  y el botón de audio de fondo está modo ON,al entrar a esta ventana debe pausar el audio.

Criterio 2: La ventana debe tener un fondo de color gris oscuro.

Criterio 3: Una toolbar personalizada con el título “Reglas del Juego” con un botón de flecha atrás, que al dar click en la flecha debe dirigir al usuario al home principal y restablecer el audio de fondo si inicialmente estuvo en ON.

Cireterio 4: Un título de color blanco (bold) con el texto ¿Cómo se juega?

Criterio 5: Una descripción de color blanco con el texto “Los jugadores forman un círculo y en el centro colocan el dispositivo móvil, luego tocan el botón parpadeante para girar la botella.El jugador que señale la botella debe cumplir el reto que lanza la app, de lo contrario abandona el juego.”

Criterio 6: Un título de color blanco (bold) con el texto ¿Quién gana? Criterio 7: Una descripción de color blanco con el texto: “Gana el último jugador que no abandone el juego.”  Criterio 8: Una animación que representa el triunfo en el juego (libre elección) 6.Agregar y listar retos ID: HU 6.0 HU 6.0: Agregar y listar retos Yo como (Actor): Jugador Quiero (Acción): Poder visualizar la lista de retos existentes y poder agregar nuevos retos Para poder (Consecuencia): Personalizar y mejorar mi experiencia con el juego               Criterio 1: Tenga en cuenta que si está en el home principal de la app  y el botón de audio de fondo está modo ON, al entrar a esta ventana debe pausar el audio.  Criterio 2: La ventana debe tener un fondo de color gris oscuro.  Criterio 3: Una toolbar personalizada con el título “Retos” con un botón de flecha atrás, que al dar click en la flecha debe dirigir al usuario al home principal y restablecer el audio de fondo si inicialmente estuvo en ON.  Criterio 4: Debe mostrarse la lista de retos agregados por el jugador, cada item de la lista contiene un ícono en la parte superior izquierda (libre elección), un ícono para editar y eliminar el reto, una línea horizontal, y finalmente en la parte inferior la descripción del reto. Criterio 5: Si la lista de retos supera el tamaño de la pantalla, debe permitir hacer scroll para continuar viendo el listado de retos.  Criterio 6: Cada vez que se agregue un reto a la lista, ese reto debe ubicarse en la parte superior de la lista, no debe quedar en la parte inferior.   Criterio 7: Al dar clic sobre los botones de editar y eliminar, se debe crear una sutil animación de touch antes de continuar con la navegación.  Criterio 8: Un botón flotante de color naranja que al dar click lance el cuadro de díalogo de la HU 7.0:  Cuadro de diálogo agregar reto  Criterio 9: Al dar click en el botón de editar, se lanza el cuadro de diálogo de la HU 8.0:  Cuadro de diálogo editar reto  Criterio 10: Al dar click en el botón de eliminar, se lanza el cuadro de diálogo de la HU 9.0:  Cuadro de diálogo eliminar reto                                    7.Cuadro de diálogo agregar reto ID: HU 7.0 HU 7.0: Cuadro de diálogo agregar reto Yo como (Actor): App. Quiero (Acción): Poder mostrarle al jugador un cuadro de diálogo. Para poder (Consecuencia): Que el jugador agregue los retos que desee.     Criterio 1: Un cuadro de díalogo que tenga un fondo de color blanco.  Criterio 2: Un título en la parte superior con el texto “ Agregar reto”, centrado y en color negro (bold)  Criterio 3: Una caja de texto con el hint : “Escriba el reto”.La línea que se crea por defecto en la caja debe ser de color naranja.  Criterio 4: Un botón con la palabra “Cancelar” de color naranja. Al dar click sobre el botón cancelar debe quitarse el cuadro de diálogo y dejar al jugador en la ventana de “Agregar y listar retos”, HU 6.0: Agregar y listar retos.  Criterio 5: Un botón con la palabra “Guardar” que inicialmente debe estar inhabilitado (bloquear click) y que solo se habilita en color naranja cuando en la caja de texto se ingrese datos, y viceversa , es decir si una vez la caja de texto tenga datos y por alguna razón se borre el texto ingresado, el botón volverá a su estado inhabilitado.  Criterio 6: Cuando el botón de guardar esté habilitado, al dar click debe quitarse el cuadro de diálogo y  guardar el reto en la base de datos local (SQLite) e inmediatamente listarse en la ventana de “Agregar y listar retos”, HU 6.0: Agregar y listar retos.  Criterio 7: El diálogo solo desaparece de la pantalla al dar clic en el botón cancelar o guardar, si se da click por fuera del diálogo no debe quitarse el diálogo.  8.Cuadro de diálogo editar reto ID: HU 8.0 HU 8.0: Cuadro de diálogo editar reto Yo como (Actor): App Quiero (Acción): Poder mostrarle al jugador un cuadro de diálogo. Para poder (Consecuencia): Que el jugador edite o modifique un determinado reto.     Criterio 1: Un cuadro de díalogo que tenga un fondo de color blanco. Criterio 2: Un título en la parte superior con el texto “Editar reto”, centrado y en color negro (bold)  Criterio 3: Una caja de texto donde debe mostrarse la descripción del reto que quiere editar, esta información obviamente viene de la base de datos. La línea que se crea por defecto en la caja debe ser de color naranja.  Criterio 4: Un botón con la palabra “Cancelar” de color naranja. Al dar click sobre el botón cancelar debe quitarse el cuadro de diálogo y dejar al jugador en la ventana de “Agregar y listar retos”, HU 6.0: Agregar y listar retos.  Criterio 5: Un botón con la palabra “Guardar” de color naranja.  Criterio 6: Al dar click sobre el botón “Guardar” debe quitarse el cuadro de diálogo y  guardar el reto modificado en la base de datos local (SQLite) e inmediatamente listarse en la ventana de “Agregar y listar retos”, HU 6.0: Agregar y listar retos.  Criterio 7: El diálogo solo desaparece  de la pantalla al dar clic en el botón cancelar o guardar, si se da click por fuera del diálogo no debe quitarse el diálogo.      9.Cuadro de diálogo eliminar reto ID: HU 9.0 HU 9.0: Cuadro de diálogo eliminar reto Yo como (Actor): App Quiero (Acción): Poder mostrarle al jugador un cuadro de diálogo. Para poder (Consecuencia): Que el jugador elimine un determinado reto.      Criterio 1: Un cuadro de díalogo que tenga un fondo de color blanco.  Criterio 2: Un título en la parte superior con el texto “¿Desea eliminar el siguiente reto?:”, centrado y en color negro (bold)  Criterio 3: Un texto que muestre la descripción del reto que quiere eliminar, esta información obviamente viene de la base de datos.   Criterio 4: Un texto con la palabra “NO” de color naranja. Al dar click sobre el botón “NO” debe quitarse el cuadro de diálogo y dejar al jugador en la ventana de “Agregar y listar retos”, HU 6.0: Agregar y listar retos.  Criterio 5: Un texto con la palabra “SI” de color naranja. Al dar click sobre el texto “SI”, debe quitarse el cuadro de diálogo y eliminar el reto en la base de datos local (SQLite) e inmediatamente no debería listarse ese reto en la ventana de “Agregar y listar retos”, HU 6.0: Agregar y listar retos.  Criterio 6: El diálogo solo desaparece de la pantalla al dar clic en el texto “NO” o “SI”, al dar click por fuera del diálogo no debe quitarse el diálogo.       10.Compartir aplicación ID: HU 10 HU 10: Compartir aplicación Yo como (Actor): App Quiero (Acción): Que el jugador pueda compartir la app por diferentes canales de comunicación Para poder (Consecuencia): Que la app incremente sus descargas               Criterio 1:Se muestra un bottom sheet propio del sistema operativo, con los diferentes canales de envío, whatsApp, Facebook, Gmail, Messenger, etc.  Criterio 2: Al seleccionar alguno de los  medios de envío, por ejemplo whatSapp, debe enviarse el título de app “App pico botella”, un eslogan con la frase “Solo los valientes lo juegan !!” y finalmente la url para que el usuario pueda descargar la app. Como se indicó en su momento se usará como ejemplo la url de Nequi : https://play.google.com/store/apps/details?id=com.nequi.MobileApp&hl=es_419&gl=es               11.Giro de botella aleatorio ID: HU 11 HU 11: Giro de botella aleatorio Yo como (Actor): Jugador Quiero (Acción): Hacer girar una botella por medio de un botón. Para poder (Consecuencia): Conocer el reto que debe realizar un determinado jugador.               Criterio 1: Al presionar el botón parpadeante de color naranja la botella debe girar por ciertos segundos (libre elección de tiempo), se aconseja que sea entre 3 a 5 segundos.  Criterio 2: Mientras la botella esté girando se debe recrear el sonido característico de una botella cuando  se hace girar sobre una superficie plana. Obviamente debe pausar el sonido cuando la botella no esté en movimiento. (Libre elección el uso del sonido de fondo)  Criterio 3: Recuerde que el giro de la botella es aleatorio, es decir, que cada vez que se detenga la botella, apuntará en una dirección diferente (aleatorio).  Criterio 4: Si la botella se detiene apuntando al sur, por ejemplo, cuando se presione nuevamente el botón, la botella deberá empezar a girar a partir de esa dirección en la que se detuvo anteriormente.  Criterio 5: Cuando se detenga la botella , inmediatamente debe mostrarse en el centro de la botella un texto de color naranja con una cuenta regresiva que irá desde el número 3 al 0. (3,2,1,0).  Criterio 6: Cuando la cuenta regresiva llegue a 0, inmediatamente debe mostrarse el cuadro de diálogo de la HU 12: Mostrar reto aleatorio.   Criterio 7: Una vez se presione el botón que hace girar la botella, este debe desaparecer momentáneamente hasta que la cuenta regresiva esté en 0, Una vez llegue a 0 volverá a mostrarse el botón, listo para hacer girar la botella nuevamente. Este bloqueo debe hacerse para que el usuario no pueda manipular el botón mientras la partida esté en proceso.  Criterio 8: Si el botón de audio de fondo de la app está encendido y se presiona el botón que hace girar la botella, este sonido debe pausarse hasta que la partida termine, es decir cuando el jugador observe el reto  del cuadro de diálogo de la HU 12: Mostrar reto aleatorio y le de click en el botón “cerrar” del diálogo.                                      12.Mostrar reto aleatorio ID: HU 12 HU 12: Mostrar reto aleatorio Yo como (Actor): App Quiero (Acción): Mostrar una cuadro de diálogo al jugador. Para poder (Consecuencia):  Conocer el reto aleatorio que debe realizar un determinado jugador.                     Criterio 1: Un cuadro diálogo personalizado con un fondo negro degradado, una transparencia sutil y con bordes redondeados de color blanco.  Criterio 2: En la parte superior del diálogo, crear un círculo con borde blanco y fondo negro. Cada vez que se muestre el diálogo con un reto aleatorio, también se mostrará la imagen aleatoria de un pokémon. La lista de pokemones se deberá consumir de la siguiente API: https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json  Criterio 3: Un texto de color blanco (bold) que mostrará el reto a realizar. Recuerde que se debe traer la descripción del reto desde la base de datos local y debe ser aleatorio.  Criterio 4: Un botón de color naranja con el texto “Cerrar”, el botón debe ubicarse en la parte inferior-central del díalgo, la parte superior del botón por dentro del díalogo, y la parte inferio, por fuera del diálogo.  Criterio 5: Al dar click en el botón “Cerrar”, el diálogo desaparece y el juego queda nuevamente en la ventana principal, listo para una nueva partida.  Criterio 6: El diálogo solo desaparece de la pantalla al dar click en el botón “Cerrar”, al dar click por fuera del diálogo no debe quitarse el diálogo.  Evaluación del Miniproyecto 1  CALIFICACIÓN EQUIPO RA % ITEM A CALIFICAR RA-1 Implementa aplicaciones nativas para una plataforma móvil en particular, tomando ventaja de las facilidades que brinda la plataforma seleccionada.  60 ● Uso de arquitectura MVVM (con Repository) ● Uso de corrutinas ● Funcionamiento de la app como se indica en las Historias de Usuario ● Uso de Bases de Datos SQlite con Room ● Uso Fragments ● Uso de navigation RA-2 Usa principios de Diseño de Experiencia y Diseño de Interacción para el desarrollo de aplicaciones Móviles. 20 ● Interface de la app como se indica en las Historias de Usuario RA-3 Emplea algún sistema de gestión de proyectos y control de versión de código, que le permita construir aplicaciones móviles de manera colaborativa. 20 ● Gestión de las tareas (criterios) de las Historias de Usuario en Jira . “Por hacer, en curso , hecho” ● Uso de GitHub donde se evidencie activamente el trabajo en equipo durante el sprint NOTA EQUIPO 100 % CALIFICACIÓN INDIVIDUAL Corroborar que cada uno de los integrantes del equipo participó activamente en el desarrollo del proyecto. Esta calificación se hará en un rango de 0 a 1, siendo 1 la mejor nota. CALIFICACIÓN DEFINITIVA DEL ESTUDIANTE (Calificación Equipo * Calificación Individual) La nota definitiva del estudiante será la nota que haya sacado el equipo multiplicada por la nota individual del estudiante.  Ejemplo: Si la nota del equipo fue de 5 y la nota individual fue de 0.8 , la nota definitiva del estudiante será de 4  (5 * 0.8)              Condiciones de entrega y sustentación del Miniproyecto 1 ● Es obligatorio que los integrantes del equipo enciendan la cámara durante la sustentación del proyecto.  Penalización de 0.5 décimas en la nota final. ● Se reitera que cualquier indicio de copia está prohibido y será penalizado de acuerdo a los estatutos oficiales de la Universidad. ● La presentación del proyecto es en equipo, no individual. ● Ser puntual el día de la sustentación (hora de inicio: 6:00 pm) de lo contrario el equipo debe esperar mientras el resto de equipos hacen la sustentación. ● Por cuestiones de tiempo cada integrante del equipo de tener las herramientas necesarias para sustentar (repositorio, jira, android studio con el proyecto abierto, dispositivo o emulador para mostrar la app) ● Se habilitará en el campus virtual para que suban un archivo pdf, con las siguientes consideraciones: ○ Solo un integrante del equipo debe subir el pdf al campus. ○ El nombre del archivo debe llamarse de acuerdo al nombre de su equipo (ver tabla de equipos), ejemplo equipoUno, equipoDos, etc ○ En el pdf colocar nombres y apellidos de los integrantes del equipo y el enlace al repositorio de su proyecto y de las tareas en jira. ○ Cada repositorio debe llamarse de acuerdo al nombre de su equipo (ver tabla de equipos), ejemplo equipoUno, equipoDos, etc. ○ El repositorio no debe tener ningún commit después de la fecha y hora de entrega. Penalización de 0.2 en la nota final Inicio y terminación del sprint 1 para el Miniproyecto 1 Inicia: 2 de junio de 2026 a las 6:00 pm Monitoría: 9 de junio de 2026  a las 6:00 pm Termina: 16 de junio de 2026 a las 6:00 pm 
## Enunciado — Sprint 1

A continuación se presenta el enunciado del Sprint 1 con las Historias de Usuario (HU), criterios y condiciones de entrega. El contenido textual se mantiene exactamente como en la versión original; aquí está reorganizado para facilitar su lectura y uso como documento de planeación.

---

### HU 1.0 — Ventana Splash

1.Ventana Splash ID: HU 1.0 HU 1.0: Ventana Splash Yo como (Actor): Aplicación Quiero (Acción): Poder presentar una ventana de splash al jugador Para poder (Consecuencia): Mejorar la experiencia de usuario al ingresar a la app

Espero que: Cada vez que el jugador ingrese a la app se muestre inicialmente un ventana splash

Criterio 1: La ventana del splash tendrá un fondo de color negro, no debe mostrarse ningún tipo de toolbar, ni inferior ni superior.

Criterio 2: Un ícono animado en forma de botella en  la parte central de la ventana (el ícono no necesariamente debe ser idéntico al mostrado en la anterior imagen, pero si debe ser animado).

Criterio 3: Un texto de color naranja con la frase “pico botella” que de debe estar en la parte inferior del ícono animado.

Criterio 4: La ventana debe mostrarse al usuario por 5 segundos, para luego desaparecer y mostrar el home principal de la app.

Criterio 5:Cuando el usuario esté en el home principal y use el botón de atrás del dispositivo, no debe regresar al splash, debe salir de la app y mostrar el escritorio del teléfono.

Criterio 6: Crear un ícono para la app, libre elección.

---

### HU 2.0 — Ventana Home Principal

2.Ventana Home Principal ID: HU 2.0 HU 2.0: Ventana Home Principal Yo como (Actor): App Quiero (Acción): Poder presentar al jugador una ventana de inicio Para poder (Consecuencia): Mostrar el juego y sus diferentes funcionalidades

Criterio 1: La ventana debe tener un fondo que recree un piso de madera.

Criterio 2: No se debe mostrar la toolbar que por defecto trae android, se debe crear una toolbar personalizada, mayor detalle en la HU 3.0

Criterio 3: Los íconos color naranja de la toolbar: una estrella, un icono de apagado-encendido que por defecto debe estar encendido, un icono para las instrucciones del juego, una imagen para agregar retos y finalmente un ícono para compartir la app.

Criterio 4: En la parte central de la ventana debe mostrarse la imagen de una botella (libre elección).

Criterio 5: En el centro de la botella debe mostrarse un contador regresivo que que va desde el número 3 al 0

Criterio 6: En la parte inferior mostrar un botón dinámico “parpadeante” de color naranja con la palabra “Presióname”

Criterio 7: La ventana de inicio por defecto siempre tendrá un sonido de fondo para el juego (libre elección)

---

### HU 3.0 — Toolbar personalizada

3.Toolbar personalizada ID: HU 3.0 HU 3.0: Toolbar personalizada Yo como (Actor): App Quiero (Acción): Poder mostrarle al jugador una toolbar personalizada Para poder (Consecuencia): Que el jugador gestione funcionalidades de la app

Criterio 1: La toolbar debe tener un fondo de color negro, con bordes redondeados y sus componentes de color naranja.

Criterio 2: La toolbar tiene un ícono de estrella que permite calificar la app. Al dar click debe enviar al jugador a la ventana de la  HU 4.0:  Calificar la aplicación

Criterio 3: Un ícono para el audio de fondo de la app, estará por defecto en encendido, al dar click el audio de fondo del juego se pausa y este ícono será reemplazado por uno de apagado (ver imagen). Al dar click sobre el ícono de apagado, el audio de fondo se reinicia y el ícono se reemplaza por el de encendido.(hará el trabajo de un interruptor para el audio de fondo)

Criterio 4: Un icono para las instrucciones del juego, al dar click sobre este debe enviar al jugador a la ventana de la HU 5.0:  Instrucciones del juego

Criterio 5:Un ícono para ver y  agregar los retos del juego, al dar click debe enviar al jugador a la ventana de la HU 6.0:  Agregar y listar retos

Criterio 6:Un ícono para compartir la app, al dar clic sobre este botón debe dirigir al jugador a la HU 10: Compartir aplicación

Criterio 7: Al dar clic sobre cada uno de los 5 botones  se debe crear una sutil animación de touch antes de continuar con la navegación.

---

### HU 4.0 — Calificar la aplicación

4.Calificar la aplicación ID: HU 4.0 HU 4.0: Calificar la aplicación Yo como (Actor): App Quiero (Acción): Que el jugador pueda calificar la aplicación Para poder (Consecuencia): Medir y observar el nivel de satisfacción que tiene la app en los usuarios

Criterio 1: Debido a que la app no está en la tienda de Google Play se usará como ejemplo la app de Nequi para simular la calificación de una app. Enlace de Nequi en la tienda: https://play.google.com/store/apps/details?id=com.nequi.MobileApp&hl=es_419&gl=es

---

### HU 5.0 — Instrucciones del juego

5.Instrucciones del juego ID: HU 5.0 HU 5.0: Instrucciones del juego Yo como (Actor): Jugador Quiero (Acción): Conocer las instrucciones del juego “pico botella” Para poder (Consecuencia): Entender y jugar adecuadamente

Criterio 1: Tenga en cuenta que si está en el home principal de la app  y el botón de audio de fondo está modo ON,al entrar a esta ventana debe pausar el audio.

Criterio 2: La ventana debe tener un fondo de color gris oscuro.

Criterio 3: Una toolbar personalizada con el título “Reglas del Juego” con un botón de flecha atrás, que al dar click en la flecha debe dirigir al usuario al home principal y restablecer el audio de fondo si inicialmente estuvo en ON.

Cireterio 4: Un título de color blanco (bold) con el texto ¿Cómo se juega?

Criterio 5: Una descripción de color blanco con el texto “Los jugadores forman un círculo y en el centro colocan el dispositivo móvil, luego tocan el botón parpadeante para girar la botella.El jugador que señale la botella debe cumplir el reto que lanza la app, de lo contrario abandona el juego.”

Criterio 6: Un título de color blanco (bold) con el texto ¿Quién gana? Criterio 7: Una descripción de color blanco con el texto: “Gana el último jugador que no abandone el juego.”  Criterio 8: Una animación que representa el triunfo en el juego (libre elección) 6.Agregar y listar retos ID: HU 6.0 HU 6.0: Agregar y listar retos Yo como (Actor): Jugador Quiero (Acción): Poder visualizar la lista de retos existentes y poder agregar nuevos retos Para poder (Consecuencia): Personalizar y mejorar mi experiencia con el juego               Criterio 1: Tenga en cuenta que si está en el home principal de la app  y el botón de audio de fondo está modo ON, al entrar a esta ventana debe pausar el audio.  Criterio 2: La ventana debe tener un fondo de color gris oscuro.  Criterio 3: Una toolbar personalizada con el título “Retos” con un botón de flecha atrás, que al dar click en la flecha debe dirigir al usuario al home principal y restablecer el audio de fondo si inicialmente estuvo en ON.  Criterio 4: Debe mostrarse la lista de retos agregados por el jugador, cada item de la lista contiene un ícono en la parte superior izquierda (libre elección), un ícono para editar y eliminar el reto, una línea horizontal, y finalmente en la parte inferior la descripción del reto. Criterio 5: Si la lista de retos supera el tamaño de la pantalla, debe permitir hacer scroll para continuar viendo el listado de retos.  Criterio 6: Cada vez que se agregue un reto a la lista, ese reto debe ubicarse en la parte superior de la lista, no debe quedar en la parte inferior.   Criterio 7: Al dar clic sobre los botones de editar y eliminar, se debe crear una sutil animación de touch antes de continuar con la navegación.  Criterio 8: Un botón flotante de color naranja que al dar click lance el cuadro de díalogo de la HU 7.0:  Cuadro de diálogo agregar reto  Criterio 9: Al dar click en el botón de editar, se lanza el cuadro de diálogo de la HU 8.0:  Cuadro de diálogo editar reto  Criterio 10: Al dar click en el botón de eliminar, se lanza el cuadro de diálogo de la HU 9.0:  Cuadro de diálogo eliminar reto                                    7.Cuadro de diálogo agregar reto ID: HU 7.0 HU 7.0: Cuadro de diálogo agregar reto Yo como (Actor): App. Quiero (Acción): Poder mostrarle al jugador un cuadro de diálogo. Para poder (Consecuencia): Que el jugador agregue los retos que desee.     Criterio 1: Un cuadro de díalogo que tenga un fondo de color blanco.  Criterio 2: Un título en la parte superiorettes