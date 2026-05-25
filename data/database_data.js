// database_data.js
// Plan de datos para Pico Botella

const DATABASE_DATA = {
  title: "Datos locales de Pico Botella",
  subtitle:
    "La aplicacion no requiere una base de datos centralizada para el Sprint 1; el alcance usa almacenamiento local de retos.",
  note: "Si mas adelante se necesita persistencia compartida, se puede reemplazar por una base de datos ligera.",
  tables: [
    {
      id: "local_challenges",
      name: "local_challenges",
      x: 40,
      y: 40,
      width: 340,
      height: 180,
      color: "#f3f4f6",
      stroke: "#d1d5db",
      category: "Persistencia local",
      fields: [
        { name: "id", type: "PK", isPK: true, note: "UUID o autoincremental" },
        { name: "text", type: "field", note: "Texto del reto" },
        { name: "created_at", type: "field", note: "Fecha de creacion" },
        { name: "updated_at", type: "field", note: "Fecha de ultima edicion" },
      ],
    },
  ],
};
