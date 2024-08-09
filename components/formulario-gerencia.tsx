'use client';
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/loading';
import { NavbarComponent } from '@/components/navbar';

const FormularioGerencia = ({ accion, reloadFn }: { accion: string, reloadFn: Function }) => {
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState('');

    const fetchData = async (): Promise<void> => {
        const res = await fetch(`/api/bitacora`).then(async (response) => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.error) || response.status;
                return Promise.reject(error);
            }

            // all set, pass data to edit modal
            setData(data);
        }).catch((error) => {
            const message = error?.message || 'Hubo un error en el sistema. Intente mas tarde.'
            setError(error);
            console.log(JSON.stringify(error))
            setData(null);
            alert(message);
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();



        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

        };

        fetch(`/api/bitacora`, requestOptions).then(async (response) => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.error) || response.status;
                return Promise.reject(error);
            }

            // all set, fetch/refresh dataset

        }).catch((error) => {
            // setError(error);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>
                <form className="relative overflow-x-auto shadow-md sm:rounded-lg" onSubmit={handleSubmit}>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <h2 className="sr-only">Products</h2>
                        {data === null ? <Loading /> : ''}
                        <div  className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ingreso
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Hora
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Fecha
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Usuario
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Intentos
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Editar</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {
                                            data !== null && data.map((bitacora: any, index: any) => {
                                                return (
                                                    <tr key={bitacora.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-6 py-4">
                                                            {bitacora.id}
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {bitacora.ingreso}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {bitacora.hora}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {bitacora.fecha}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {bitacora.usuario}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {bitacora.intentos}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>


        </>

    );




};

export { FormularioGerencia };