import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin', 
    database: process.env.DB_NAME, 
    waitForConnections: true, 
    connectionLimit: 10, 
}).promise();

(async () => {
    try{
        const conn = await db.getConnection()
        console.log("MySQL connected Succesfully");
        conn.release()
    }catch(err){
        console.log(err)
    }
})();

export default db;