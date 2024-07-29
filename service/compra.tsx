import pool from "@/libs/mysql";


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
const getInsert = async () => {
    try {
        const db = await pool.getConnection()
        const query = 'insert into compras(articulo,cantidad,precio_compra,fecha,talla) values ("",,, "","");'
        const [rows, fields] = await db.execute(query, []) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}
export { getAll,getInsert }