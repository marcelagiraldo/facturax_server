import express from 'express'
import clientRoutes from './routes/clients.router.js'
import categoryRoutes from './routes/category.router.js'
import invoiceRoutes from './routes/invoice.router.js'
import invoiceDetailsRoutes from './routes/invoice.detail.router.js'
import paymentMethodRoutes from './routes/payment.method.router.js'
import productRoutes from './routes/products.router.js'
import taxesRoutes from './routes/taxes.router.js'
import userRoutes from './routes/user.router.js'
import pool from './config/db.js'
import {errorHandler} from './middleware/errorHandler.js'
import cors from 'cors'

const app = express();

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Hola, el Servidor esta corriendo en http://localhost:${PORT}`);
});


app.use(cors())
app.use(express.json());

app.get('/api',async (req,res)=>{
  console.log('Start');
  const result = await pool.query("SELECT current_database()")
  console.log('End');
  res.send(`El nombre de la base de datos es: ${result.rows[0].current_database}`)
  
})

app.get('/api/ping', async(req,res)=>{
  const result = await pool.query('SELECT NOW()')
  return res.json(result.rows[0])
})

app.use('/api/clientes', clientRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/facturas', invoiceRoutes);
app.use('/api/detallesFactura', invoiceDetailsRoutes);
app.use('/api/metodosPago', paymentMethodRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/impuestos', taxesRoutes);
app.use('/api/usuarios', userRoutes);

app.use(errorHandler);

export default app
