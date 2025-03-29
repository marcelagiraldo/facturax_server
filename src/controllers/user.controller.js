import { createUser, getUsertById, updateUser } from "../services/user.service.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from "../config/db.js";

export const getUserByIdController = async (req, res, next) => {
    try {
        const setId = req.params.id
        const user = await getUsertById(setId);;
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const postUserController = async (req, res, next) => {
    const { documento, nombre, apellido, email, telefono, contraseia } = req.body;
    try {
        if (!documento || !nombre || !apellido || !email || !telefono || !contraseia) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const oldUser = await getUsertById(documento)

        if (oldUser) {
            return res.send({ data: 'El usuario ya existe' })
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseia, saltRounds);

        const resultado = await createUser(documento, nombre, apellido, email, telefono, hashedPassword);
        res.status(201).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son requeridos", code: "MISSING_CREDENTIALS" });
        }

        console.log("Intento de inicio de sesión para:", email);

        const result = await pool.query("SELECT * FROM proyecto.loginUser WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Usuario no encontrado", code: "USER_NOT_FOUND" });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.contrasenia_);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Contraseña incorrecta", code: "INVALID_PASSWORD" });
        }

        res.json({
            success: true,
            token: "aqui_va_el_token",
            user: {
                nombre: user.nombre_,
                documento: user.documento_,
                apellido: user.apellido_,
                email: user.email_
            },
            message: "Login exitoso"
        });
    } catch (err) {
        console.error("Error en el login:", err);
        res.status(500).json({ error: "Error en el login", code: "SERVER_ERROR", detalle: err.message });
    }

};

export const updateUserController = async (req, res) => {
    try {
        const { documento, nombre, apellido, email, telefono, contraseia } = req.body;

        if (!documento) {
            return res.status(400).json({ message: "El número de documento es obligatorio" });
        }

        const updateUser = await updateUser(documento, nombre, apellido, email, telefono, contraseia);

        return res.status(200).json({ message: "User actualizado exitosamente", user: updateUser });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
