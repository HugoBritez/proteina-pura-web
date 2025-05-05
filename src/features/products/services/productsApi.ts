import { supabase } from "../../../shared/services/supabaseService";
import { Database } from "../../../shared/types/database.types";

type Product = Database['public']['Tables']['productos']['Row'];

interface GetProductsParams {
  nombre?: string;
  categoria?: string;
  page?: number;
  pageSize?: number;
}

interface GetProductsResponse {
  data: Product[];
  count: number;
}

export const productsApi = {
  getProducts: async ({
    nombre,
    categoria,
    page = 1,
    pageSize = 10,
  }: GetProductsParams): Promise<GetProductsResponse> => {
    // Calcular rangos para paginación
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Construir la consulta base optimizada
    let query = supabase
      .from('productos')
      .select('*', { count: 'exact' })
      .order('id', { ascending: true })
      .range(from, to);

    // Aplicar filtros solo si se proporcionan valores válidos
    if (nombre && nombre.trim() !== '') {
      query = query.ilike('nombre', `%${nombre.trim().toLowerCase()}%`);
    }
    
    // Solo aplicar filtro de categoría si no es 'Todos' y tiene un valor válido
    if (categoria && categoria.trim() !== '' && categoria.trim() !== 'Todos') {
      query = query.ilike('categoria', `%${categoria.trim().toLowerCase()}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return {
      data: data || [],
      count: count || 0
    };
  },
};
