import pool from "@/libs/mysql";
import Informe from "@/types/informe";

const getAll = async () => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from informe order by efectivo'
        const [rows, fields] = await db.execute(query, []) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}
const getInforme = async (pk: number) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from informe where id = ?'
        const [rows, fields] = await db.execute(query, [pk]) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

export{getAll, getInforme}