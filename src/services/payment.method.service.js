import pool from "../config/db.js"

export async function getPaymentMethods() {
    const result = await pool.query('SELECT * FROM proyecto.obtener_metodos_pago()');
    return result.rows;
};