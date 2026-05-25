// Simplified site map for mobile project "Pico Botella"
const SITE_MAP_DATA = {
  title: "Mapa de Sitio - Pico Botella",
  subtitle: "Estructura mínima de navegación para la app móvil del curso",
  zones: [
    {
      id: "global",
      name: "Global",
      description: "Elementos comunes a la app móvil",
      type: "global",
      pages: [
        { name: "Splash", description: "Pantalla inicial animada" },
        { name: "Home", description: "Pantalla principal con botella y controles" },
        { name: "Toolbar", description: "Barra superior con acciones (audio, instrucciones, compartir)" },
        { name: "Retos", description: "Listado CRUD de retos locales" },
        { name: "Dialogos", description: "Agregar/Editar/Eliminar retos y mostrar reto aleatorio" },
        { name: "Settings", description: "Ajustes de audio y preferencias" },
      ],
    },
  ],
};
