import mysql from 'mysql2/promise'
import { DB_HOST, DB_USER, DB_PASS, DB_SCHEMA } from '@/config';

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_SCHEMA,
    waitForConnections: true
})

export default pool
