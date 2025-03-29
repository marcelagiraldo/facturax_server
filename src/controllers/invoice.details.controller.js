import { createInvoiceDetail, getInvoicesDetails } from "../services/invoice.details.service.js";

export const getInvoicesDetailsController = async (req, res, next) => {
    try {
        const invoices = await getInvoicesDetails();
        res.json(invoices);
    } catch (error) {
        next(error);
    }
};

export const postInvoiceDetailController = async (req, res, next) => {
    try {
        const { cantidad,descuento,valor_total,id_producto_fk,id_factura_fk } = req.body;

        if (!cantidad || !descuento || !valor_total || !id_producto_fk || !id_factura_fk) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const resultado = await createInvoiceDetail(cantidad,descuento,valor_total,id_producto_fk,id_factura_fk);
        res.status(201).json(resultado);
    } catch (error) {
        next(error);
    }
};