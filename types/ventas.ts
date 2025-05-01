interface ventas{
    id?: number;
    codigoArticulo?: number;
    articulo: string;
    cantidad: number;
    fecha: string;
    metodo_pago: string;
    precio: number;
    cajero: string;
    moneda: string;
    total: number;
}
export default ventas;