
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ productos, cargando, onProductoClick, terminoBusqueda }) => {
  if (cargando) {
    return <div className="cargando">Cargando productos...</div>;
  }

  if (!productos || productos.length === 0) {
    return (
      <div className="product-list">
        <div className="estado-carga">
          <div className="error">
            {terminoBusqueda 
              ? `No se encontraron productos para "${terminoBusqueda}"`
              : "No se encontraron productos"
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <section className="catalogo">
        <h2>Nuestro Catálogo</h2>       
        <p>Explora nuestra colección completa de muebles artesanales</p>
        
        <div className="grid-productos">
          {productos.map(producto => (
            <ProductCard 
              key={producto.id}
              producto={producto}
              onProductoClick={() => onProductoClick(producto)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductList;