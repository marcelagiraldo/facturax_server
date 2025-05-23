import pool from "../config/db.js"

export const obtenerVentasDelDia = async () => {
  const query = `
    SELECT
      COALESCE(SUM(total_pagar), 0) AS total,
      COALESCE(SUM(CASE WHEN metodo_pago = 'efectivo' THEN total_pagar ELSE 0 END), 0) AS efectivo,
      COALESCE(SUM(CASE WHEN metodo_pago != 'efectivo' THEN total_pagar ELSE 0 END), 0) AS otros
    FROM proyecto.facturas
    WHERE DATE(fecha) = CURRENT_DATE
  `;

  const result = await pool.query(query);
  return result.rows[0];
};