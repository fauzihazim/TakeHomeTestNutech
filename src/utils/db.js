import mysql from 'mysql2/promise';
import 'dotenv/config';

export const conn = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

export async function testConnection() {
    let connection;
    try {
        connection = await conn.getConnection();
        await connection.ping(); // Simple ping test
        console.log('✅ Database connection successful');
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    } finally {
        if (connection) connection.release();
    }
}