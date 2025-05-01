interface Compra {
    id?: number;
    codigoArticulo?: number;
    articulo: string;
    cantidad: number;
    precio_compra: number;
    fecha: string;
    talla: string;
}

export default Compra