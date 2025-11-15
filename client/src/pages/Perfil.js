import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";  

export default function Perfil() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return; 

    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/api/user/perfil`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(await res.text());
        }
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [token]); 

  if (!token) return <p>No estás logueado</p>;
  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Cargando...</p>;

  return (
    <div>
    <h1>Mi Perfil</h1>
    <p><strong>Nombre:</strong> {data.user.name}</p>
    <p><strong>Email:</strong> {data.user.email}</p>
    <Link to="/mis-pedidos" className="btn">Mis pedidos</Link>
  </div>
  );
}
