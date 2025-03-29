import pool from "../config/db.js"

export async function getProducts() {
    const result = await pool.query('SELECT * FROM proyecto.obtener_productos()');
    return result.rows;
};

export async function getProductById(codigo) {
    const result = await pool.query(`select * from proyecto.obtener_productos_codigo($1)`, [codigo])
    return result.rows[0]
}

export async function createProduct(codigo, descripcion, precio_venta, impuesto_id_fk, medida, categoria_id_fk,user_id) {
    const query = 'call proyecto.crear_productos($1,$2,$3,$4,$5,$6,$7)'
    const values = [codigo, descripcion, precio_venta, impuesto_id_fk, medida, categoria_id_fk,user_id]
    await pool.query(query, values)
    return { message: 'Producto creado exitosamente' };
}

export async function updateProduct(codigo, descripcion, precio_venta, impuesto_id_fk, medida, categoria_id_fk) {
    const query = 'call proyecto.modificar_productos($1,$2,$3,$4,$5,$6)'
    const values = [codigo, descripcion, precio_venta, impuesto_id_fk, medida, categoria_id_fk]
    const result = await pool.query(query, values)
    return result.rows[0]
}

export async function deleteProduct(codigo) {
    await pool.query('call proyecto.eliminar_productos($1)',[codigo]);
    return { message: 'Producto eliminado exitosamente' };
};
