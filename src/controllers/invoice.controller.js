import { createInvoice, getInvoices } from "../services/invoice.service.js";

export const getInvoicesController = async (req, res, next) => {
    try {
        const invoices = await getInvoices();
        res.json(invoices);
    } catch (error) {
        next(error);
    }
};

export const postInvoiceController = async (req, res, next) => {
    try {
        const { codigo,fecha,subtotal,total_impuestos,total,estado,id_cliente_fk,id_metodo_pago_fk } = req.body;

        if (!codigo || !fecha || !subtotal || !total_impuestos || !total || !estado || !id_cliente_fk || !id_metodo_pago_fk) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const resultado = await createInvoice(codigo,fecha,subtotal,total_impuestos,total,estado,id_cliente_fk,id_metodo_pago_fk);
        res.status(201).json(resultado);
    } catch (error) {
        next(error);
    }
};