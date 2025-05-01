import Inventario from "@/app/sisfact/inventario/page";
import pool from "@/libs/mysql";
import Venta from "@/types/ventas";
import Articulo from "@/types/articulo";
import { actualizarArticulo, getArticulo } from "@/service/inventario";

const getAll = async () => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from ventas order by articulo'
        const [rows, fields] = await db.execute(query, []) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}
const getVenta = async (pk: number) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from ventas where id = ?'
        const [rows, fields] = await db.execute(query, [pk]) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const agregarVenta= async (venta: Venta) => {
    try {
        const db = await pool.getConnection()
        const query = 'insert into ventas (articulo, cantidad, fecha, metodo_pago, precio, cajero, moneda, total) values (?, ?, ?, ?, ?, ?, ?, ?)'
        const [rows, fields] = await db.execute(query, [venta.articulo, venta.cantidad, venta.fecha, venta.metodo_pago, venta.precio, venta.cajero, venta.moneda, venta.total]) as any
        db.release()

        const articulo = await getArticulo(venta.codigoArticulo || 0) as Articulo[]
        if (articulo && articulo.length === 0) {
            throw Error(`Artículo con el código: ${venta.codigoArticulo} no existe`)
        }
        //const margen_ganancia = 35
        articulo[0].cantidad = articulo[0].cantidad - venta.cantidad
        
        //articulo[0].precio_venta = articulo[0].precio_compra / (1 - (margen_ganancia / 100))
        actualizarArticulo(articulo[0])

        console.log('agregarVenta-rows', rows)
        const nuevaVenta = { ...rows }
        return nuevaVenta
    } catch (error) {
        throw error
    }
}


export { getAll,getVenta,agregarVenta}