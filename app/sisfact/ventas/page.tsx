'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/loading';
import { NavbarComponent } from '@/components/navbar';
import React, { useState, useEffect } from "react";
import Venta from '@/types/ventas';
import { FormularioVentas } from '@/components/formulario-venta';
import { FormularioInforme } from '@/components/formulario-informe';

const Ventas = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin');
        },
    });

    const [data, setData] = useState<Venta[] | null>(null);
    const [error, setError] = useState('');
    const [mostrarFormularioVentas, setMostrarFormularioVentas] = useState<boolean>(false);
    const [mostrarFormularioInforme, setMostrarFormularioInforme] = useState<boolean>(false);

    const fetchData = async (): Promise<void> => {
        const res = await fetch(`/api/venta`).then(async (response) => {
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
            .finally(() => setMostrarFormularioVentas(false));

            const iva = await fetch(`/api/informe`).then(async (response) => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.error) || response.status;
                    return Promise.reject(error);
                }
    
                // all set, pass data to edit modal
    
            }).catch((error) => {
                const message = error?.message || 'Hubo un error en el sistema. Intente mas tarde.'
                setError(error);
                console.log(JSON.stringify(error))
    
                alert(message);
            })
                .finally(() => setMostrarFormularioInforme(false));
    };

    

    const mostrarFormularioVentaBtn = () => {
        setMostrarFormularioVentas(!mostrarFormularioVentas)
    }
    const mostrarFormularioInformeBtn = () => {
        setMostrarFormularioInforme(!mostrarFormularioInforme)
    }

    useEffect(() => {
        fetchData();
    }, []);



    if (status === 'loading') {
        return (<Loading />);
    } else if (status === 'authenticated') {
        // if (session?.user?.role === UserRole.SERVICE_ACCOUNT) {
        if (session?.user?.tipo !== 1 && session?.user?.tipo !== 2 && session?.user?.tipo !== 3 && session?.user?.tipo !== 4) {
             console.log('Usuario no pertenece al grupo de gerencia!')
             redirect('/sisfact')
        }
    }

    return (
        <>
            <NavbarComponent />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ventas</h1>
                        <button type="button" className="rounded-md bg-black px-10 py-2 text-white" onClick={mostrarFormularioVentaBtn}>Facturar</button>
                        <button type="button" className="rounded-md bg-black px-10 py-2 text-white" onClick={mostrarFormularioInformeBtn}>Informe</button>
                    </div>
                </div>
            </header>
            <main>
                <div className="bg-white">
                    {mostrarFormularioVentas === true &&
                        <FormularioVentas accion='agregar' reloadFn={fetchData} />
                    }
                    {mostrarFormularioInforme === true &&
                        <FormularioInforme accion='agregar' reloadFn={fetchData} />
                    }


                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:text-center sm:py-24 lg:max-w-7xl lg:px-8">
                        <label className="text-gray-900" htmlFor="text">Ventas del dia</label><br />
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
                                            fecha
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            metodo pago
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Precio
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Cajero
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Moneda
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Facturar</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {
                                            data !== null && data.map((venta: any, index: any) => {
                                                return (
                                                    <tr key={venta.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-6 py-4">
                                                            {venta.id}
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {venta.articulo}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {venta.cantidad}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {venta.fecha}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {venta.metodo_pago}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {venta.precio}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {venta.cajero}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {venta.moneda}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {venta.total}
                                                        </td>

                                                        <td className="px-6 py-4 text-right">
                                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Facturar</a>
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

                    <span>Contenido aquí</span>
                </div>


            </main >
        </>
    );
};

export default Ventas;