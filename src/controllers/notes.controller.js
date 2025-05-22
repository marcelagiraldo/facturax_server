import { borrarNota, crearNota, listarNotas } from "../services/notes.service.js";

export const crearNotaController = async (req, res) => {
  const { title, date } = req.body;
  try {
    await crearNota(title, date);
    res.status(201).json({ message: 'Nota creada con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarNotasController = async (req, res) => {
  try {
    const notas = await listarNotas();
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const borrarNotaController = async (req, res) => {
  const { id } = req.params;
  try {
    await borrarNota(id);
    res.json({ message: 'Nota eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};