const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const {
  crearPedido,
  obtenerMisPedidos
} = require("../controllers/pedidosController");

router.post("/", auth, crearPedido);
router.get("/mios", auth, obtenerMisPedidos);

module.exports = router;