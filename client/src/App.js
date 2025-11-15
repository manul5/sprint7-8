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
import Login from './pages/Login';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import MisPedidos from './pages/MisPedidos';
import { useCart } from "./context/CartContext";

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
function ProductDetailPage({ productos, onRefrescarProductos }) {
  const { agregarAlCarrito } = useCart();
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
      onAgregarCarrito={agregarAlCarrito}
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
function CarritoPage() {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    actualizarCantidad
  } = useCart();

  const navigate = useNavigate();
  
  return (
    <Carrito 
      carrito={carrito}
      onEliminarItem={eliminarDelCarrito}
      onVaciarCarrito={vaciarCarrito}
      onActualizarCantidad={actualizarCantidad}
      onSeguirComprando={() => navigate('/productos')}
      onVolver={() => navigate('/')}
    />
  );
}

function App() {
  const { carrito } = useCart();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/productos`);
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

  const productosDestacados = productos.filter(p => p.destacado);

  return (
    <>
      <ScrollToTop />
      <div className="App">
        <Navbar/>
        
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
                <CarritoPage/>
              } 
            />
            
            <Route 
              path="/admin/crear-producto" 
              element={<AdminCrearProducto onRefrescarProductos={fetchProductos}/>} 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
  
            <Route 
              path="/registro" 
              element={<Registro />} 
            />

            <Route 
              path="/perfil" 
              element={<Perfil />} 
            />

            <Route 
              path="/mis-pedidos" 
              element={<MisPedidos />} 
            />

          </Routes>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default App;