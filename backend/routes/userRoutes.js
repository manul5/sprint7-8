const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");
const router = express.Router();

router.get("/perfil", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email"); // solo nombre y email
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;