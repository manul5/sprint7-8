import { useState, useCallback, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar({ cantidadCarrito }) {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [busquedaOpen, setBusquedaOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBuscar = useCallback((e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/productos?busqueda=${encodeURIComponent(busqueda.trim())}`);
    }
  }, [busqueda, navigate]);

  const handleChange = useCallback((e) => {
    setBusqueda(e.target.value);
  }, []);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
    setBusquedaOpen(false);
  }, []);

  const toggleBusqueda = useCallback(() => {
    setBusquedaOpen(!busquedaOpen);
    setMenuOpen(false);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [busquedaOpen]);

  const limpiarBusqueda = useCallback(() => {
    setBusqueda("");
    navigate('/productos');
  }, [navigate]);

  const mostrarBusqueda = location.pathname === '/productos';

  return (
    <header>
      <button 
        type="button"
        className="menu-toggle" 
        onClick={() => { setMenuOpen(!menuOpen); setBusquedaOpen(false); }}
      >
        ☰
      </button>

      <Link to="/" className="logo" onClick={handleNavClick}>
        <img src="/assets/logoHermanosJota.svg" alt="Hermanos Jota" />
        <span>Hermanos Jota</span>
      </Link>

      {mostrarBusqueda && (
        <button type="button" className="lupita-mobile" onClick={toggleBusqueda}>
          <img src="/assets/lupa.webp" alt="Buscar" />
        </button>
      )}

      {/* Buscador mobile */}
      {mostrarBusqueda && busquedaOpen && (
        <form className="buscador-mobile active" onSubmit={handleBuscar}>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Buscar productos..." 
            value={busqueda}
            onChange={handleChange}
          />
          <button type="submit" className="buscador-btn">
            <img src="/assets/lupa.webp" alt="Buscar" />
          </button>
          {busqueda && (
            <button 
              type="button"
              className="limpiar-btn"
              onClick={limpiarBusqueda}
            >
              ✕
            </button>
          )}
        </form>
      )}

      <nav className={menuOpen ? 'active' : ''}>
        <Link to="/" onClick={handleNavClick}>Inicio</Link>
        <Link to="/productos" onClick={handleNavClick}>Productos</Link>
        <Link to="/contacto" onClick={handleNavClick}>Contacto</Link>

        {!isAuthenticated && (
          <>
            <Link to="/login" onClick={handleNavClick}>Login</Link>
            <Link to="/registro" onClick={handleNavClick}>Registro</Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link to="/perfil" onClick={handleNavClick}>Mi Perfil</Link>

            <button
              type="button"
              className="logout-btn"
              onClick={() => {
                logout();
                handleNavClick();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}

      </nav>

      {/* Buscador desktop */}
      {mostrarBusqueda && (
        <form className="buscador-container" onSubmit={handleBuscar}>
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            value={busqueda}
            onChange={handleChange}
            className="buscador-input"
          />
          <button type="submit" className="buscador-btn">
            <img src="/assets/lupa.webp" alt="Buscar" />
          </button>
          {busqueda && (
            <button 
              type="button"
              className="limpiar-btn"
              onClick={limpiarBusqueda}
            >
              ✕
            </button>
          )}
        </form>
      )}

      <Link to="/carrito" className="carrito">
        <img src="/assets/carritoCompra.png" alt="Carrito de compras" />
        {cantidadCarrito > 0 && (
          <span className="contador-carrito">{cantidadCarrito}</span>
        )}
      </Link>
    </header>
  );
}