const { obtenerVentasDelDia } = require("../services/ventas.service");

// controllers/facturaController.js
export const getVentasDelDia = async (req, res) => {
  try {
    const data = await obtenerVentasDelDia();
    res.json(data);
  } catch (error) {
    console.error("Error en getVentasDelDia:", error);
    res.status(500).json({ message: "Error al obtener datos de ventas" });
  }
};

