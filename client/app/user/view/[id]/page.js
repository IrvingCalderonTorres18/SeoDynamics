"use client";
 
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Link from "next/link";
import { useParams } from 'next/navigation'
import NavBar from "@/components/navbar"

 
export default function ViewUserPage() {
    const {id}=useParams();
 
    console.log(id);
 
    const[user,setUser]=useState([]);
  
    useEffect(()=>{
        fetchUser();
    },[id]);
  
    const fetchUser=async()=>{
        try{
        const result=await axios.get("http://localhost:3001/get/"+id);
        console.log(result.data);
        setUser(result.data)
  
        }catch(err){
            console.log("Something Wrong");
        }
    }
 
    return (
      
      <div className="padding">
        <NavBar/>
    <div className="card card-side bg-base-100 shadow-xl py-10">
  <div className="card-body">
   
    <div className="mb-2 py-5 w-full text-white">
      <Link
        href="/"
        className="btn btn-primary">
        Back
      </Link>
    </div>
      <h1 className="text-2xl text-center mb-2 text-3xl font-bold">View User</h1>
      <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols text-center">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th>S No.</th>
              <th>Id Cliente</th>
              <th>Nombre Completo</th>   
              <th>Razon Social</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Fecha de Registro</th>
              <th>Presupuesto Estimado</th>
              <th>Estado del cliente</th>          
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{user._id}</td>
                <td>{user.id_cliente}</td>
                <td>{user.nombre_completo}</td>
                <td>{user.razon_social}</td>
                <td>{user.email}</td>
                <td>{user.telefono}</td>
                <td>{user.direccion}</td>
                <td>{user.fecha_registro}</td>
                <td>{user.presupuesto_estimado}</td>
                <td>{user.estado_cliente}</td>
            </tr>
          </tbody>
      </table>
    </div>

    
  </div>
</div>
</div>

  );
}