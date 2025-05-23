// routes/invoiceRoutes.js
import express from 'express'
import { getVentasDelDia } from '../controllers/ventas.controller';
const router = express.Router();

router.get("/dia", getVentasDelDia);

export default router;
