const mongoose = require('mongoose');

// Definir el esquema para la tabla "revision_feedback"
const revisionFeedbackSchema = new mongoose.Schema({
    id_revision: {
        type: Number,
        required: true,  // Campo obligatorio
        unique: true,    // Aseguramos que el id_revision sea único
    },
    id_cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',     // Relación con el modelo de "Cliente"
        required: true,  // El id_cliente es obligatorio
    },
    id_proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto', // Relación con el modelo de "Proyecto"
        required: true,  // El id_proyecto es obligatorio
    },
    fecha_revision: {
        type: Date,
        required: true,   // Fecha de la revisión obligatoria
        get: (value) => {
            // Formatea la fecha al recuperar
            return value ? value.toISOString().split('T')[0] : null;
        },
        set: (value) => {
            // Asegura que la fecha se guarde como un objeto Date
            return value ? new Date(value) : null;
        },
    },
    comentarios_cliente: {
        type: String,
        required: true,  // Comentarios del cliente son obligatorios
    },
    calificacion: {
        type: Number,
        required: true,  // Calificación obligatoria
        min: 1,          // Valor mínimo de 1
        max: 5,          // Valor máximo de 5
    },
    acciones_requeridas: {
        type: String,    // Acciones a realizar basadas en la revisión
        required: true,  // Campo obligatorio
    },
});

// Habilitar getters para JSON y objetos normales
revisionFeedbackSchema.set('toJSON', { getters: true });
revisionFeedbackSchema.set('toObject', { getters: true });

// Asignar explícitamente el nombre de la colección
const RevisionFeedback = mongoose.model('Revision_Feedback', revisionFeedbackSchema, 'revision_feedback');

module.exports = RevisionFeedback;
