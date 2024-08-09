import Inventario from "@/app/sisfact/inventario/page";
import pool from "@/libs/mysql";
import Compra from "@/types/compra";

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

const agregarCompra = async (Compra: Compra) => {
    try {
        const db = await pool.getConnection()
        const query = 'insert into compras (articulo, cantidad, precio_compra, fecha, talla) values (?, ?, ?, ?, ?)'
        const [rows, fields] = await db.execute(query, [Compra.articulo, Compra.cantidad, Compra.precio_compra, Compra.fecha, Compra.talla]) as any
        db.release()


        console.log('agregarCompra-rows', rows)
        const nuevaCompra = { ...rows }
        return nuevaCompra
    } catch (error) {
        throw error
    }
}
const unirCompra = async (Compra: Compra) => {
    try {
        const db = await pool.getConnection()
        const query = 'insert into compras (articulo, cantidad, precio_compra, fecha, talla) values (?, ?, ?, ?, ?)'
        const [rows, fields] = await db.execute(query, [Compra.articulo, Compra.cantidad, Compra.precio_compra, Compra.fecha, Compra.talla]) as any
        const query2 = 'insert into inventario (articulo, cantidad, talla, precio_compra) values (?, ?, ?, ?)'
        const [rows2, fields2] = await db.execute(query, [Compra.articulo, Compra.cantidad, Compra.talla,  Compra.precio_compra]) as any
       
        db.release()


        console.log('agregarCompra-rows', rows)
        const nuevaCompra = { ...rows }
        console.log('agregarInven-rows', rows2)
        const nuevoInven = { ...rows2 }
        return nuevaCompra
        return nuevoInven
       
    } catch (error) {
        throw error
    }
}



export { getAll,getCompra,agregarCompra, unirCompra}