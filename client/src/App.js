import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Contact from './pages/Contact';
import Carrito from './pages/Carrito';
import AdminCrearProducto from './pages/AdminCrearProducto';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

// Wrapper para Home
function HomePage({ productosDestacados, cargando }) {
  const navigate = useNavigate();
  
  return (
    <Home 
      productosDestacados={productosDestacados}
      cargando={cargando}
      onProductoClick={(producto) => navigate(`/productos/${producto._id}`)}
      onVerCatalogo={() => navigate('/productos')}
    />
  );
}

// Wrapper para ProductList
function ProductosPage({ productos, cargando }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const terminoBusqueda = searchParams.get('busqueda') || '';

  useEffect(() => {
    if (terminoBusqueda.trim().length >= 3) {
      const filtrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
      setProductosFiltrados(filtrados);
    } else {
      setProductosFiltrados(productos);
    }
  }, [terminoBusqueda, productos]);

  return (
    <ProductList 
      productos={productosFiltrados}
      cargando={cargando}
      onProductoClick={(producto) => navigate(`/productos/${producto._id}`)}
      terminoBusqueda={terminoBusqueda}
    />
  );
}

// Wrapper para ProductDetail
function ProductDetailPage({ productos, onAgregarCarrito, onRefrescarProductos }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find(p => p._id === id);

  if (!producto && productos.length > 0) {
    return (
      <div className="product-detail">
        <div className="estado-carga">
          <div className="error">Producto no encontrado</div>
          <button className="btn" onClick={() => navigate('/productos')}>
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  if (!producto) {
    return <div className="cargando">Cargando...</div>;
  }

  return (
    <ProductDetail 
      producto={producto}
      onVolver={() => navigate('/productos')}
      onAgregarCarrito={onAgregarCarrito}
      onRefrescarProductos={onRefrescarProductos}
    />
  );
}

// Wrapper para Contact
function ContactPage() {
  const navigate = useNavigate();
  
  return <Contact onVolver={() => navigate('/')} />;
}

// Wrapper para Carrito
function CarritoPage({ carrito, onEliminarItem, onVaciarCarrito, actualizarCantidad }) {
  const navigate = useNavigate();
  
  return (
    <Carrito 
      carrito={carrito}
      onEliminarItem={onEliminarItem}
      onVaciarCarrito={onVaciarCarrito}
      onActualizarCantidad={actualizarCantidad}
      onSeguirComprando={() => navigate('/productos')}
      onVolver={() => navigate('/')}
    />
  );
}

function App() {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const fetchProductos = async () => {
    try {
      const response = await fetch('https://sprint5-6-1.onrender.com/api/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existente = prevCarrito.find((item) => item.id === producto.id);

      if (existente) {
        // Si el producto ya está, aumentar la cantidad
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      }

      // Si no está, agregarlo con cantidad = 1
      return [
        ...prevCarrito,
        { ...producto, cantidad: 1, carritoId: crypto.randomUUID() },
      ];
    });
    alert(`¡${producto.nombre} agregado al carrito!`);
  };

  const eliminarDelCarrito = (carritoId) => {
    setCarrito(carrito.filter(item => item.carritoId !== carritoId));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    alert('Carrito vaciado');
  };

  const actualizarCantidad = (carritoId, delta) => {
    setCarrito(prevCarrito =>
      prevCarrito
        .map(item => {
          if (item.carritoId === carritoId) {
            const nuevaCantidad = (item.cantidad || 1) + delta;
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const productosDestacados = productos.filter(p => p.destacado);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar cantidadCarrito={carrito.length} />
        
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  productosDestacados={productosDestacados}
                  cargando={cargando}
                />
              } 
            />
            
            <Route 
              path="/productos" 
              element={
                <ProductosPage 
                  productos={productos}
                  cargando={cargando}
                />
              } 
            />
            
            <Route 
              path="/productos/:id" 
              element={
                <ProductDetailPage 
                  productos={productos}
                  onAgregarCarrito={agregarAlCarrito}
                  onRefrescarProductos={fetchProductos}
                />
              } 
            />
            
            <Route 
              path="/contacto" 
              element={<ContactPage />} 
            />
            
            <Route 
              path="/carrito" 
              element={
                <CarritoPage 
                  carrito={carrito}
                  onEliminarItem={eliminarDelCarrito}
                  onVaciarCarrito={vaciarCarrito}
                  actualizarCantidad={actualizarCantidad}
                />
              } 
            />
            
            <Route 
              path="/admin/crear-producto" 
              element={<AdminCrearProducto onRefrescarProductos={fetchProductos}/>} 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;