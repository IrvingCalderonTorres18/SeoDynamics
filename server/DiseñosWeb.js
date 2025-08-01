const mongoose = require('mongoose');

// Definimos el esquema de Diseños Web
const disenioWebSchema = new mongoose.Schema({
  id_diseño_web: Number,
  id_proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto', // Relación con la tabla Proyectos
  },
  template: String,
  colores_predeterminados: [String], // Lista de colores
  caracteristicas_especiales: [String], // Lista de características
  estatus_diseño: {
    type: String,
    enum: ['En progreso', 'Completo', 'Pendiente'],
  },
});

// Habilitar getters para JSON y objetos normales
disenioWebSchema.set('toJSON', { getters: true });
disenioWebSchema.set('toObject', { getters: true });

// Asignar explícitamente el nombre de la colección
const Diseños_Web = mongoose.model('Diseño_Web', disenioWebSchema, 'diseños_web');

module.exports = Diseños_Web;
