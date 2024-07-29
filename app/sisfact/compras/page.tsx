'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/loading';
import { NavbarComponent } from '@/components/navbar';
//import { useState } from 'react'
import React, { useState, useEffect } from "react";
//import "./styles.css";


const Compras = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin');
        },
    });
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState('');
    const [articulo, setarticulo]= useState(''); //estás las hice para ingresar a la base de datos
    const [cantidad, setCantidad]= useState('');
    const [precio_compra,SetCompra]= useState('');
    const [fecha, setFecha ]= useState('');
    const [talla, setTalla ]= useState('');

    const fetchData = async (): Promise<void> => {
        const res = await fetch(`/api/compras`).then(async (response) => {
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

    useEffect(() => {
        fetchData();
    }, []);

    

    if (status === 'loading') {
        return (<Loading />);
    } else if (status === 'authenticated') {
        // if (session?.user?.role === UserRole.SERVICE_ACCOUNT) {
        if (session?.user?.tipo !== 1) {
            // console.log('Usuario no pertenece al grupo de gerencia!')
            // redirect('/sisfact')
        }
    }



    return (
        <>
            <NavbarComponent />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Compras</h1>
                </div>
            </header>
            <main>
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:text-center sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>
                        <label className="text-gray-900" htmlFor="text">Ingrese el articulo</label><br />

                        <input type="text" id="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">ingrese la cantidad</label><br />
                        <input type="number" id="number" placeholder="1" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">Precio Compra</label><br />

                        <input type="text" id="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">Fecha</label><br />

                        <input type="date" id="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">Talla</label><br />

                        <input type="text" id="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">Precio total</label><br />

                        <input type="text" id="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">Registro</label><br />
                       
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Articulo
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Cantidad
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Precio Compra
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Fecha
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Talla
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Editar</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {
                                             data !== null && data.map((compra: any, index: any) => {
                                                return (
                                                    <tr key={compra.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-6 py-4">
                                                            {compra.id}
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {compra.articulo}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {compra.cantidad}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {compra.precio_compra}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {compra.fecha}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {compra.talla}
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
                        <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">Procesar</button>\u00A0 
                        <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">falta</button>
                        

                        <span>Contenido aquí</span>
                    </div>
                </div>

            </main >
        </>
    );

};

export default Compras;