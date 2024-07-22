'use client'

import { redirect } from 'next/navigation';
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { User } from '@/components/user-component';
import { Loading } from '@/components/loading';
import { Conditional } from '@/components/conditional-render';
import { NavbarComponent } from '@/components/navbar';
import { useState } from 'react';

const products = [
    {
        id: 1,
        name: 'Gerencia',
        href: '/sisfact/gerencia',
        price: '$48',
        imageSrc: '/imagenes/gerencia.jpg',
        imageAlt: 'Area de gerencia',
    },
    {
        id: 2,
        name: 'Compras',
        href: '/sisfact/compras',
        price: '$48',
        imageSrc: '/imagenes/compras.jpeg',
        imageAlt: 'Area de compras.',
    },
    {
        id: 3,
        name: 'Ventas',
        href: '/sisfact/ventas',
        price: '$48',
        imageSrc: '/imagenes/ventas.png',
        imageAlt: 'Area de ventas.',
    },
    {
        id: 4,
        name: 'Personal',
        href: '/sisfact/personal',
        price: '$48',
        imageSrc: '/imagenes/personal.jpeg',
        imageAlt: 'Area de personal.',
    },
    // Agregar mas opciones aquí...
]

export default function Sisfact() {
    const { data: session, status } = useSession()
    // const [tipoUsuario, setTipoUsuario] = useState(session?.user?.tipo)

    if (status === 'loading') {
        return (<Loading />);
    } else if (status === 'authenticated') {
        // check if we have to redirecto to gerencia
        if (session?.user?.tipo === 1) {
            // redirect('/sisfact/gerencia');
        }
    }

    return (
        <>
            <NavbarComponent />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Menú</h1>
                </div>
            </header>
            <main>
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map((product) => (
                                <a key={product.id} href={product.href} className="group">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                            alt={product.imageAlt}
                                            src={product.imageSrc}
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                    {/* <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p> */}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </>
    );

}