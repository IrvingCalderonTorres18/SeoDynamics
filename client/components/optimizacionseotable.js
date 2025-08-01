"use client";
   
import React, { useEffect, useState } from "react";
import axios from 'axios'
import Link from "next/link";

export default function OptimizacionSEOTable(){
    const [userData, setUSerData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
  
    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:3001/optimizacion-seo");
            console.log(result.data);
            setUSerData(result.data)
        } catch (err) {
            console.log("something went wrong");
        }
    }
 
    const handleDelete = async (id) => {
        console.log(id);
        await axios.delete("http://localhost:3001/optimizacion-seo" + id);
        const newUserData = userData.filter((item) => item._id !== id);
        setUSerData(newUserData);
    }

    return (

        <div className="padding">

            <div className="card glass w-full max-w-7xl bg-blue-300">
                <figure>
                    <img src="/SeoDynamics3.png" alt="Mi imagen" className="rounded-xl" width={880} />
                </figure>
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Sistema de administración SEO</h1>
                    </div>
                    <h2 className="font-bold">Para administración de optimzacion SEO</h2>

                    <div className="overflow-x-auto">
                        <table className="table table-auto table-zebra w-full">
                            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="py-3 px-6">#</th>
                                    <th className="py-3 px-6">id_seo</th>
                                    <th className="py-3 px-6">id_proyecto</th>
                                    <th className="py-3 px-6">keywords</th>
                                    <th className="py-3 px-6">seo_on_page</th>
                                    <th className="py-3 px-6">seo_off_page</th>
                                    <th className="py-3 px-6">estado_seo</th>
                                    <th className="py-3 px-6">fecha_inicio_optimizacion</th>
                                    <th className="py-3 px-6">fecha_revision_seo</th>
                                    <th className="py-3 px-6 text-center">actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.map((rs, index) => (
                                    <tr key={rs._id} className="bg-white border-b">
                                        <td className="py-3 px-6">{index + 1}</td>
                                        <td className="py-3 px-6">{rs.id_seo}</td>
                                        <td className="py-3 px-6">{rs.id_proyecto}</td>
                                        <td className="py-3 px-6">{rs.keywords}</td>
                                        <td className="py-3 px-6">{rs.seo_on_page}</td>
                                        <td className="py-3 px-6">{rs.seo_off_page}</td>
                                        <td className="py-3 px-6">{rs.estado_seo}</td>
                                        <td className="py-3 px-6">{rs.fecha_inicio_optimizacion}</td>
                                        <td className="py-3 px-6">{rs.fecha_revision_seo}</td>
                                        <td className="flex justify-center gap-1 py-3">
                                            <Link href={`/user/view/${rs._id}`} className="btn btn-info text-white">
                                                View
                                            </Link>
                                            <Link href={`/user/edit/${rs._id}`} className="btn btn-primary">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(rs._id)} className="btn btn-error text-white">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-2 py-5 w-full text-white">
                        <Link href="/user/create" className="btn btn-primary">
                            Crear optimizacion seo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
