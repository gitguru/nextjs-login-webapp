'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/loading';
import { NavbarComponent } from '@/components/navbar';

const Ventas = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/api/auth/signin');
        },
    });
    
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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ventas</h1>
                </div>
            </header>
            <main>
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>

                        <span>Contenido aquí</span>
                    </div>
                </div>

            </main>
        </>
    );
};

export default Ventas;