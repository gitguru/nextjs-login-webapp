import Iva from "@/types/iva";
import React, { useState, useEffect } from "react";


const FormularioIva = ({ accion, reloadFn }: { accion: string, reloadFn: Function }) => {
    const [data, setData] = useState<Iva | null>(null);
    const [error, setError] = useState('');
    const [iva, setIva] = useState<string>('');
    const [tipo_cambio, setCambio] = useState<number>(520);

   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const payload = {
            iva: iva,
            tipo_cambio: tipo_cambio,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        fetch(`/api/iva`, requestOptions).then(async (response) => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.error) || response.status;
                return Promise.reject(error);
            }

            // all set, fetch/refresh dataset
            reloadFn();
        }).catch((error) => {
            // setError(error);
        });
    };
  
    


    return (
        <>
            <div>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="floating_iva"
                            id="floating_iva"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required
                            value={iva} onChange={(e) => setIva(e.target.value)} />
                        <label htmlFor="floating_iva" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Iva</label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="floating_cambio"
                                id="floating_cambio"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required
                                value={tipo_cambio} onChange={(e) => setCambio(Number(e.target.value))} />
                            <label htmlFor="floating_cambio" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tipo cambio</label>
                        </div>

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modificar</button>

                   

                </form>

            </div>
        </>
    );

};

export { FormularioIva };