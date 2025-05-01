import Inventario from "@/app/sisfact/inventario/page";
import pool from "@/libs/mysql";
import Compra from "@/types/compra";
import Articulo from "@/types/articulo";
import { actualizarArticulo, getArticulo } from "@/service/inventario";

const getAll = async () => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from compras order by articulo'
        const [rows, fields] = await db.execute(query, []) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}
const getCompra = async (pk: number) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from compras where id = ?'
        const [rows, fields] = await db.execute(query, [pk]) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const agregarCompra = async (compra: Compra) => {
    try {
        const db = await pool.getConnection()
        const query = 'insert into compras (articulo, cantidad, precio_compra, fecha, talla) values (?, ?, ?, ?, ?)'
        const [rows, fields] = await db.execute(query, [compra.articulo, compra.cantidad, compra.precio_compra, compra.fecha, compra.talla]) as any
        db.release()

        const articulo = await getArticulo(compra.codigoArticulo || 0) as Articulo[]
        if (articulo && articulo.length === 0) {
            throw Error(`Artículo con el código: ${compra.codigoArticulo} no existe`)
        }
        const margen_ganancia = 35
        articulo[0].cantidad = articulo[0].cantidad + compra.cantidad
        articulo[0].precio_compra = compra.precio_compra
        articulo[0].precio_venta = articulo[0].precio_compra / (1 - (margen_ganancia / 100))
        actualizarArticulo(articulo[0])

        console.log('agregarCompra-rows', rows)
        const nuevaCompra = { ...rows }
        return nuevaCompra
    } catch (error) {
        throw error
    }
}


export { getAll,getCompra,agregarCompra}