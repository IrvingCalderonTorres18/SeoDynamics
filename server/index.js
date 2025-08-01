//index.js
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./User')
const ProyectosModel = require('./Proyectos'); // Importamos el modelo de Proyectos
const Diseños_WebModel = require('./DiseñosWeb');
const OptimizacionSEOModel = require('./OptimizacionSEO');
const EcommerceModel = require('./E-Commerce');
const RevisionFeedbackModel = require('./RevisionFeedback');

const app = express()
port = 3001
 
app.use(cors())
app.use(express.json())
  
main().catch(err => console.log(err));
 
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/nodeexpressdb', {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
}
 
app.get('/hello', (req, res) => {
    res.send('Hello World!')
  })
   
  app.get('/', (req, res) => {
      UserModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err))
  })
    
    
  app.get('/get/:id', (req, res) => {
      const id = req.params.id
      UserModel.findById({_id: id})
      .then(post => res.json(post))
      .catch(err => console.log(err))
  })
    
  app.post('/create', (req, res) => {
      UserModel.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.json(err))
  })

  app.put('/update/:id', (req, res) => {
    const id = req.params.id;
  
    UserModel.findByIdAndUpdate(
      { _id: id },
      {
        id_cliente: req.body.id_cliente,
        nombre_completo: req.body.nombre_completo,
        razon_social: req.body.razon_social,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        fecha_registro: req.body.fecha_registro,
        presupuesto_estimado: req.body.presupuesto_estimado,
        estado_cliente: req.body.estado_cliente,
      },
      { new: true } // Para devolver el documento actualizado
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  });
  
  
app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})


//PROYECTOS

// Obtener todos los proyectos
app.get('/proyectos', (req, res) => {
  ProyectosModel.find()
    .populate('id_cliente', 'id_cliente') // Poblamos el id_cliente
    .then(proyectos => {
      const proyectosLimpios = proyectos.map(proyecto => ({
        ...proyecto.toObject(),
        id_cliente: proyecto.id_cliente.id_cliente, // Sustituimos el objeto por el valor limpio
      }));
      res.json(proyectosLimpios);
    })
    .catch(err => res.status(500).json(err));
});



// Obtener un proyecto por su ID
app.get('/proyectos/:id', (req, res) => {
  const id = req.params.id;
  ProyectosModel.findById(id)
  .then(proyecto => res.json(proyecto))
  .catch(err => console.log(err));
});

// Crear un nuevo proyecto
app.post('/proyectos', (req, res) => {
  ProyectosModel.create(req.body)
  .then(proyecto => res.json(proyecto))
  .catch(err => res.json(err));
});

// Actualizar un proyecto por su ID
app.put('/proyectos/:id', (req, res) => {
  const id = req.params.id;
  ProyectosModel.findByIdAndUpdate(
      { _id: id },
      {
          id_proyecto: req.body.id_proyecto,
          id_cliente: req.body.id_cliente,
          tipo_servicio: req.body.tipo_servicio,
          fecha_inicio: req.body.fecha_inicio,
          fecha_entrega: req.body.fecha_entrega,
          estado_proyecto: req.body.estado_proyecto,
          descripcion: req.body.descripcion,
          presupuesto: req.body.presupuesto,
      },
      { new: true }
  )
  .then(proyecto => res.json(proyecto))
  .catch(err => res.status(500).json(err));
});

// Eliminar un proyecto por su ID
app.delete('/deleteproyecto/:id', (req, res) => {
  const id = req.params.id;
  ProyectosModel.findByIdAndDelete(id)
  .then(response => res.json(response))
  .catch(err => res.json(err));
});






//Diseños Web





// Obtener todos los diseños web
app.get('/disenios-web', (req, res) => {
  Diseños_WebModel.find()
    .populate('id_proyecto') // Cargar el proyecto relacionado
    .then((disenios) => {
      // Limpiar los datos de los diseños web
      const diseniosLimpios = disenios.map(disenio => ({
        ...disenio.toObject(),
        id_proyecto: disenio.id_proyecto.id_proyecto, // Sustituir el objeto por el valor limpio
      }));
      res.json(diseniosLimpios);
    })
    .catch((err) => res.status(500).json(err));
});


