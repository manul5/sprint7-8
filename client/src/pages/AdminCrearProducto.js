import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCrearProducto.css';

export default function AdminCrearProducto({ onRefrescarProductos }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagenUrl: '',
    destacado: false,
    especificaciones: [{ titulo: '', valor: '' }]
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEspecificacionChange = (index, field, value) => {
    const nuevasEspecificaciones = [...formData.especificaciones];
    nuevasEspecificaciones[index][field] = value;
    setFormData({ ...formData, especificaciones: nuevasEspecificaciones });
  };

  const agregarEspecificacion = () => {
    setFormData({
      ...formData,
      especificaciones: [...formData.especificaciones, { titulo: '', valor: '' }]
    });
  };

  const eliminarEspecificacion = (index) => {
    const nuevasEspecificaciones = formData.especificaciones.filter((_, i) => i !== index);
    setFormData({ ...formData, especificaciones: nuevasEspecificaciones });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validaciones básicas
    if (!formData.nombre || !formData.descripcion || !formData.precio || !formData.categoria || !formData.imagenUrl) {
      setMensaje('Error: todos los campos obligatorios deben completarse.');
      return;
    }

    if (parseFloat(formData.precio) < 0) {
      setMensaje('Error: el precio no puede ser negativo.');
      return;
    }

    try {
      const productoData = {
        ...formData,
        precio: parseFloat(formData.precio),
        especificaciones: formData.especificaciones.filter(
          (espec) => espec.titulo && espec.valor
        ),
      };

      console.log("Datos que se envían:", productoData);
      const response = await fetch('https://sprint5-6-1.onrender.com/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoData),
      });

      if (response.ok) {
        setMensaje('✅ Producto creado exitosamente');

        if (onRefrescarProductos) onRefrescarProductos();

        setTimeout(() => {
          navigate('/productos');
        }, 2000);
      } else {
        setMensaje('Error al crear el producto.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="admin-crear-producto">
      <div className="admin-header">
        <h1>Crear Nuevo Producto</h1>
        <button className="btn-volver" onClick={() => navigate('/productos')}>
          Volver al Catálogo
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-producto">
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Producto *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción *</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="precio">Precio *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría *</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="Sillas">Sillas</option>
              <option value="Mesas">Mesas</option>
              <option value="Estanterías">Estanterías</option>
              <option value="Escritorios">Escritorios</option>
              <option value="Sillones">Sillones</option>
              <option value="Camas">Camas</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imagen">URL de la Imagen *</label>
          <input
            type="text"
            id="imagenUrl"
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleChange}
            placeholder="/assets/nombre-imagen.jpg"
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="destacado"
              checked={formData.destacado}
              onChange={handleChange}
            />
            Producto Destacado
          </label>
        </div>

        <div className="form-group">
          <label>Especificaciones</label>
          {formData.especificaciones.map((espec, index) => (
            <div key={index} className="especificacion-item">
              <input
                type="text"
                placeholder="Título (ej: Material)"
                value={espec.titulo}
                onChange={(e) =>
                  handleEspecificacionChange(index, 'titulo', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Valor (ej: Roble macizo)"
                value={espec.valor}
                onChange={(e) =>
                  handleEspecificacionChange(index, 'valor', e.target.value)
                }
              />
              {formData.especificaciones.length > 1 && (
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => eliminarEspecificacion(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn-agregar"
            onClick={agregarEspecificacion}
          >
            + Agregar Especificación
          </button>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => navigate('/productos')}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-guardar">
            Crear Producto
          </button>
        </div>
      </form>
      {mensaje && (
        <div className={`fixed-mensaje ${mensaje.startsWith('Error') ? 'error' : 'exito'}`}>
          {mensaje}
        </div>
      )}
    </div>
  );
}
