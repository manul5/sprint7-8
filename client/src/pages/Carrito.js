import './Carrito.css';
import CarritoItem from '../components/CarritoItem';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Carrito({ onSeguirComprando, onVolver }) {

  const { 
    carrito, 
    eliminarItem: onEliminarItem, 
    vaciarCarrito: onVaciarCarrito, 
    actualizarCantidad: onActualizarCantidad,
    finalizarCompra
  } = useCart();

  const { token } = useAuth();

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * (item.cantidad || 1), 0);
  };

  const handleComprar = async () => {
    try {
      if (!token) {
        alert("Debés estar logueado para finalizar la compra.");
        return;
      }

      await finalizarCompra(token); 

      alert("¡Compra realizada con éxito!");

      onVolver();
    } catch (err) {
      alert("Hubo un error al realizar la compra.");
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="carrito-page">
        <div className="carrito-vacio">
          <h2>Carrito vacio</h2>
          <p>¡Descubre nuestros productos y encuentra el mueble perfecto!</p>
          <button className="btn-primary" onClick={onSeguirComprando}>
            Explorar Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <div className="carrito-header">
        <h2>Tu Carrito de Compras</h2>
        <button className="btn-volver" onClick={onVolver}>
          Volver al Inicio
        </button>
      </div>

      <div className="carrito-container">
        <div className="carrito-items">
          {carrito.map(item => (
            <CarritoItem 
              key={item.carritoId} 
              item={item} 
              onEliminar={onEliminarItem}
              onActualizarCantidad={onActualizarCantidad} 
            />
          ))}
        </div>

        <div className="carrito-resumen">
          <h3>Resumen de Compra</h3>
          <div className="resumen-detalle">
            <p>Productos: <span>{carrito.length}</span></p>
            <p className="total">Total: <span>${calcularTotal().toLocaleString()}</span></p>
          </div>
          
          <div className="carrito-acciones">

            <button
              className="btn-vaciar"
              onClick={() => {
                const confirmar = window.confirm("¿Seguro que querés vaciar el carrito?");
                if (confirmar) onVaciarCarrito();
              }}
            >
              Vaciar Carrito
            </button>
            
            <button className="btn-comprar" onClick={handleComprar}>
              Finalizar Compra
            </button>

          </div>

          <button className="btn-seguir-comprando" onClick={onSeguirComprando}>
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  );
}
