const express = require("express");
const router = express.Router();
const pool = require("../db"); // asegúrate que tu archivo `db.js` exporte el pool de conexión

router.get("/dia", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COALESCE(SUM(total_pagar), 0) AS total,
        COALESCE(SUM(CASE WHEN metodo_pago = 'efectivo' THEN total_pagar ELSE 0 END), 0) AS efectivo,
        COALESCE(SUM(CASE WHEN metodo_pago != 'efectivo' THEN total_pagar ELSE 0 END), 0) AS otros
      FROM proyecto.facturas
      WHERE DATE(fecha) = CURRENT_DATE
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener ventas del día:", error);
    res.status(500).json({ message: "Error al obtener datos de ventas" });
  }
});

module.exports = router;
