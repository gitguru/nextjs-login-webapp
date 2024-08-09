import pool from "@/libs/mysql";


const getAll = async () => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from bitacora order by ingreso'
        const [rows, fields] = await db.execute(query, []) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}
const getBita = async (pk: number) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from bitacora where id = ?'
        const [rows, fields] = await db.execute(query, [pk]) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

export{getAll, getBita}