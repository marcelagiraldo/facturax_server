import pool from "../config/db.js"

export const crearNota = async (title, date) => {
  const query = 'call proyecto.crear_nota($1,$2);';
  await pool.query(query, [title, date]);
  return { message: 'Nota creada exitosamente' };
};

export const listarNotas = async () => {
  const result = await pool.query('select * from proyecto.listar_notas();');
  return result.rows;
  
};

export const borrarNota = async (id) => {
  await pool.query('select * from proyecto.borrar_notas($1);', [id]);
};