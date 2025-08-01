const mongoose = require('mongoose');

// Definir el esquema para la tabla "e-commerce"
const ecommerceSchema = new mongoose.Schema({
  id_ecommerce: {
    type: Number,
    required: true,  // Campo obligatorio para id_ecommerce
    unique: true,    // Aseguramos que el id_ecommerce sea único
  },
  id_proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto',  // Relación con la tabla de Proyectos
    required: true,   // El id_proyecto es obligatorio
  },
  plataforma: {
    type: String,     // Nombre de la plataforma de e-commerce (por ejemplo, Shopify, WooCommerce, etc.)
    required: true,   // Campo obligatorio
  },
  productos_incluidos: {
    type: [String],   // Lista de productos incluidos en el e-commerce
    required: true,   // Campo obligatorio
  },
  pasarelas_pago: {
    type: [String],   // Lista de pasarelas de pago (por ejemplo, PayPal, Stripe, etc.)
    required: true,   // Campo obligatorio
  },
  estado_ecommerce: {
    type: String,
    enum: ['Pendiente', 'En línea', 'Requiere ajustes'], // Estado del e-commerce
    default: 'Pendiente',  // Valor por defecto
  },
  fecha_lanzamiento: {
    type: Date,
    required: true,   // Fecha de lanzamiento obligatoria
    get: (value) => {
      // Formatea la fecha al recuperar
      return value ? value.toISOString().split('T')[0] : null;
    },
    set: (value) => {
      // Asegura que la fecha se guarde como un objeto Date
      return value ? new Date(value) : null;
    },
  },
});

// Habilitar getters para JSON y objetos normales
ecommerceSchema.set('toJSON', { getters: true });
ecommerceSchema.set('toObject', { getters: true });

// Asignar explícitamente el nombre de la colección
const Ecommerce = mongoose.model('Ecommerce', ecommerceSchema, 'e-commerce');

module.exports = Ecommerce;
