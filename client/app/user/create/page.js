"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import NavBar from "@/components/navbar";

const CreateUserPage = () => {
  const [userField, setUserField] = useState({
    id_cliente: "",
    nombre_completo: "",
    razon_social: "",
    email: "",
    telefono: "",
    direccion: "",
    fecha_registro: "",
    presupuesto_estimado: "",
    estado_cliente: "Activo", // Valor por defecto
  });

  const changeUserFieldHandler = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/create", userField);
      console.log(response);
      window.location.href = "/";
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-md mx-auto mt-5">
        <div className="card bg-base-100 w-500 shadow-xl">
          <div className="card-body">
            <div className="mb-2 w-full text-white">
              <Link href="/" className="btn btn-primary">
                Back
              </Link>
            </div>
            <h1 className="text-2xl text-center mb-2 text-3xl font-bold">
              Añadir nuevo cliente
            </h1>
            <div>
              <form>
                {/** Campos del formulario */}
                {[
                  { name: "id_cliente", label: "Id Cliente", type: "text" },
                  { name: "nombre_completo", label: "Nombre Completo", type: "text" },
                  { name: "razon_social", label: "Razón Social", type: "text" },
                  { name: "email", label: "Correo Electrónico", type: "email" },
                  { name: "telefono", label: "Teléfono", type: "text" },
                  { name: "direccion", label: "Dirección", type: "text" },
                  { name: "fecha_registro", label: "Fecha de Registro", type: "date" },
                  { name: "presupuesto_estimado", label: "Presupuesto Estimado", type: "number" },
                ].map((field) => (
                  <div className="mb-5" key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-900">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      className="input input-bordered input-primary w-full max-w-xs"
                      placeholder={`Ingrese ${field.label.toLowerCase()}...`}
                      onChange={changeUserFieldHandler}
                    />
                  </div>
                ))}

                <div className="mb-5">
                  <label htmlFor="estado_cliente" className="block text-sm font-medium text-gray-900">
                    Estado del Cliente
                  </label>
                  <select
                    name="estado_cliente"
                    id="estado_cliente"
                    className="select select-primary w-full max-w-xs"
                    value={userField.estado_cliente}
                    onChange={changeUserFieldHandler}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Proyecto en curso">Proyecto en curso</option>
                  </select>
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-accent text-white padd"
                    onClick={onSubmitChange}
                  >
                    Añadir Cliente
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;
