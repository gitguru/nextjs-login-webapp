import pool from "@/app/libs/mysql";

const getUser = async (pk: number) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from usuarios where id = ?'
        const [rows] = await db.execute(query,[pk])
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
        const [rows] = await db.execute(query, [username, password])
        db.release()

        if (!rows || !rows.length) {
        // if (rows === []) {
            throw new Error('Usuario o contraseña incorrectos.')
        }


        console.log('returning loged user data...', rows);
        return rows
    } catch (error) {
        throw error
    }
}

export  { getUser, validateUserCredentials }
