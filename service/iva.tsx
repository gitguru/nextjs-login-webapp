import pool from "@/libs/mysql";
import Iva from "@/types/iva";

const getAll = async () => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from iva order by iva'
        const [rows, fields] = await db.execute(query, []) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const getIva = async (pk: number) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from iva where id = ?'
        const [rows, fields] = await db.execute(query, [pk]) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const actualizarIva = async (iva: Iva) => {
    try {
        const db = await pool.getConnection()
        const query = 'update iva set iva = ?, tipo_cambio = ?'
        const [rows, fields] = await db.execute(query, [iva.iva, iva.tipo_cambio, iva.id]) as any
        db.release()
    } catch (error) {
        throw error
    }
}


export{getAll, getIva, actualizarIva}