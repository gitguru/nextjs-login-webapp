import pool from "@/libs/mysql";
import Personal from "@/types/personal";

const getAll = async () => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from personal order by nombre'
        const [rows, fields] = await db.execute(query, []) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const getPersonal = async (pk: number) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from personal where id = ?'
        const [rows, fields] = await db.execute(query, [pk]) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const agregarPersonal = async (personal: Personal) => {
    try {
        const db = await pool.getConnection()
        const query = 'insert into personal (nombre, apellido1, apellido2, puesto, cedula) values (?, ?, ?, ?, ?)'
        const [rows, fields] = await db.execute(query, [personal.nombre, personal.apellido1, personal.apellido2, personal.puesto, personal.cedula]) as any
        db.release()


        console.log('agregarPersonal-rows', rows)
        const nuevoPersonal = { ...rows }
        return nuevoPersonal
    } catch (error) {
        throw error
    }
}

export {getAll,getPersonal,agregarPersonal}
