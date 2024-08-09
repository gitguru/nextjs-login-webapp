'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/loading';
import { NavbarComponent } from '@/components/navbar';
import React, { useState, useEffect } from "react";
import Personal from '@/types/personal';
import { FormularioGerencia } from '@/components/formulario-gerencia';
import { FormularioPersona } from '@/components/formulario-personal';
import Usuarios from '@/types/gerencia_usuarios';
import { FormularioUsuarios } from '@/components/formulario-usuarios';
import Iva from '@/types/iva';
import { FormularioIva } from '@/components/formulario-iva';


const Gerencia = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin');
        },
    });

    const [data, setData] = useState<Personal[] | null>(null);
    const [error, setError] = useState('');
    const [mostrarFormularioBitacora, setMostrarFormularioBitacora] = useState<boolean>(false);
    const [mostrarFormularioPersonal, setMostrarFormularioPersonal] = useState<boolean>(false);
    const [mostrarFormularioUsuarios, setMostrarFormularioUsuario] = useState<boolean>(false);
    const [mostrarFormularioIva, setMostrarFormularioIva] = useState<boolean>(false);



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

        }).catch((error) => {
            const message = error?.message || 'Hubo un error en el sistema. Intente mas tarde.'
            setError(error);
            console.log(JSON.stringify(error))

            alert(message);
        })
            .finally(() => setMostrarFormularioBitacora(false));

        const rest = await fetch(`/api/persona`).then(async (response) => {
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
            .finally(() => setMostrarFormularioPersonal(false));

        const usu = await fetch(`/api/usua`).then(async (response) => {
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
            .finally(() => setMostrarFormularioUsuario(false));

        const iva = await fetch(`/api/iva`).then(async (response) => {
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
            .finally(() => setMostrarFormularioIva(false));

    };

    const mostrarFormularioBitacoraBtn = () => {
        setMostrarFormularioBitacora(!mostrarFormularioBitacora)
    }
    const mostrarFormularioPersonalBtn = () => {
        setMostrarFormularioPersonal(!mostrarFormularioPersonal)
    }
    const mostrarFormularioUsuarioBtn = () => {
        setMostrarFormularioUsuario(!mostrarFormularioUsuarios)
    }
    const mostrarFormularioIvaBtn = () =>{
        setMostrarFormularioIva(!mostrarFormularioIva)
    }


    useEffect(() => {
        fetchData();

    }, []);



    if (status === 'loading') {
        return (<Loading />);
    } else if (status === 'authenticated') {
        // if (session?.user?.role === UserRole.SERVICE_ACCOUNT) {
        if (session?.user?.tipo !== 1) {
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
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gerencia</h1>
                        <button type="button" className="rounded-md bg-black px-10 py-2 text-white" onClick={mostrarFormularioBitacoraBtn}>Bitacora</button>
                        <button type="button" className="rounded-md bg-black px-10 py-2 text-white" onClick={mostrarFormularioPersonalBtn}>Agregar personal</button>
                        <button type="button" className="rounded-md bg-black px-10 py-2 text-white" onClick={mostrarFormularioUsuarioBtn}>Agregar Usuarios</button>
                        <button type="button" className="rounded-md bg-black px-10 py-2 text-white" onClick={mostrarFormularioIvaBtn}>Modificar Iva</button>
                    </div>
                </div>
            </header>
            <main>
                <div className="bg-white">


                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:text-center sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>
                        {mostrarFormularioBitacora === true &&
                            <FormularioGerencia accion='agregar' reloadFn={fetchData} />

                        }
                        {mostrarFormularioPersonal === true &&
                            <FormularioPersona accion='agregar' reloadFn={fetchData} />

                        }
                        {mostrarFormularioUsuarios === true &&
                            <FormularioUsuarios accion='agregar' reloadFn={fetchData} />

                        }
                          {mostrarFormularioIva === true &&
                            <FormularioIva accion='modificar' reloadFn={fetchData} />

                        }

                        <span>Contenido aquí</span>
                    </div>
                </div>

            </main>
        </>
    );
};

export default Gerencia;