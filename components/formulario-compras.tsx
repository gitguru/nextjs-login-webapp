import Compras from "@/types/compra";
import React, { useState, useEffect } from "react";


const FormularioCompras = ({ accion, reloadFn }: { accion: string, reloadFn: Function }) => {
    const [data, setData] = useState<Compras | null>(null);
    const [articulo, setArticulo] = useState<string>('');
    const [cantidad, setCantidad] = useState<number>(1);
    const [precioCompra, setPrecioCompra] = useState<number>(0);
    const [fecha, setFecha] = useState<string>('');
    const [talla, setTalla] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const payload = {
            articulo: articulo,
            cantidad: cantidad,
            precio_compra: precioCompra,
            fecha: fecha,
            talla: talla,


        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        fetch(`/api/compras`, requestOptions).then(async (response) => {
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
                            name="floating_articulo"
                            id="floating_articulo"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required
                            value={articulo} onChange={(e) => setArticulo(e.target.value)} />
                        <label htmlFor="floating_articulo" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingrese el Artículo</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="number"
                                name="floating_cantidad"
                                id="floating_cantidad"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required
                                value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} />
                            <label htmlFor="floating_cantidad" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingrese la Cantidad</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="number"
                                name="floating_precio_compra"
                                id="floating_precio_compra"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required
                                value={precioCompra} onChange={(e) => setPrecioCompra(Number(e.target.value))} />
                            <label htmlFor="floating_precio_compra" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Precio compra</label>
                        </div>

                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="date"
                                name="floating_fecha"
                                id="floating_fecha"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required
                                value={fecha} onChange={(e) => setFecha(e.target.value)} />
                            <label htmlFor="floating_fecha" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="floating_talla"
                                id="floating_talla"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required
                                value={talla} onChange={(e) => setTalla(Number(e.target.value))} />
                            <label htmlFor="floating_talla" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Talla</label>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>


                </form>

            </div>
        </>
    );

};

export { FormularioCompras };