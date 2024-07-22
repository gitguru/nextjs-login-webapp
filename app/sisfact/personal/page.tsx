'use client';
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/loading';
import { NavbarComponent } from '@/components/navbar';

const Personal = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/api/auth/signin');
        },
    });
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState('');

    const fetchData = async ():Promise<void> => { 
        const res = await fetch(`/api/users`).then(async (response) => {
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
      
    return (
        <>
            <NavbarComponent />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Personal</h1>
                </div>
            </header>
            <main>
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>
                        { data === null ? <Loading /> : '' }
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Usuario
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Tipo
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Editar</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                    {
                                        data !== null && data.map((user:any, index:any) => {
                                            return (
                                                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-6 py-4">
                                                        {user.id}
                                                    </td>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {user.nombre}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {user.usuario}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user.tipo}
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
            </main>
        </>
    );
};

export default Personal;