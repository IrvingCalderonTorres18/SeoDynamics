"use client";
 
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Link from "next/link";
import { useParams } from 'next/navigation'
import NavBar from "@/components/navbar"
 
export default function ViewUserPage() {
    const {id}=useParams();
 
    console.log(id);
  
    const [userField, setUserField] = useState({
        id_cliente: "",
        nombre_completo: "",
        razon_social: ""
    });
 
    useEffect(()=>{
        fetchUser();
    },[id]);
  
    const fetchUser=async()=>{
        try{
            const result=await axios.get("http://localhost:3001/get/"+id);
            console.log(result.data);
            setUserField(result.data)
  
        }catch(err){
            console.log("Something Wrong");
        }
    }
 
    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }
      
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:3001/update/"+id, userField);
            window.location.href = '/';
        } catch (err) {
            console.log("Something Wrong");
        }
    }
 
    return (
        <div> 
            <NavBar/>
    <div className="max-w-md mx-auto mt-5">
            <div className="mb-2 w-full text-white">
      <Link
        href="/"
        className="btn btn-primary">
        Back
      </Link>
    </div>
      

            <div className="card bg-base-100 shadow-xl">
  <div className="card-body ">
    <h1 className="text-2xl text-center mb-2 text-3xl font-bold">Edit Form</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="block text-lg font-medium text-gray-900"> Identificador</label>
                    <input type="text" id="id" name="id" value={id} disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="block text-lg font-medium text-gray-900"> Id_Cliente</label>
                    <input type="number" className="input input-bordered input-primary w-full max-w-xs" placeholder="Ingresa la id del cliente" name="id_cliente" value={userField.id_cliente} onChange={e => changeUserFieldHandler(e)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="block text-lg font-medium text-gray-900">Nombre Completo</label>
                    <input type="text" className="input input-bordered input-primary w-full max-w-xs" id="nombre_completo" placeholder="Ingresa el nombre completo del cliente" name="nombre_completo" value={userField.nombre_completo}  onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className="mb-3 mt-3">
                     <label className="block text-lg font-medium text-gray-900">Razon Social</label>
                      <input type="text" className="input input-bordered input-primary w-full max-w-xs" id="razon_social" placeholder="Ingresa razón social (RFC)" name="razon_social" value={userField.razon_social} onChange={e => changeUserFieldHandler(e)} required/>
                </div>
                <div className="mb-3 mt-3">
                     <label className="block text-lg font-medium text-gray-900">Email</label>
                      <input type="text" className="input input-bordered input-primary w-full max-w-xs" id="email" placeholder="Ingresa el email" name="email" value={userField.email} onChange={e => changeUserFieldHandler(e)} required/>
                </div>
                <div className="mb-3 mt-3">
                     <label className="block text-lg font-medium text-gray-900">Telefono</label>
                      <input type="text" className="input input-bordered input-primary w-full max-w-xs" id="telefono" placeholder="Ingresa el telefono" name="telefono" value={userField.telefono} onChange={e => changeUserFieldHandler(e)} required/>
                </div>
                <div className="mb-3 mt-3">
                     <label className="block text-lg font-medium text-gray-900">Dirección</label>
                      <input type="text" className="input input-bordered input-primary w-full max-w-xs" id="direccion" placeholder="Ingresa la dirección" name="direccion" value={userField.direccion} onChange={e => changeUserFieldHandler(e)} required/>
                </div>

                <div className="mb-3 mt-3">
  <label className="block text-lg font-medium text-gray-900">
    Fecha de Registro
  </label>
  <input
    type="date"
    className="input input-bordered input-primary w-full max-w-xs"
    id="fecha_registro"
    placeholder="Ingresa la fecha de registro"
    name="fecha_registro"
    value={userField.fecha_registro ? userField.fecha_registro.split('T')[0] : ""}
    onChange={e => changeUserFieldHandler(e)}
    required
  />
</div>



                <div className="mb-3 mt-3">
                     <label className="block text-lg font-medium text-gray-900">Presupuesto Estimado</label>
                      <input type="number" className="input input-bordered input-primary w-full max-w-xs" id="presupuesto_estimado" placeholder="Ingresa el presupuesto estimado" name="presupuesto_estimado" value={userField.presupuesto_estimado} onChange={e => changeUserFieldHandler(e)} required/>
                </div>

                <div className="mb-3 mt-3">
  <label className="block text-lg font-medium text-gray-900">
    Estado del Cliente
  </label>
  <select
    id="estado_cliente"
    name="estado_cliente"
    className="select select-primary w-full max-w-xs"
    value={userField.estado_cliente}
    onChange={e => changeUserFieldHandler(e)}
    required
  >
    <option value="">Seleccione el estado</option> {/* Opción por defecto */}
    <option value="Activo">Activo</option>
    <option value="Inactivo">Inactivo</option>
    <option value="Proyecto en curso">Proyecto en curso</option>
  </select>
</div>




            </form>


    <div className="card-actions justify-end">
    <button type="submit" className="btn btn-accent text-white" onClick={e=>onSubmitChange(e)}>Update</button>
    </div>
    
  </div>
</div>

            
    </div>
    </div>
  );
}