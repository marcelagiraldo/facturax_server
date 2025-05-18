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
