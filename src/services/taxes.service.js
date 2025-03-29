import pool from "../config/db.js"

export async function getTaxes() {
    const result = await pool.query('SELECT * FROM proyecto.obtener_impuestos()');
    return result.rows;
};

/* export async function getTaxeById(codigo) {
    const result = await pool.query(`select * from proyecto.obtener_productos_codigo($1)`, [codigo])
    return result.rows[0]
} */

export async function createTaxe(identificacion,nombre,porcentaje) {
    const query = 'call proyecto.crear_impuestos($1,$2,$3)'
    const values = [identificacion,nombre,porcentaje]
    await pool.query(query, values)
    return { message: 'Impuesto creado exitosamente' };
}

export async function updateTaxe(identificacion,nombre,porcentaje) {
    const query = 'call proyecto.modificar_impuestos($1,$2,$3)'
    const values = [identificacion,nombre,porcentaje]
    const result = await pool.query(query, values)
    return result.rows[0]
}

export async function deleteTaxe(codigo) {
    await pool.query('call proyecto.eliminar_impuestos($1)',[codigo]);
    return { message: 'Impuesto eliminado exitosamente' };
};
