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
    
    //function CambioValor(name){
       // if(document.getElementById(name).checked){
      //      document.getElementById().value ="1";
       // }
   // }

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
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:text-center lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>
                        <label className="text-gray-900" htmlFor="text">Ingrese el articulo</label><br />

                        <input type="text" id="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">fecha</label><br />
                        <input type="date" id="text" placeholder="1" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">Metodo de pago</label><br />
                        <label className="text-gray-900" htmlFor="text">Tarjeta</label>\

                        <input type="radio"  name="radio1" value="1"   />\u00A0 
                        <label className="text-gray-900" htmlFor="text">Efectivo</label>\
                        <input type="radio" name="radio1" value="2"  defaultChecked ={true} /><br />
                        <label className="text-gray-900" htmlFor="text">Precio</label><br />

                        <input type="text" id="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">cajero</label><br />

                        <input type="text" id="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">Moneda</label><br />
                        <label className="text-gray-900" htmlFor="text">Dolares</label>\
                        <input type="radio" name="radio3" value="3" />\u00A0 
                        <label className="text-gray-900" htmlFor="text">Colones</label>\
                        <input type="radio" name="radio3" value="4" defaultChecked ={true}/><br />

                        <label className="text-gray-900" htmlFor="text">Total</label><br /> 
                        <input type="text" id="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                        <label className="text-gray-900" htmlFor="text">Vuelto</label><br />
                        <input type="text" id="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input><br />
                       
                        <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">Facturar</button>


                        <span>Contenido aquí</span>
                    </div>
                </div>

            </main>
        </>
    );
};

export default Ventas;