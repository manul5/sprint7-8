require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Validar que existe MONGODB_URI
if (!process.env.MONGODB_URI) {
  console.error('\n⚠️  ERROR: Falta la variable MONGODB_URI en el archivo .env');
} else {
  mongoose.connect(process.env.MONGODB_URI)
      .then(() => {
        console.log('✅ ¡Conexión exitosa a MongoDB!');
      })
      .catch((err) => {
        console.error('❌ Error al conectar a MongoDB:', err.message);
      });
}

// Habilitar CORS
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// JSON parsing middleware
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
const productosRoutes = require("./routes/productosRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/productos", productosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});