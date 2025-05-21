import { createInvoice, getInvoices, getInvoiceAdmin} from "../services/invoice.service.js";

export const getInvoicesController = async (req, res, next) => {
    try {
        const invoices = await getInvoices();
        res.json(invoices);
    } catch (error) {
        next(error);
    }
};

export async function getInvoiceForAdmin(req, res) {
  const adminId = req.params.adminId; // o puede venir en req.body o req.query según cómo lo envíes

  try {
    	const facturas = await getInvoiceAdmin(adminId);
	const facturasRedondeadas = facturas.map(f => ({
  	...f,
  	subtotal: parseFloat(parseFloat(f.subtotal).toFixed(2)),
  	total_descuentos: parseFloat(parseFloat(f.total_descuentos).toFixed(2)),
  	total_impuestos: parseFloat(parseFloat(f.total_impuestos).toFixed(2)),
	total_pagar: parseFloat(parseFloat(f.total_pagar).toFixed(2)),
	}));
	res.status(200).json(facturasRedondeadas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener facturas del administrador' });
  }
}

export const postInvoiceController = async (req, res, next) => {
   try {
        const { numero_factura, cliente_documento, administrador_id, productos, cantidades } = req.body;

        if (!numero_factura || !cliente_documento || !administrador_id || !productos || !cantidades) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const resultado = await createInvoice(numero_factura, cliente_documento, administrador_id, productos, cantidades);

        res.status(201).json({ factura_id: resultado });
    } catch (error) {
        next(error);
    }
};

export const getVentasDelDia = async (req, res) => {
  try {
    const { admin_id } = req.query;

    if (!admin_id) {
      return res.status(400).json({ error: "admin_id es requerido" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = await pool.query(`
      SELECT metodo_pago, SUM(total) as total
      FROM facturas
      WHERE administrador_id = $1
        AND fecha >= $2 AND fecha < $3
      GROUP BY metodo_pago
    `, [admin_id, today, tomorrow]);

    let totalVentas = 0;
    let totalEfectivo = 0;
    let totalOtros = 0;

    result.rows.forEach(row => {
      const total = parseFloat(row.total);
      totalVentas += total;

      if (row.metodo_pago.toLowerCase() === "efectivo") {
        totalEfectivo += total;
      } else {
        totalOtros += total;
      }
    });

    res.json({
      totalVentas,
      totalEfectivo,
      totalOtros
    });

  } catch (error) {
    console.error("Error al obtener ventas del día:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};