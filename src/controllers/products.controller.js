import { createProduct, deleteProduct, getProductById, getProducts } from "../services/product.service.js";

export const getProductsController = async (req, res, next) => {
    try {
        const product = await getProducts();
        res.json(product);
    } catch (error) {
        next(error);
    }
};


export const getProductByIdController = async (req, res, next) => {
    try {
        const setId = req.params.id
        const product = await getProductById(setId);;
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const postProductController = async (req, res, next) => {
    try {
        const { codigo, descripcion, precio_venta, impuesto_id_fk, medida, categoria_id_fk,user_id } = req.body;

        if (!codigo || !descripcion || !precio_venta || !impuesto_id_fk || !medida || !categoria_id_fk || user_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const resultado = await createProduct(codigo, descripcion, precio_venta, impuesto_id_fk, medida, categoria_id_fk,user_id);
        res.status(201).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { codigo, descripcion, precio_venta, impuesto_id_fk, medida, categoria_id_fk } = req.body;
        
        if (!codigo) {
            return res.status(400).json({ message: "El número de código es obligatorio" });
        }

        const updatedProduct = await updateClient(codigo, descripcion, precio_venta, impuesto_id_fk, medida, categoria_id_fk);
        
        return res.status(200).json({ message: "Producto actualizado exitosamente", product: updatedProduct });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const setId = req.params.id

        if (!setId) {
            return res.status(400).json({ message: "El ID del producto es obligatorio" });
        }

        await deleteProduct(setId);
        return res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};