import pool from "@/libs/mysql";


const getAll = async () => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from usuarios order by nombre'
        const [rows, fields] = await db.execute(query, []) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const getUser = async (pk: number) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from usuarios where id = ?'
        const [rows, fields] = await db.execute(query, [pk]) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const validateUserCredentials = async (username: string, password: string) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from usuarios where usuario = ? and contrasena = ?'
        const [rows, fields] = await db.execute(query, [username, password]) as any
        db.release()

        if (rows === undefined || rows.length == 0) {
            throw new Error('Usuario o contraseña incorrectos.')
        }
        return rows
    } catch (error) {
        throw error
    }
}

export { getAll, getUser, validateUserCredentials }
