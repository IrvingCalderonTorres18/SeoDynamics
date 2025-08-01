const mongoose = require('mongoose');

// Definir el esquema para la tabla "optimizacion_seo"
const optimizacionSEOSchema = new mongoose.Schema({
  id_seo: {
    type: Number,
    required: true,  // Campo obligatorio para el id_seo
    unique: true,    // Aseguramos que el id_seo sea único
  },
  id_proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto',  // Relación con la tabla de Proyectos
    required: true,   // El id_proyecto es obligatorio
  },
  keywords: {
    type: [String],   // Lista de palabras clave
    required: true,   // Campo obligatorio
  },
  seo_on_page: {
    type: String,     // Descripción o información sobre SEO On Page
    required: true,   // Campo obligatorio
  },
  seo_off_page: {
    type: String,     // Descripción o información sobre SEO Off Page
    required: true,   // Campo obligatorio
  },
  estado_seo: {
    type: String,
    enum: ['Pendiente', 'En progreso', 'Optimizado', 'Requiere revisión'], // Estado SEO
    default: 'Pendiente',  // Valor por defecto
  },
  fecha_inicio_optimizacion: {
    type: Date,
    required: true,   // Fecha de inicio obligatoria
    get: (value) => {
      // Formatea la fecha al recuperar
      return value ? value.toISOString().split('T')[0] : null;
    },
    set: (value) => {
      // Asegura que la fecha se guarde como un objeto Date
      return value ? new Date(value) : null;
    },
  },
  fecha_revision_seo: {
    type: Date,
    required: true,   // Fecha de revisión obligatoria
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
optimizacionSEOSchema.set('toJSON', { getters: true });
optimizacionSEOSchema.set('toObject', { getters: true });

// Asignar explícitamente el nombre de la colección
const OptimizacionSEO = mongoose.model('OptimizacionSEO', optimizacionSEOSchema, 'optimizacion_seo');

module.exports = OptimizacionSEO;
