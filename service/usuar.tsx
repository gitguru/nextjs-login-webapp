import pool from "@/libs/mysql";
import Usuarios from "@/types/gerencia_usuarios";

const getAll = async () => {
    try {
        const db = await pool.getConnection()
        const query = 'select * from usuarios order by usuario'
        const [rows, fields] = await db.execute(query, []) as any
        db.release()
        
        return rows
    } catch (error) {
        throw error
    }
}

const getUsu = async (pk: number) => {
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

const agregarUsuario = async (usuario: Usuarios) => {
    try {
        const db = await pool.getConnection()
        const query = 'insert into usuarios (usuario, contrasena, tipo, nombre) values (?, ?, ?, ?)'
        const [rows, fields] = await db.execute(query, [usuario.usuario, usuario.contrasena, usuario.tipo, usuario.nombre]) as any
        db.release()


        console.log('agregarUsuario-rows', rows)
        const nuevoUsuario = { ...rows }
        return nuevoUsuario
    } catch (error) {
        throw error
    }
}

export {getAll,getUsu,agregarUsuario}