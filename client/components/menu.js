"use client";

import { useState } from 'react';
import TableData from "@/components/tabledata";
import ProyectosTable from "@/components/proyectostable";
import DiseñosWebTable from '@/components/diseñoswebtable';
import OptimizacionSEOTable from '@/components/optimizacionseotable';
import ECommerceTable from '@/components/e-commercetable';
import RevisionFeedbackTable from '@/components/revisionfeedbacktable';

export default function Menu() {
  // Estado para almacenar el componente a mostrar según el botón presionado
  const [selectedMenu, setSelectedMenu] = useState('Clientes');

  // Función para cambiar el componente a mostrar
  const handleButtonClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => handleButtonClick('Clientes')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Clientes
        </button>
        <button
          onClick={() => handleButtonClick('Proyectos')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Proyectos
        </button>
        <button
          onClick={() => handleButtonClick('Diseños Web')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Diseños Web
        </button>
        <button
          onClick={() => handleButtonClick('Optimización Seo')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Optimización Seo
        </button>
        <button
          onClick={() => handleButtonClick('E-Commerce')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          E-Commerce
        </button>
        <button
          onClick={() => handleButtonClick('Revisión Feedback')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Revisión Feedback
        </button>
      </div>

      {/* Mostrar el componente correspondiente según el menú seleccionado */}
      {selectedMenu === 'Clientes' && <TableData />}
      {selectedMenu === 'Proyectos' && <ProyectosTable />}
      {selectedMenu === 'Diseños Web' && <DiseñosWebTable />}
      {selectedMenu === 'Optimización Seo' && <OptimizacionSEOTable />}
      {selectedMenu === 'E-Commerce' && <ECommerceTable />}
      {selectedMenu === 'Revisión Feedback' && <RevisionFeedbackTable />}
    </div>
  );
}
