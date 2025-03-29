import pg from 'pg';
import { config } from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
});

pool.connect((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión correcta a la base de datos');

    }
});

export default pool;