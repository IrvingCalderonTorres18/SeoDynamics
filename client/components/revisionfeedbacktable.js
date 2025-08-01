"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";

export default function RevisionFeedbackTable() {
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:3001/revision-feedback");
            setFeedbackData(result.data);
        } catch (err) {
            console.log("Something went wrong");
        }
    }

    const handleDelete = async (id) => {
        await axios.delete("http://localhost:3001/revision-feedback/" + id);
        const newFeedbackData = feedbackData.filter((item) => item._id !== id);
        setFeedbackData(newFeedbackData);
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
                    <h2 className="font-bold">Para administración de Feedback</h2>

                    <div className="overflow-x-auto">
                        <table className="table table-auto table-zebra w-full">
                            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="py-3 px-6">#</th>
                                    <th className="py-3 px-6">id_revision</th>
                                    <th className="py-3 px-6">id_cliente</th>
                                    <th className="py-3 px-6">id_proyecto</th>
                                    <th className="py-3 px-6">fecha_revision</th>
                                    <th className="py-3 px-6">comentarios_cliente</th>
                                    <th className="py-3 px-6">calificacion</th>
                                    <th className="py-3 px-6">acciones_requeridas</th>
                                    <th className="py-3 px-6 text-center">actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbackData.map((feedback, index) => (
                                    <tr key={feedback._id} className="bg-white border-b">
                                        <td className="py-3 px-6">{index + 1}</td>
                                        <td className="py-3 px-6">{feedback.id_revision}</td>
                                        <td className="py-3 px-6">{feedback.id_cliente}</td>
                                        <td className="py-3 px-6">{feedback.id_proyecto}</td>
                                        <td className="py-3 px-6">{feedback.fecha_revision}</td>
                                        <td className="py-3 px-6">{feedback.comentarios_cliente}</td>
                                        <td className="py-3 px-6">{feedback.calificacion}</td>
                                        <td className="py-3 px-6">{feedback.acciones_requeridas}</td>
                                        <td className="flex justify-center gap-1 py-3">
                                            <Link href={`/revision-feedback/view/${feedback._id}`} className="btn btn-info text-white">
                                                View
                                            </Link>
                                            <Link href={`/revision-feedback/edit/${feedback._id}`} className="btn btn-primary">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(feedback._id)} className="btn btn-error text-white">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-2 py-5 w-full text-white">
                        <Link href="/revision-feedback/create" className="btn btn-primary">
                            Crear Feedback
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
