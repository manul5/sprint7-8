const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/perfil", authMiddleware, (req, res) => {
  res.json({ message: "Accediste al perfil", user: req.user });
});

module.exports = router;