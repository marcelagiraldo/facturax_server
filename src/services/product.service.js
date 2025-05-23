import pool from "../config/db.js"

export async function getProducts(user_id_) {
	try{
		if (!user_id_) throw new Error('User ID is required');
    		const result = await pool.query('select * from proyecto.productos where administrador_id=$1;',[user_id_]);
    	return result.rows || [];
	}catch(error){
		console.error('Error fetching products:', error);
        	throw error;
	}
};

export async function getProductsInactive(user_id_) {
	try{
		if (!user_id_) throw new Error('User ID is required');
    		const result = await pool.query(`select * from proyecto.productos where administrador_id=$1 and estado='activo';`,[user_id_]);
    	return result.rows || [];
	}catch(error){
		console.error('Error fetching products:', error);
        	throw error;
	}
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
