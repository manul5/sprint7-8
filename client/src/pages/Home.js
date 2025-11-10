import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect,useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home({ productosDestacados, cargando, onProductoClick, onVerCatalogo }){
  
  const carruselRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const carrusel = carruselRef.current;
    if (!carrusel) return;

    const checkScroll = () => {
      setIsScrollable(carrusel.scrollWidth > carrusel.clientWidth + 5);
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [productosDestacados]);

  const scrollCarrusel = (direction) => {
    const carrusel = carruselRef.current;
    if (!carrusel) return;
    const scrollAmount = 300;

    if (direction === 1) {
      carrusel.scrollLeft += scrollAmount;
    } else {
      carrusel.scrollLeft -= scrollAmount;
    }
  };

  if (cargando) return <div className="cargando">Cargando...</div>;
  
  return (
    <div className="home">
      
      {/* Hero banner */}
      <section className="hero-full">
        <img src="/assets/banner.png" alt="Banner Hermanos Jota" />
        <div className="hero-overlay">
          <h1>Redescubriendo el arte de vivir</h1>
          <p>Muebles artesanales diseñados para perdurar, con materiales nobles y procesos sustentables.</p>
          <button className="btn" onClick={onVerCatalogo}>Ver Colección</button>
        </div>
      </section>

      {/* Carrusel de productos destacados */}
      {!!productosDestacados.length && (
        <section className="destacados">
          <h2>Novedades y Promociones</h2>
          <p>Descubre nuestra selección de muebles más populares</p>
          
          <div className="carrusel-wrapper">
            {isScrollable && (
              <button className="carrusel-btn left" onClick={() => scrollCarrusel(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )}
            
            <div
              className={`carrusel ${!isScrollable ? 'centrado' : ''}`}
              ref={carruselRef}
            >
              {productosDestacados.map((producto) => (
                <div key={producto.id} className="carrusel-item">
                  <ProductCard producto={producto} onProductoClick={onProductoClick} />
                </div>
              ))}
            </div>
            
            {isScrollable && (
              <button className="carrusel-btn right" onClick={() => scrollCarrusel(1)}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            )}
            
          </div>
        </section>
      )}

      {/* Por qué elegirnos */}
      <section className="porque">
        <h2 className="porque-titulo">¿Por qué elegirnos?</h2>
        <div className="porque-grid">
          {[
            {
              titulo: 'Diseño Atemporal',
              texto: 'Minimalismo cálido que combina estética y funcionalidad',
            },
            {
              titulo: 'Compromiso Sustentable',
              texto: 'Materiales certificados y procesos responsables',
            },
            {
              titulo: 'Hecho en Comunidad',
              texto: 'Trabajamos en cooperación con artesanos locales',
            },
          ].map(({ titulo, texto }) => (
            <div key={titulo} className="porque-item">
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};