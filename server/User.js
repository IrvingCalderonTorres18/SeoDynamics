const mongoose = require('mongoose');

// Definimos el esquema del cliente
const clienteSchema = new mongoose.Schema({
  id_cliente: Number,
  nombre_completo: String,
  razon_social: String,
  email: String,
  telefono: String,
  direccion: String,
  fecha_registro: {
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
  presupuesto_estimado: Number,
  estado_cliente: {
    type: String,
    enum: ['Activo', 'Inactivo', 'Proyecto en curso'],
  },
});

// Habilitar getters para JSON y objetos normales
clienteSchema.set('toJSON', { getters: true });
clienteSchema.set('toObject', { getters: true });

const Clientes = mongoose.model('Cliente', clienteSchema);

module.exports = Clientes;
