import './ProductDetail.css';
import DeleteButton from './DeleteButton';

export default function ProductDetail({ producto, onVolver, onAgregarCarrito, onRefrescarProductos }){
  const imageUrl = producto?.imagenUrl
  ? producto.imagenUrl.startsWith('http') 
    ? producto.imagenUrl   // URL externa
    : `/assets/${producto.imagenUrl.replace(/^\/?assets\//, '')}` // ruta local
  : '/assets/default.jpg';

  return (
    <div className="product-detail">
      <nav className="breadcrumb">
        <a href="/">Inicio</a> /
        <a href="#!" onClick={onVolver}>Productos</a> /
        <span>{producto.nombre}</span>
      </nav>

      <article>
        <img className="producto-imagen" src={imageUrl} alt={producto.nombre} />

        <section className="producto-informacion">
          <span className="producto-categoria">{producto.categoria}</span>
          <h1 className="producto-nombre">{producto.nombre}</h1>
          <p className="producto-descripcion">{producto.descripcion}</p>
          <p className="producto-precio">${producto.precio.toLocaleString()}</p>

          <div className="producto-especificaciones">
            <h3>Especificaciones</h3>
            <ul>
              {Array.isArray(producto.especificaciones) && producto.especificaciones.length > 0 ? (
                  producto.especificaciones.map((esp, i) => (
                    <li key={i}>
                      <strong>{esp.titulo}: </strong> {esp.valor}
                    </li>
                ))
              ) : (
                    <li>No hay especificaciones disponibles</li>
              )}
            </ul>
          </div>

          <div className="actions-container">
            <button id="btn-carrito" onClick={() => onAgregarCarrito(producto)}>
              Añadir al Carrito
            </button>
            <DeleteButton id={producto._id} onRefrescarProductos={onRefrescarProductos} />
          </div>
          
        </section>
      </article>
    </div>
  );
};