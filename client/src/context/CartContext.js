import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existente = prev.find(item => item._id === producto._id);

      if (existente) {
        return prev.map(item =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...prev,
        { ...producto, cantidad: 1, carritoId: crypto.randomUUID() }
      ];
    });
  };

  const eliminarDelCarrito = (carritoId) => {
    setCarrito(prev => prev.filter(item => item.carritoId !== carritoId));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const actualizarCantidad = (carritoId, delta) => {
    setCarrito(prev =>
      prev
        .map(item => {
          if (item.carritoId === carritoId) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0
              ? { ...item, cantidad: nuevaCantidad }
              : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const finalizarCompra = async (token) => {
  try {
    // Preparar items para enviar al backend
    const itemsEnviar = carrito.map(item => ({
      productoId: item._id, // <- esto es clave, no usar 'producto' ni 'id'
      cantidad: item.cantidad
    }));

    console.log("Items a enviar en el pedido:", itemsEnviar);

    const apiUrl = process.env.REACT_APP_API_URL;

    const res = await fetch(`${apiUrl}/api/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ items: itemsEnviar })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error al crear pedido");

    vaciarCarrito();
    return data;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        finalizarCompra,
        actualizarCantidad,
        total,
        cantidadCarrito: carrito.length
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
