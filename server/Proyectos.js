const mongoose = require('mongoose');

// Definimos el esquema del proyecto
const proyectoSchema = new mongoose.Schema({
  id_proyecto: Number,
  id_cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente', // Relaciona con la tabla Cliente
  },
  tipo_servicio: String,
  fecha_inicio: {
    type: Date,
    get: (value) => {
      // Formatea la fecha al recuperar
      return value ? value.toISOString().split('T')[0] : null;
    },
    set: (value) => {
      // Asegura que la fecha se guarde como un objeto Date
      return value ? new Date(value) : null;
    },
  },
  fecha_entrega: {
    type: Date,
    get: (value) => {
      // Formatea la fecha al recuperar
      return value ? value.toISOString().split('T')[0] : null;
    },
    set: (value) => {
      // Asegura que la fecha se guarde como un objeto Date
      return value ? new Date(value) : null;
    },
  },
  estado_proyecto: {
    type: String,
    enum: ['Pendiente', 'En progreso', 'Finalizado'],
  },
  descripcion: String,
  presupuesto: Number,
});

// Habilitar getters para JSON y objetos normales
proyectoSchema.set('toJSON', { getters: true });
proyectoSchema.set('toObject', { getters: true });

const Proyectos = mongoose.model('Proyecto', proyectoSchema);

module.exports = Proyectos;
