import pool from "../config/db.js"

export async function getInvoices(){
  try {
    const result = await pool.query('SELECT * FROM proyecto.consultar_facturas();');
    console.log('Facturas:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Error al consultar facturas:', error);
    throw error;
  }
}

export async function getInvoiceAdmin(adminId) {
  try {
    const result = await pool.query(
      'SELECT * FROM proyecto.consultar_facturas_por_admin($1);',
      [adminId]
    );
    console.log('Facturas del administrador:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Error al consultar facturas por administrador:', error);
    throw error;
  }
}

export async function createInvoice (numero_factura, cliente_documento, administrador_id, productos, cantidades) {
  const query = 'SELECT proyecto.crear_factura($1, $2, $3, $4, $5)';
  const values = [numero_factura, cliente_documento, administrador_id, productos, cantidades];

  const result = await pool.query(query, values);
  return result.rows[0];
};

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
