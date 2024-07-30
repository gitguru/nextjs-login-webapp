'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/loading';
import { NavbarComponent } from '@/components/navbar';
import React, { useState, useEffect } from "react";
import Articulo from '@/types/articulo';
import { FormularioArticulo } from '@/components/formulario-articulo';

const Inventario = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin');
        },
    });
    const [data, setData] = useState<Articulo[] | null>(null);
    const [error, setError] = useState('');
    const [mostrarFormularioArticulo, setMostrarFormularioArticulo] = useState<boolean>(false);

    const fetchData = async (): Promise<void> => {
        const res = await fetch(`/api/inventario`).then(async (response) => {
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
        })
        .finally(() => setMostrarFormularioArticulo(false));
    };

    const mostrarFormularioArticuloBtn = () => {
        setMostrarFormularioArticulo(!mostrarFormularioArticulo)
    }

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
                    <div className="relative flex h-16 items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Inventarios</h1>
                        <button type="button" className="rounded-md bg-black px-10 py-2 text-white" onClick={mostrarFormularioArticuloBtn}>Agregar</button>
                    </div>
                </div>
            </header>
            <main>
                <div className="bg-white">
                    
                    {mostrarFormularioArticulo === true &&
                        <FormularioArticulo accion='agregar' reloadFn={fetchData} />
                    }

                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:text-center sm:py-24 lg:max-w-7xl lg:px-8">
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
                                            Talla
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Precio Compra
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Precio Venta
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Editar</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {
                                             data !== null && data.map((articulo: Articulo, index: any) => {
                                                return (
                                                    <tr key={articulo.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-6 py-4">
                                                            {articulo.id}
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {articulo.articulo}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {articulo.cantidad}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {articulo.talla}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {articulo.precio_compra}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {articulo.precio_venta}
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
                </div>

            </main >
        </>
    );

};

export default Inventario;