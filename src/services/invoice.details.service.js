import pool from "../config/db.js"

export async function getInvoicesDetails() {
    const result = await pool.query('SELECT * FROM proyecto.obtener_facturas()');
    return result.rows;
};

/* export async function getInvoiceById(id) {
    const result = await pool.query(`select * from proyecto.obtener_cliente($1)`, [id])
    return result.rows[0]
} */

export async function createInvoiceDetail(cantidad,descuento,valor_total,id_producto_fk,id_factura_fk) {
    const query = 'call proyecto.crear_detalles_facturas($1,$2,$3,$4,$5)'
    const values = [cantidad,descuento,valor_total,id_producto_fk,id_factura_fk]
    await pool.query(query, values)
    return { message: 'Detalles Factura creado exitosamente' };
}