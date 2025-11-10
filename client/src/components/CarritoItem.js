import './CarritoItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function CarritoItem ({ item, onEliminar, onActualizarCantidad  }){
  
  const handleEliminar = () => {
    const confirmar = window.confirm(
      `¿Deseás remover "${item.nombre}" de tu selección?`
    );
    if (confirmar) {
      onEliminar(item.carritoId);
    }
  };

  const imageUrl = item?.imagenUrl
  ? item.imagenUrl.startsWith('http')
    ? item.imagenUrl
    : `/assets/${item.imagenUrl.replace(/^\/?assets\//, '')}`
  : item?.imagen
    ? `/assets/${item.imagen.replace(/^\/?assets\//, '')}`
    : '/assets/default.jpg';

  return(
    <div className="carrito-item">
      <img 
        src={imageUrl} 
        alt={item.nombre}
        className="carrito-item-imagen"
      />
      
      <div className="carrito-item-info">
        <div className="info-principal">
          <h3>{item.nombre}</h3>
          <p className="categoria">{item.categoria}</p>
          <p className="precio">${item.precio.toLocaleString()}</p>
        </div>

        <div className="info-secundaria">
          <div className="cantidad-control">
            <button onClick={() => onActualizarCantidad(item.carritoId, -1)}>-</button>
            <span>{item.cantidad} unidades</span>
            <button onClick={() => onActualizarCantidad(item.carritoId, 1)}>+</button>
          </div>
          
          <button 
            className="btn-eliminar"
            onClick={handleEliminar}
            title="Remover esta pieza">
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};