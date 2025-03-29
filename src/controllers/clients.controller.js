import { createClient, deleteClient, getClientById, getClients, updateClient } from '../services/clients.service.js'

export const getClientsController = async (req, res, next) => {
    try {
        const clients = await getClients();
        res.json(clients);
    } catch (error) {
        next(error);
    }
};


export const getClientByIdController = async (req, res, next) => {
    try {
        const setId = req.params.id
        const client = await getClientById(setId);;
        if (!client) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(client);
    } catch (error) {
        next(error);
    }
};

export const postClientController = async (req, res, next) => {
    try {
        const { documento, nombre, direccion, telefono, email, ciudad, departamento } = req.body;

        if (!documento || !nombre || !direccion || !telefono || !email || !ciudad || !departamento) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const resultado = await createClient(documento, nombre, direccion, telefono, email, ciudad, departamento);
        res.status(201).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const updateClientController = async (req, res) => {
    try {
        const { documento, nombre, direccion, telefono, email, ciudad, departamento } = req.body;
        
        if (!documento) {
            return res.status(400).json({ message: "El número de documento es obligatorio" });
        }

        const updatedClient = await updateClient(documento, nombre, direccion, telefono, email, ciudad, departamento);
        
        return res.status(200).json({ message: "Cliente actualizado exitosamente", cliente: updatedClient });
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteClientController = async (req, res) => {
    try {
        const setId = req.params.id

        if (!setId) {
            return res.status(400).json({ message: "El ID del cliente es obligatorio" });
        }

        await deleteClient(setId);
        return res.status(200).json({ message: "Cliente eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};