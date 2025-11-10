import { useNavigate } from "react-router-dom";
import "./DeleteButton.css";

export default function DeleteButton({ id, onRefrescarProductos}) {
  const navigate = useNavigate();

  const handleEliminar = async () => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/productos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar producto");

      alert("Producto eliminado con éxito");

      if (onRefrescarProductos) await onRefrescarProductos();

      navigate("/productos");

    } catch (error) {
      alert("No se pudo eliminar el producto");
      console.error(error);
    }
  };

  return (
    <button className="btn-eliminar" onClick={handleEliminar}>
      Eliminar producto
    </button>
  );
}
