// routes/invoiceRoutes.js
import express from 'express'
const { getVentasDelDia } = require("../controllers/ventas.controller");
const router = express.Router();

router.get("/dia", getVentasDelDia);

export default router;
