import { useEffect, useState } from "react";
import { categoriasApi } from "../services/categoriasApi";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<{ id: number; descripcion: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoriasApi.getCategorias()
      .then(data => setCategorias(data))
      .catch(() => setError("Error al cargar las categorías"))
      .finally(() => setLoading(false));
  }, []);

  return { categorias, loading, error };
};