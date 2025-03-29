import { createTaxe, deleteTaxe, getTaxes, updateTaxe } from '../services/taxes.service.js';

export const getTaxesController = async (req, res, next) => {
    try {
        const taxes = await getTaxes();
        res.json(taxes);
    } catch (error) {
        next(error);
    }
};

export const postTaxeController = async (req, res, next) => {
    try {
        const { identificacion,nombre,porcentaje } = req.body;

        if (!identificacion || !nombre || !porcentaje) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const resultado = await createTaxe(identificacion,nombre,porcentaje);
        res.status(201).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const updateTaxeController = async (req, res) => {
    try {
        const { identificacion,nombre,porcentaje } = req.body;
        
        if (!identificacion) {
            return res.status(400).json({ message: "El número de identificacion es obligatorio" });
        }

        const updatedTaxe = await updateTaxe(identificacion,nombre,porcentaje);
        
        return res.status(200).json({ message: "Impuesto actualizado exitosamente", cliente: updatedClient });
    } catch (error) {
        console.error("Error al actualizar impuesto:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteTaxeController = async (req, res) => {
    try {
        const setId = req.params.id

        if (!setId) {
            return res.status(400).json({ message: "El ID del impuesto es obligatorio" });
        }

        await deleteTaxe(setId);
        return res.status(200).json({ message: "Impuesto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar impuesto:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};