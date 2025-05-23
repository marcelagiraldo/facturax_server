// routes/invoiceRoutes.js
const express = require("express");
const { getVentasDelDia } = require("../controllers/ventas.controller");
const router = express.Router();

router.get("/dia", getVentasDelDia);

module.exports = router;
