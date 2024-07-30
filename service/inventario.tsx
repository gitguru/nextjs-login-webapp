import pool from "@/libs/mysql";
import Articulo from "@/types/articulo";

const getAll = async () => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from inventario order by articulo'
        const [rows, fields] = await db.execute(query, []) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const getArticulo = async (pk: number) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from inventario where id = ?'
        const [rows, fields] = await db.execute(query, [pk]) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const agregarArticulo = async (articulo: Articulo) => {
    try {
        const db = await pool.getConnection()
        const query = 'insert into inventario (articulo, cantidad, talla, precio_compra, precio_venta) values (?, ?, ?, ?, ?)'
        const [rows, fields] = await db.execute(query, [articulo.articulo, articulo.cantidad, articulo.talla, articulo.precio_compra, articulo.precio_venta]) as any
        db.release()


        console.log('agregarArticulo-rows', rows)
        const nuevoArticulo = { ...rows }
        return nuevoArticulo
    } catch (error) {
        throw error
    }
}

const actualizarArticulo = async (articulo: Articulo) => {
    try {
        const db = await pool.getConnection()
        const query = 'update inventario set articulo = ?, cantidad = ?, talla = ?, precio_compra = ?, precio_venta = ? where id = ?'
        const [rows, fields] = await db.execute(query, [articulo.articulo, articulo.cantidad, articulo.talla, articulo.precio_compra, articulo.precio_venta, articulo.id]) as any
        db.release()
    } catch (error) {
        throw error
    }
}


const borrarArticulo = async (pk: number) => {
    try {
        const db = await pool.getConnection()
        const query = 'delete from inventario where id = ?'
        const [rows, fields] = await db.execute(query, [pk]) as any
        db.release()
    } catch (error) {
        throw error
    }
}

export { getAll, getArticulo, agregarArticulo, actualizarArticulo, borrarArticulo }
