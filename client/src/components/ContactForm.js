import { useState } from "react";
import './ContactForm.css'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validar = () => {
    const nuevosErrores = {};

    // Nombre
    if (!/^[a-zA-Z\s]{1,30}$/.test(formData.nombre)) {
      nuevosErrores.nombre = "El nombre debe tener solo letras y hasta 30 caracteres.";
    }

    // Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = "El email no tiene un formato válido.";
    }

    // Teléfono (opcional pero si existe, debe ser numérico de hasta 15 dígitos)
    if (formData.telefono && !/^[0-9]{8,15}$/.test(formData.telefono)) {
      nuevosErrores.telefono = "El teléfono debe contener solo números y tener entre 8 y 15 dígitos.";
    }

    // Mensaje
    if (formData.mensaje.length > 200) {
      nuevosErrores.mensaje = "El mensaje no puede exceder los 200 caracteres.";
    } else if (formData.mensaje.trim() === "") {
      nuevosErrores.mensaje = "El mensaje es obligatorio.";
    }

    return nuevosErrores;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: "", // Limpia error cuando se edita
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validaciones = validar();
    
    if (Object.keys(validaciones).length > 0) {
      setErrors(validaciones);
      return;
    }

    console.log("Datos del formulario:", formData);
    setEnviado(true);

    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: ""
    });
    setErrors({});
  };

  return (
    <form id="form-contacto" onSubmit={handleSubmit}>
      <h2 className="contact-section-title">Envíanos un mensaje</h2>

      {enviado && (
        <div className="alerta-exito">
          ¡Mensaje enviado correctamente! Te contactaremos pronto.
        </div>
      )}

      <div className="campo">
        <label className="label-form-contacto" htmlFor="nombre">
          Nombre <em>*</em>
        </label>
        <input
          type="text"
          className="inp-form-contacto"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          placeholder="Ingrese su nombre"
        />
        {errors.nombre && <p className="error">{errors.nombre}</p>}
      </div>

      <div className="campo">
        <label className="label-form-contacto" htmlFor="email">
          Email <em>*</em>
        </label>
        <input
          type="email"
          className="inp-form-contacto"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Ingrese su email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="campo">
        <label className="label-form-contacto" htmlFor="telefono">
          Teléfono
        </label>
        <input
          type="tel"
          className="inp-form-contacto"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Ingrese su teléfono"
        />
        {errors.telefono && <p className="error">{errors.telefono}</p>}
      </div>

      <div className="campo">
        <label className="label-form-contacto" htmlFor="mensaje">
          Mensaje <em>*</em>
        </label>
        <textarea
          id="mensaje"
          className="inp-form-contacto"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows="4"
          placeholder="¿En qué podemos ayudarte?"
        ></textarea>
        {errors.mensaje && <p className="error">{errors.mensaje}</p>}
      </div>

      <button id="btn-enviar" type="submit">
        Enviar
      </button>
    </form>
  );
};
