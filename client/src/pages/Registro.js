import { useState } from 'react';
import './Registro.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nombre, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Mostrar mensaje de error enviado por el backend si existe
        throw new Error(data.message || 'Error al registrar');
      }

      // Registro exitoso
      // El backend puede devolver un token; por ahora solo navegamos al login
      alert(data.message || 'Registro correcto. Por favor inicia sesión.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-page">
      <h1>Registro</h1>
      <p>Bienvenido/a — crea tu cuenta.</p>

      {error && <div className="error">{error}</div>}

      <form className="registro-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Contraseña:
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        <button type="submit" className="btn" disabled={loading}>{loading ? 'Registrando...' : 'Crear cuenta'}</button>
      </form>

      <p className="registro-footer">
        ¿Ya tenés una cuenta? <Link to="/login">Logueate aquí</Link>
      </p>

    </div>
  );
}
