
import { supabase } from "../../../shared/services/supabaseService";
import { Database } from "../../../shared/types/database.types";

type Categoria = Database['public']['Tables']['categorias']['Row'];

export const categoriasApi = {
  getCategorias: async (): Promise<Categoria[]> => {
    const { data, error } = await supabase
      .from('categorias')
      .select('id, descripcion, estado')
      .order('descripcion', { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  }
};
