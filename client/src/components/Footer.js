
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/*logo */}
        <div className="footer-col footer-logo">
          <img src="/assets/logoHermanosJota.svg" alt="Hermanos Jota" />
          <h3>Hermanos Jota</h3>
          <p>Redescubriendo el arte de vivir desde 2025</p>
        </div>
        
        {/* horarios y contacto */}
        <div className="footer-col">
          <div className="footer-horarios">
            <h4>Horarios</h4>
            <p><i className="fa-regular fa-clock"></i> Lunes a Viernes: 10:00 - 19:00</p>
            <p><i className="fa-regular fa-clock"></i> Sábados: 10:00 - 14:00</p>
            <br />
          </div>
          <div className="footer-contact">
            <h4>Contacto</h4>
            <p><i className="fa-solid fa-envelope"></i> info@hermanosjota.com.ar</p>
            <p><i className="fa-solid fa-cart-shopping"></i> ventas@hermanosjota.com.ar</p>
            <p><i className="fa-brands fa-whatsapp"></i> +54 11 4567-8900</p>
            <p>
              <a href="https://instagram.com/hermanosjota_ba" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i> @hermanosjota_ba
              </a>
            </p>
          </div>
        </div>
        
        {/*mapa y dirección */}
        <div className="footer-col footer-map">
          <h4>Ubicación</h4>
          <iframe 
            src="https://www.google.com/maps?q=Av.+San+Juan+2847,+CABA&output=embed" 
            width="100%" 
            height="180" 
            style={{border:0, borderRadius: '8px'}} 
            allowFullScreen="" 
            loading="lazy"
            title="Ubicación Hermanos Jota"
          >
          </iframe>
          <p className="direccion">
            <i className="fa-solid fa-location-dot"></i> Av. San Juan 2847<br />
            San Cristóbal, CABA — Argentina
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Mueblería Hermanos Jota · Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;