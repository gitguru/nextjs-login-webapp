'use client';
import Image from "next/image";
import { useParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, {useState } from 'react';
import { ErrorAlert } from "@/components/error-alert";

export default function Home() {
    const router = useRouter();
    const params = useParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { callbackUrl } = params;

    const decodeCallbackUrl = (url: string | string[] | undefined):string => {
      if (undefined === url) {
        return '/';
      }
      if (url && url.length) {
        return decodeURI(url[0]);
      }
      return decodeURI(url as string)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const result = await signIn("credentials", {
          username,
          password,
          callbackUrl: decodeCallbackUrl(callbackUrl) ?? "/",
          redirect: false,
        });
        console.log('signin', result);
        if (result?.error) {
          setError(result.error);
        } else if (result?.ok) {
          router.push(decodeCallbackUrl(callbackUrl));
        } else {
          setError('Unexpected error trying to sign in.');
        }
    };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Sistema de facturación
        </p>
       
      </div>

      <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p className="text-center text-3xl">Bienvenid@.</p>
                <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col pt-4">
                        <label htmlFor="email" className="text-lg">Usuario</label>
                        <input type="text" id="email" placeholder="juan@email.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                          value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
    
                    <div className="flex flex-col pt-4">
                        <label htmlFor="password" className="text-lg">Contraseña</label>
                        <input type="password" id="password" placeholder="Contraseña" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                          value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
    
                    <input type="submit" value="Ingresar" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
                </form>

                <ErrorAlert error={error} setError={setError} />
        </div>

      

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-center">
        <a href="/ayuda"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          Ayuda
        </a>

        <a href="/contacto"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          Contacto
        </a>

        

      </div>
    </main>
  );
}
