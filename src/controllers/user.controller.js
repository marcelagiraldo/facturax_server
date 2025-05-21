import { createUser, getUsertById, updateUser } from "../services/user.service.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

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
    const { documento, nombre, apellido, email, telefono, contraseia, rol } = req.body;
    try {
        if (!documento || !nombre || !apellido || !email || !telefono || !contraseia) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (!rol || rol.trim() === '') {
            rol = 'admin'; 
        }
        const oldUser = await getUsertById(documento)

        if (oldUser) {
            return res.send({ data: 'El usuario ya existe' })
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseia, saltRounds);

        const resultado = await createUser(documento, nombre, apellido, email, telefono, hashedPassword,rol);
        res.status(201).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM proyecto.loginuser($1)", [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.contraseia_);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        const payload = {
            id: user.documento_,
            email: user.email_,
            rol: user.rol_,
        };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

        res.json({
            success: true,
            token,
            user: {
                nombre: user.nombre_,
                documento: user.documento_,
                apellido: user.apellido_,
                email: user.email_,
                telefono: user.telefono_,
                rol: user.rol_,
                administrador_id : user.administrador_id_
            },
            message: "Login exitoso",
        });

        console.log("Usuario en el backend con login: ",user);
        

    } catch (err) {
        console.error("Error en el login:", err);
        res.status(500).json({ error: "Error en el login", detalle: err.message });
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

