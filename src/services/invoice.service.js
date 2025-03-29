import pool from "../config/db.js"

export async function getInvoices() {
    const result = await pool.query('SELECT * FROM proyecto.obtener_facturas()');
    return result.rows;
};

/* export async function getInvoiceById(id) {
    const result = await pool.query(`select * from proyecto.obtener_cliente($1)`, [id])
    return result.rows[0]
} */

export async function createInvoice(codigo,fecha,subtotal,total_impuestos,total,estado,id_cliente_fk,id_metodo_pago_fk) {
    const query = 'call proyecto.crear_facturas($1,$2,$3,$4,$5,$6,$7,$8)'
    const values = [codigo,fecha,subtotal,total_impuestos,total,estado,id_cliente_fk,id_metodo_pago_fk]
    await pool.query(query, values)
    return { message: 'Factura creado exitosamente' };
}

/* export async function updateInvoice(documento, nombre, direccion, telefono, email, ciudad, departamento) {
    const query = 'call proyecto.modificar_clientes($1,$2,$3,$4,$5,$6,$7)'
    const values = [documento, nombre, direccion, telefono, email, ciudad, departamento]
    const result = await pool.query(query, values)
    return result.rows[0]
}

export async function deleteInvoice(id) {
    await pool.query('call proyecto.eliminar_clientes($1)',[id]);
    return { message: 'Cliente eliminado exitosamente' };
}; */
