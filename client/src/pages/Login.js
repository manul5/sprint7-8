import { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      // Navegar a inicio tras login
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error de autenticación');
    }
  };

  return (
    <div className="login-page">
      <h1>Iniciar sesión</h1>
      {error && <div className="error">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn">Ingresar</button>
      </form>

      <p className="login-footer">
        ¿No estás registrado? <Link to="/registro">Toca aquí para registrarte</Link>
      </p>
      
    </div>
  );
}
