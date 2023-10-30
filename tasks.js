import mysql from "mysql2"

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()
export async function getTasks(){
    const [result] = await pool.query(`
        SELECT * FROM tasks
        `)
    return result
}
export async function getTask(id){
    const [result] = await pool.query(`
        SELECT * FROM tasks WHERE id = ?
    `, [id])
    return result
}
export async function createTask(content){
    const [result] = await pool.query(`
        INSERT INTO tasks (content)
        VALUES
        (?)
        `, [content])
    return result[0]
}
export async function updateTask(content, id){
    const [result] = await pool.query(`
        UPDATE tasks
        SET content = ? 
        WHERE id = ?
    `, [content, id])
    return result
}
export async function deleteTask(id){
    const [result] = await pool.query(`
        DELETE FROM tasks WHERE id = ?
    `, [id])
    return result
}