// Obtener un diseño web por ID
app.get('/disenios-web/:id', (req, res) => {
  const id = req.params.id;
  Diseños_WebModel.findById(id)
    .populate('id_proyecto') // Opcional
    .then((disenio) => res.json(disenio))
    .catch((err) => res.status(500).json(err));
});

// Crear un nuevo diseño web
app.post('/disenios-web/', (req, res) => {
  Diseños_WebModel.create(req.body)
    .then((disenio) => res.json(disenio))
    .catch((err) => res.status(500).json(err));
});

// Actualizar un diseño web por ID
app.put('/disenios-web/:id', (req, res) => {
  const id = req.params.id;
  Diseños_WebModel.findByIdAndUpdate(
    id,
    {
      id_diseño_web: req.body.id_diseño_web,
      id_proyecto: req.body.id_proyecto,
      template: req.body.template,
      colores_predeterminados: req.body.colores_predeterminados,
      caracteristicas_especiales: req.body.caracteristicas_especiales,
      estatus_diseño: req.body.estatus_diseño,
    },
    { new: true }
  )
    .then((disenio) => res.json(disenio))
    .catch((err) => res.status(500).json(err));
});

// Eliminar un diseño web por ID
app.delete('/delete_disenios-web/:id', (req, res) => {
  const id = req.params.id;
  Diseños_WebModel.findByIdAndDelete(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});




// Optimizacion SEO




app.get('/optimizacion-seo', (req, res) => {
  OptimizacionSEOModel.find()
    .populate('id_proyecto') // Cargar el proyecto relacionado
    .then((optimizaciones) => {
      // Limpiar los datos de optimización SEO
      const optimizacionesLimpias = optimizaciones.map(opt => ({
        ...opt.toObject(),
        id_proyecto: opt.id_proyecto.id_proyecto, // Sustituir el objeto por el valor limpio
      }));
      res.json(optimizacionesLimpias);
    })
    .catch((err) => res.status(500).json(err));
});

// Obtener un registro de optimización SEO por ID
app.get('/optimizacion-seo/:id', (req, res) => {
  const id = req.params.id;
  OptimizacionSEOModel.findById(id)
    .populate('id_proyecto') // Opcional
    .then((optimizacion) => res.json(optimizacion))
    .catch((err) => res.status(500).json(err));
});

// Crear un nuevo registro de optimización SEO
app.post('/optimizacion-seo', (req, res) => {
  OptimizacionSEOModel.create(req.body)
    .then((optimizacion) => res.json(optimizacion))
    .catch((err) => res.status(500).json(err));
});

// Actualizar un registro de optimización SEO por ID
app.put('/optimizacion-seo/:id', (req, res) => {
  const id = req.params.id;
  OptimizacionSEOModel.findByIdAndUpdate(
    id,
    {
      id_seo: req.body.id_seo,
      id_proyecto: req.body.id_proyecto,
      keywords: req.body.keywords,
      seo_on_page: req.body.seo_on_page,
      seo_off_page: req.body.seo_off_page,
      estado_seo: req.body.estado_seo,
      fecha_inicio_optimizacion: req.body.fecha_inicio_optimizacion,
      fecha_revision_seo: req.body.fecha_revision_seo,
    },
    { new: true } // Retorna el documento actualizado
  )
    .then((optimizacion) => res.json(optimizacion))
    .catch((err) => res.status(500).json(err));
});

// Eliminar un registro de optimización SEO por ID
app.delete('/delete_optimizacion-seo/:id', (req, res) => {
  const id = req.params.id;
  OptimizacionSEOModel.findByIdAndDelete(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});


//E-Commerce


app.get('/e-commerce', (req, res) => {
  EcommerceModel.find()
    .populate('id_proyecto') // Cargar el proyecto relacionado
    .then((ecommerces) => {
      const ecommercesLimpios = ecommerces.map((ecommerce) => ({
        ...ecommerce.toObject(),
        id_proyecto: ecommerce.id_proyecto.id_proyecto, // Sustituir el objeto por el valor limpio
      }));
      res.json(ecommercesLimpios);
    })
    .catch((err) => res.status(500).json(err));
});

// Obtener un registro de e-commerce por ID
app.get('/e-commerce/:id', (req, res) => {
  const id = req.params.id;
  EcommerceModel.findById(id)
    .populate('id_proyecto') // Opcional
    .then((ecommerce) => res.json(ecommerce))
    .catch((err) => res.status(500).json(err));
});

// Crear un nuevo registro de e-commerce
app.post('/e-commerce', (req, res) => {
  EcommerceModel.create(req.body)
    .then((ecommerce) => res.json(ecommerce))
    .catch((err) => res.status(500).json(err));
});

// Actualizar un registro de e-commerce por ID
app.put('/e-commerce/:id', (req, res) => {
  const id = req.params.id;
  EcommerceModel.findByIdAndUpdate(
    id,
    {
      id_ecommerce: req.body.id_ecommerce,
      id_proyecto: req.body.id_proyecto,
      plataforma: req.body.plataforma,
      productos_incluidos: req.body.productos_incluidos,
      pasarelas_pago: req.body.pasarelas_pago,
      estado_ecommerce: req.body.estado_ecommerce,
      fecha_lanzamiento: req.body.fecha_lanzamiento,
    },
    { new: true } // Retorna el documento actualizado
  )
    .then((ecommerce) => res.json(ecommerce))
    .catch((err) => res.status(500).json(err));
});

// Eliminar un registro de e-commerce por ID
app.delete('/delete-ecommerce/:id', (req, res) => {
  const id = req.params.id;
  EcommerceModel.findByIdAndDelete(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});



//Revision_Feedback



app.get('/revision-feedback', (req, res) => {
  RevisionFeedbackModel.find()
  .populate('id_cliente', 'id_cliente') // Poblamos el id_cliente
  .populate('id_proyecto', 'id_proyecto') // Cargar el proyecto relacionado 
  .then(feedbacks => {
    const feedbacksLimpios = feedbacks.map(feedback => ({
        ...feedback.toObject(),
        id_cliente: feedback.id_cliente.id_cliente, // Sustituimos el objeto por el valor limpio
        id_proyecto: feedback.id_proyecto.id_proyecto, // Sustituir el objeto por el valor limpio
    }));
    res.json(feedbacksLimpios);
})
.catch(err => res.status(500).json(err));
});

// Obtener una revisión de feedback por ID
app.get('/revision-feedback/:id', (req, res) => {
  const id = req.params.id;
  RevisionFeedbackModel.findById(id)
      .populate('id_cliente', 'nombre_completo email')  // Poblamos el id_cliente
      .populate('id_proyecto', 'tipo_servicio descripcion')  // Poblamos el id_proyecto
      .then(feedback => res.json(feedback))
      .catch(err => res.status(500).json(err));
});

// Crear una nueva revisión de feedback
app.post('/revision-feedback', (req, res) => {
  const { id_revision, id_cliente, id_proyecto, fecha_revision, comentarios_cliente, calificacion, acciones_requeridas } = req.body;
  const feedbackData = {
      id_revision,
      id_cliente,
      id_proyecto,
      fecha_revision,
      comentarios_cliente,
      calificacion,
      acciones_requeridas
  };
  
  RevisionFeedbackModel.create(feedbackData)
      .then(feedback => res.json(feedback))
      .catch(err => res.status(500).json(err));
});

// Actualizar una revisión de feedback por ID
app.put('/revision-feedback/:id', (req, res) => {
  const id = req.params.id;
  const { id_cliente, id_proyecto, fecha_revision, comentarios_cliente, calificacion, acciones_requeridas } = req.body;

  RevisionFeedbackModel.findByIdAndUpdate(
      id,
      {
          id_cliente,
          id_proyecto,
          fecha_revision,
          comentarios_cliente,
          calificacion,
          acciones_requeridas
      },
      { new: true }  // Para devolver el documento actualizado
  )
  .then(feedback => res.json(feedback))
  .catch(err => res.status(500).json(err));
});

// Eliminar una revisión de feedback por ID
app.delete('/delete-revision-feedback/:id', (req, res) => {
  const id = req.params.id;
  RevisionFeedbackModel.findByIdAndDelete(id)
      .then(response => res.json(response))
      .catch(err => res.status(500).json(err));
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
