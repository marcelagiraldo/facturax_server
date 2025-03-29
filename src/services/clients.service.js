import pool from "../config/db.js"

export async function getClients() {
    const result = await pool.query('SELECT * FROM proyecto.obtener_clientes()');
    return result.rows;
};

export async function getClientById(id) {
    const result = await pool.query(`select * from proyecto.obtener_cliente($1)`, [id])
    return result.rows[0]
}

export async function createClient(documento, nombre, direccion, telefono, email, ciudad, departamento) {
    const query = 'call proyecto.crear_clientes($1,$2,$3,$4,$5,$6,$7)'
    const values = [documento, nombre, direccion, telefono, email, ciudad, departamento]
    await pool.query(query, values)
    return { message: 'Cliente creado exitosamente' };
}

export async function updateClient(documento, nombre, direccion, telefono, email, ciudad, departamento) {
    const query = 'call proyecto.modificar_clientes($1,$2,$3,$4,$5,$6,$7)'
    const values = [documento, nombre, direccion, telefono, email, ciudad, departamento]
    const result = await pool.query(query, values)
    return result.rows[0]
}

export async function deleteClient(id) {
    await pool.query('call proyecto.eliminar_clientes($1)',[id]);
    return { message: 'Cliente eliminado exitosamente' };
};
