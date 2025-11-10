import './ProductCard.css';

const ProductCard = ({ producto, onProductoClick }) => {
  const imageUrl = producto?.imagenUrl
  ? producto.imagenUrl.startsWith('http') 
    ? producto.imagenUrl   // URL externa
    : `/assets/${producto.imagenUrl.replace(/^\/?assets\//, '')}` // ruta local
  : '/assets/default.jpg';

  return (
    <div className="card" onClick={() => onProductoClick(producto)}>
      <div className="card-img">
        <img src={imageUrl} alt={producto.nombre} />
        {producto.destacado && <span className="tag">Destacado</span>}
      </div>
      
      <div className="card-body">
        <h3>{producto.nombre}</h3>
        <p className="categoria">{producto.categoria}</p>
        <p className="descripcion">
          {producto.descripcion.substring(0, 80)}...
        </p>
        
        <div className="card-footer">
          <div className="precio">${producto.precio.toLocaleString()}</div>
          <button className="btn">Ver Detalles</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;