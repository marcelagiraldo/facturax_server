import pool from "../config/db.js"

export async function getUsertById(id) {
    const result = await pool.query(`select * from proyecto.obtener_usuario($1)`, [id])
    return result.rows[0]
}

export async function createUser(documento, nombre, apellido, email, telefono, contraseia) {
    const query = `
        INSERT INTO proyecto.users (id, documento, nombre, apellido, email, telefono, contraseia)
        VALUES (nextval('proyecto.codigo_user'), $1, $2, $3, $4, $5, $6) RETURNING *;
    `
    const values = [documento, nombre, apellido, email, telefono, contraseia]
    try {
        console.log("Ejecutando consulta SQL:", query);
        console.log("Valores enviados:", values);
        const result = await pool.query(query, values);
        console.log('Pool ejecutandose');
        
        console.log(result);        
        return { message: 'Usuario creado exitosamente' };
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return { error: "Error al crear usuario",  detalle: err.message  };
    }
}

export async function updateUser(documento, nombre, apellido, email, telefono, contraseia) {
    const query = 'call proyecto.modificar_usuario($1,$2,$3,$4,$5,$6)'
    const values = [documento, nombre, apellido, email, telefono, contraseia]
    const result = await pool.query(query, values)
    return result.rows[0]
}
