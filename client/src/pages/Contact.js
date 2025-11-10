import './Contact.css';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="contact-page">
      <div id="contacto1">
        <div id="contactanos">Contáctanos</div>
        <p id="p-contacto1">¿Tienes alguna pregunta sobre nuestros muebles? <br></br> Estamos aquí para ayudarte. Contáctanos y te responderemos a la brevedad.</p>
      </div>

      <div id="seccion">

        <div id="contacto2">
          <h2 className="contact-section-title">Información de Contacto</h2>
          <p>Visítanos en nuestro taller o comunícate con nosotros. Estaremos encantados de atenderte y ayudarte a encontrar el mueble perfecto para tu hogar.</p>
          <div id="container">

            <div id="item">
              <img src="/assets/map-pin.svg" alt="ubicacion" className="iconos" />
              <div id="texto">
                <p id="texto-titulo">Dirección</p>
                <p id="info2">
                  Av. San Juan 2847 <br />
                  C1232AAB — Barrio de San Cristóbal <br />
                  Ciudad Autónoma de Buenos Aires <br />
                  Argentina
                </p>
              </div>
            </div>

            <div id="item">
              <img src="/assets/phone.svg" alt="telefono" className="iconos" />
              <div id="texto">
                <p id="texto-titulo">Teléfono</p>
                <p id="info2">+54 11 4567-8900</p>
              </div>
            </div>

            <div id="item">
              <img src="/assets/mail.svg" alt="email" className="iconos" />
              <div id="texto">
                <p id="texto-titulo">Email</p>
                <p id="info2">info@hermanosjota.com.ar</p>
              </div>
            </div>

            <div id="item">
              <img src="/assets/clock.svg" alt="reloj" className="iconos" />
              <div id="texto">
                <p id="texto-titulo">Horarios de Atención</p>
                <p id="info2">
                  Lunes a Viernes: 10:00 - 19:00 <br />
                  Sábados: 10:00 - 14:00
                </p>
              </div>
            </div>

          </div>
        </div>

        <div id="contacto-form">
          <ContactForm/>
        </div>
      </div>
    </div>
  );
};

export default Contact;