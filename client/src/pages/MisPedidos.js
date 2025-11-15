import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function MisPedidos() {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/api/pedidos/mios`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setPedidos)
      .catch(err => setError(err.message));
  }, [token]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Mis pedidos</h1>

      {pedidos.length === 0 ? (
        <p>No tenés pedidos todavía.</p>
      ) : (
        pedidos.map(p => (
          <div key={p._id} className="pedido-card">
            <p><strong>Fecha:</strong> {new Date(p.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ${p.total}</p>

            <ul>
              {p.items.map(i => (
                <li key={i.producto._id}>
                  {i.producto.nombre} x {i.cantidad}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
