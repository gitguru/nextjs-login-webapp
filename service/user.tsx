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

const validarCredencialesDeUsuario = async (username: string, password: string) => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from usuarios where usuario = ? and contrasena = ?'
        const [rows, fields] = await db.execute(query, [username, password]) as any
        db.release()

        if (rows === undefined || rows.length == 0) {
            // actualizar bitácora
            agregarABitacora(username, 'INGRESO - FALLIDO')
            throw new Error('Usuario o contraseña incorrectos.')
        }

        // actualizar bitácora
        agregarABitacora(username, 'INGRESO - VALIDO')

        // retornar los datos del usuario que ha ingresado
        return rows
    } catch (error) {
        throw error
    }
}

const agregarABitacora = async (username: string, ingreso: string) => {
    try {
        const db = await pool.getConnection()
        const today = new Date()
        const hora = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
        const fecha = `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`

        const query = 'insert into bitacora (ingreso, hora, fecha, usuario) values (?, ?, ?, ?)'
        const [rows, fields] = await db.execute(query, [ingreso, hora, fecha, username]) as any
        db.release()
    } catch (error) {
        throw error
    }
}

export { getAll, getUser, validarCredencialesDeUsuario, agregarABitacora }
