'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { User } from '@/components/user-component';
import { Loading } from '@/components/loading';
// import { UserRole } from '@/libs/types';
// import { signIn, signOut, useSession } from "next-auth/client"

const Gerencia = () => {
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
        if (session?.user?.tipo === 1) {
            // redirect('/dashboard/api_provider/apis');
            // hacer algo dependiendo del tipo de usuario
        }
    }
      
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between px-4">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <p>Página pricipal de gerencia</p>
                    <User />
                    ({ session?.user?.tipo === 1 })
                </div>
            </main>
        </>
    );
};

export default Gerencia;