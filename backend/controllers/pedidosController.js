const Pedido = require("../models/Pedido");
const Producto = require("../models/Producto");

const crearPedido = async (req, res) => {
  try {
    const usuario = req.user.id; 
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío." });
    }

    // Obtener productos desde la BD
    const productosIds = items.map(i => i.productoId);
    const productosBD = await Producto.find({ _id: { $in: productosIds }});

    let total = 0;
    const itemsProcesados = [];

    for (const item of items) {
      const prod = productosBD.find(p => p._id.toString() === item.productoId);

      if (!prod) {
        return res.status(400).json({ error: `Producto no encontrado: ${item.productoId}` });
      }

      // Precio actual del producto
      const subtotal = prod.precio * item.cantidad;
      total += subtotal;

      itemsProcesados.push({
        producto: prod._id,
        cantidad: item.cantidad,
        precio: prod.precio
      });
    }

    const nuevoPedido = await Pedido.create({
      usuario,
      items: itemsProcesados,
      total
    });

    res.status(201).json(nuevoPedido);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerMisPedidos = async (req, res) => {
  try {
    const usuario = req.user.id;
    const pedidos = await Pedido.find({ usuario }).populate("items.producto");
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearPedido,
  obtenerMisPedidos
};