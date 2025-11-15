const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true
      },
      cantidad: { type: Number, required: true, min: 1 },
      precio: { type: Number, required: true }
    }
  ],

  total: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Pedido", pedidoSchema);