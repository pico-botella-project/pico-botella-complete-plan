// iso_25010_data.js
// Resumen ISO 25010 para Pico Botella

const ISO_25010_DATA = {
  meta: {
    title: "Marco de Calidad ISO 25010",
    subtitle: "Resumen aplicado al proyecto Pico Botella",
    description:
      "Version breve del modelo de calidad para una app movil centrada en usabilidad, eficiencia y mantenibilidad.",
    standard: "ISO/IEC 25010:2011",
    scope: "Calidad del producto de software",
  },
  categories: [
    {
      id: "usabilidad",
      name: "Usabilidad",
      priority: "Alta",
      priorityLevel: "high",
      summary: "Interfaz clara, rapida y facil de usar en pantallas moviles.",
      subcategories: [
        {
          id: "aprendizaje",
          name: "Aprendibilidad",
          definition: "Facilidad con la que una persona entiende y usa la app por primera vez.",
          application: "Splash, home y dialogos deben ser intuitivos para jugar sin instrucciones largas.",
        },
        {
          id: "operabilidad",
          name: "Operabilidad",
          definition: "Facilidad de control y manejo de la interfaz durante el uso.",
          application: "Los botones deben ser accesibles y responder rapido al tacto.",
        },
      ],
    },
    {
      id: "eficiencia",
      name: "Eficiencia de desempeno",
      priority: "Media",
      priorityLevel: "medium",
      summary: "Animaciones fluidas y consumo moderado de recursos en Android.",
      subcategories: [
        {
          id: "tiempo-respuesta",
          name: "Comportamiento temporal",
          definition: "Tiempo de respuesta y fluidez de animaciones.",
          application: "El giro de la botella debe sentirse natural y sin congelar la interfaz.",
        },
      ],
    },
    {
      id: "mantenibilidad",
      name: "Mantenibilidad",
      priority: "Media",
      priorityLevel: "medium",
      summary: "Codigo modular y facil de ajustar para nuevas pantallas o retos.",
      subcategories: [
        {
          id: "modularidad",
          name: "Modularidad",
          definition: "Capacidad de dividir el sistema en partes pequenas y coherentes.",
          application: "Cada pantalla y flujo debe poder cambiarse sin afectar el resto de la app.",
        },
      ],
    },
  ],
};

if (typeof module !== "undefined") {
  module.exports = { ISO_25010_DATA };
}
