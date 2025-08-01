"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";

export default function ECommerceTable() {
    const [eCommerceData, setECommerceData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:3001/e-commerce");
            console.log(result.data);
            setECommerceData(result.data);
        } catch (err) {
            console.log("Something went wrong");
        }
    }

    const handleDelete = async (id) => {
        console.log(id);
        await axios.delete("http://localhost:3001/e-commerce/" + id);  // Agregar el ID a la URL
        const newECommerceData = eCommerceData.filter((item) => item._id !== id);
        setECommerceData(newECommerceData);
    }

    return (
        <div className="padding">
            <div className="card glass w-full max-w-7xl bg-blue-300">
                <figure>
                    <img src="/SeoDynamics3.png" alt="E-commerce Banner" className="rounded-xl" width={880} />
                </figure>
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Sistema de administración SEO</h1>
                    </div>
                    <h2 className="font-bold">Para administración de E-commerce</h2>

                    <div className="overflow-x-auto">
                        <table className="table table-auto table-zebra w-full">
                            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="py-3 px-6">#</th>
                                    <th className="py-3 px-6">id_ecommerce</th>
                                    <th className="py-3 px-6">id_proyecto</th>
                                    <th className="py-3 px-6">plataforma</th>
                                    <th className="py-3 px-6">productos_incluidos</th>
                                    <th className="py-3 px-6">pasarelas_pago</th>
                                    <th className="py-3 px-6">estado_ecommerce</th>
                                    <th className="py-3 px-6">fecha_lanzamiento</th>
                                    <th className="py-3 px-6 text-center">actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eCommerceData.map((rs, index) => (
                                    <tr key={rs._id} className="bg-white border-b">
                                        <td className="py-3 px-6">{index + 1}</td>
                                        <td className="py-3 px-6">{rs.id_ecommerce}</td>
                                        <td className="py-3 px-6">{rs.id_proyecto}</td>
                                        <td className="py-3 px-6">{rs.plataforma}</td>
                                        <td className="py-3 px-6">{rs.productos_incluidos.join(", ")}</td>
                                        <td className="py-3 px-6">{rs.pasarelas_pago.join(", ")}</td>
                                        <td className="py-3 px-6">{rs.estado_ecommerce}</td>
                                        <td className="py-3 px-6">{rs.fecha_lanzamiento}</td>
                                        <td className="flex justify-center gap-1 py-3">
                                            <Link href={`/ecommerce/view/${rs._id}`} className="btn btn-info text-white">
                                                View
                                            </Link>
                                            <Link href={`/ecommerce/edit/${rs._id}`} className="btn btn-primary">
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
                        <Link href="/ecommerce/create" className="btn btn-primary">
                            Crear E-commerce
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
